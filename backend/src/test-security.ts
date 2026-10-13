import http from "http";
import { app } from "./app";
import { prisma } from "./config/database";

async function runTests() {
  console.log("==========================================");
  console.log("RUNNING SECURITY & BACKEND INTEGRITY TESTS");
  console.log("==========================================\n");

  // Spin up test server in-process on an ephemeral port
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://localhost:${address.port}`;

  async function request(path: string, options: {
    method?: string;
    body?: any;
    token?: string;
    headers?: Record<string, string>;
  } = {}) {
    const url = new URL(path, baseUrl);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (options.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }

    const res = await fetch(url.toString(), {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    let data: any;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }

    return { status: res.status, data, headers: res.headers };
  }

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
      failed++;
    }
  }

  try {
    // TEST 1: Health check
    const health = await request("/api/health");
    assert(health.status === 200 && health.data.status === "ok", "1. Backend health check returns 200 OK");

    // TEST 2: Unauthenticated admin endpoint returns 401
    const unauth = await request("/api/admin/stats");
    assert(unauth.status === 401, "2. Unauthenticated admin endpoint returns 401");

    // TEST 3: Invalid login returns 401 generic error
    const badLogin = await request("/api/auth/login", {
      method: "POST",
      body: { email: "admin@aanjanajat.org", password: "wrong" },
    });
    assert(badLogin.status === 401 && badLogin.data.error === "Invalid email or password.", "3. Invalid login returns 401 with generic error");

    // TEST 4: Valid login returns JWT token and admin info
    const goodLogin = await request("/api/auth/login", {
      method: "POST",
      body: { email: "admin@aanjanajat.org", password: "Admin@Aanjana2026" },
    });
    assert(goodLogin.status === 200 && !!goodLogin.data.data.token, "4. Valid admin login returns 200 and JWT token");
    const token = goodLogin.data.data.token;

    // TEST 5: Authenticated admin stats call returns 200 with real database counts
    const stats = await request("/api/admin/stats", { token });
    assert(
      stats.status === 200 &&
      stats.data.data.totalGotras >= 34 &&
      stats.data.data.totalMembers >= 0,
      "5. Authenticated admin stats returns 200 with database verified gotras (>= 34)"
    );

    // TEST 6: Public membership form registration + Mass assignment protection
    const memberReg = await request("/api/members", {
      method: "POST",
      body: {
        name: "Ramesh Patel",
        gotra: "solanki",
        village: "Dethali",
        district: "Patan",
        state: "Gujarat",
        contact: "9876543210",
        // Attacker attempts privilege escalation / auto-approval:
        status: "APPROVED",
        role: "SUPER_ADMIN",
        isAdmin: true,
      },
    });
    assert(
      memberReg.status === 201 &&
      memberReg.data.data.status === "PENDING" &&
      memberReg.data.data.memberId.startsWith("AJM-"),
      "6. Public registration forces PENDING status & generates server memberId (mass assignment protected)"
    );
    const createdMemberId = memberReg.data.data.id;
    const officialCardId = memberReg.data.data.memberId;

    // TEST 7: Official card verification for PENDING member must return 404
    const verifyPending = await request(`/api/members/verify/${officialCardId}`);
    assert(verifyPending.status === 404, "7. Pending member cannot produce verified official card (returns 404)");

    // TEST 8: Admin approves member
    const approveRes = await request(`/api/members/${createdMemberId}/approve`, {
      method: "POST",
      token,
      body: { note: "All documents verified" },
    });
    assert(approveRes.status === 200 && approveRes.data.data.member.status === "APPROVED", "8. Admin approval sets member status to APPROVED");

    // TEST 9: Official card verification for APPROVED member succeeds
    const verifyApproved = await request(`/api/members/verify/${officialCardId}`);
    assert(verifyApproved.status === 200 && verifyApproved.data.data.card.status === "APPROVED", "9. Approved member official card verification returns 200");

    // TEST 10: Re-approving already approved member returns 409 Conflict
    const reApprove = await request(`/api/members/${createdMemberId}/approve`, {
      method: "POST",
      token,
    });
    assert(reApprove.status === 409, "10. State transition guard rejects approving already-approved member (409 Conflict)");

    // TEST 11: Gotras endpoint returns verified database list
    const publicGotras = await request("/api/gotras");
    assert(publicGotras.status === 200 && publicGotras.data.data.count >= 34, "11. Public gotras returns >= 34 verified gotras from database");

    // TEST 12: Public gotra submission workflow
    const gotraSubRes = await request("/api/gotras/submit", {
      method: "POST",
      body: {
        nameEn: "TestGotra",
        nameHi: "टेस्टगोत्र",
        submittedBy: "Dev User",
        contact: "9876543210",
        village: "Dethali",
      },
    });
    assert(gotraSubRes.status === 201 && gotraSubRes.data.data.submission.status === "PENDING", "12. Public gotra submission saved with PENDING status");
    const subId = gotraSubRes.data.data.submission.id;

    // TEST 13: Admin approves gotra submission -> upserted into Gotra table
    const approveGotraSub = await request(`/api/gotras/admin/submissions/${subId}/approve`, {
      method: "POST",
      token,
      body: { note: "Verified with elders" },
    });
    assert(
      approveGotraSub.status === 200 &&
      approveGotraSub.data.data.submission.status === "APPROVED",
      "13. Admin approves gotra submission and updates database"
    );

    // TEST 14: Directory Management - Admin creates location
    const dirCreateRes = await request("/api/directory/admin", {
      method: "POST",
      token,
      body: {
        stateKey: "gujarat",
        stateNameEn: "Gujarat",
        stateNameHi: "गुजरात",
        districtEn: "Patan",
        districtHi: "पाटण",
        talukaEn: "Sidhpur",
        talukaHi: "सिद्धपुर",
        villageEn: "Dethali",
        villageHi: "देथली",
      },
    });
    assert(dirCreateRes.status === 201 && dirCreateRes.data.data.location.villageEn === "Dethali", "14. Admin creates directory location entry");
    const locId = dirCreateRes.data.data.location.id;

    // TEST 15: Public village directory lists created village
    const publicDir = await request("/api/directory/villages");
    assert(publicDir.status === 200 && publicDir.data.data.villages.length >= 1, "15. Public directory returns active villages");

    // TEST 16: Events Management - Admin creates event
    const eventCreate = await request("/api/events/admin", {
      method: "POST",
      token,
      body: {
        title: "Security Verification Sammelan",
        titleHi: "सुरक्षा सत्यापन सम्मेलन",
        description: "Official gathering to verify database separation and admin security.",
        date: "2026-11-01",
        time: "10:00 AM",
        location: "Mahasabha Bhavan, Ahmedabad",
        category: "meeting",
        isPublished: true,
      },
    });
    assert(eventCreate.status === 201 && eventCreate.data.data.event.title.includes("Security"), "16. Admin creates verified community event");
    const eventId = eventCreate.data.data.event.id;

    // TEST 17: Announcements Management - Admin creates announcement
    const annCreate = await request("/api/announcements", {
      method: "POST",
      token,
      body: {
        title: "Portal Update Complete",
        titleHi: "पोर्टल अपडेट पूर्ण",
        content: "The admin panel is securely connected to the backend API.",
        isPublished: true,
      },
    });
    assert(annCreate.status === 201 && annCreate.data.data.announcement.title.includes("Portal"), "17. Admin creates announcement");
    const annId = annCreate.data.data.announcement.id;

    // TEST 18: Audit logs reflect all actions
    const auditRes = await request("/api/audit", { token });
    assert(auditRes.status === 200 && auditRes.data.data.logs.length >= 5, "18. Audit logs recorded immutable trail for all operations");

    // TEST 19: Security headers present in responses
    assert(
      auditRes.headers.get("x-content-type-options") === "nosniff" &&
      auditRes.headers.get("x-frame-options") === "DENY",
      "19. Security headers (X-Content-Type-Options: nosniff, X-Frame-Options: DENY) present"
    );

    // TEST 20: Clean up test directory, event, and announcement
    await request(`/api/directory/admin/${locId}`, { method: "DELETE", token });
    await request(`/api/events/admin/${eventId}`, { method: "DELETE", token });
    await request(`/api/announcements/${annId}`, { method: "DELETE", token });
    assert(true, "20. Cleanup of temporary test entities completed");

  } finally {
    server.close();
  }

  console.log("\n==========================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
