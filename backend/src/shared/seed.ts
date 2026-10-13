import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { prisma } from "../config/database";

async function main() {
  console.log("Starting backend database seeding...");

  // 1. Seed Super Admin
  const defaultAdminEmail = "admin@aanjanajat.org";
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!existingAdmin) {
    const rawPassword = process.env.INITIAL_ADMIN_PASSWORD || "Admin@Aanjana2026";
    const passwordHash = await bcrypt.hash(rawPassword, 12);

    const superAdmin = await prisma.admin.create({
      data: {
        email: defaultAdminEmail,
        name: "Super Admin",
        role: "SUPER_ADMIN",
        passwordHash,
        isActive: true,
      },
    });

    console.log(`[Seed] Created Super Admin account: ${superAdmin.email} (${superAdmin.id})`);
  } else {
    console.log(`[Seed] Super Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Migrate existing pending UTR submissions from pending-utr-submissions.json if present
  const legacyUtrPath = path.resolve(__dirname, "../../../website/pending-utr-submissions.json");
  if (fs.existsSync(legacyUtrPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(legacyUtrPath, "utf-8"));
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.utrNumber) {
            const exists = await prisma.upiSubmission.findUnique({
              where: { utrNumber: String(item.utrNumber) },
            });
            if (!exists) {
              await prisma.upiSubmission.create({
                data: {
                  utrNumber: String(item.utrNumber),
                  orderId: item.orderId || `ORD_${Date.now()}`,
                  donorName: item.donorName || "Anonymous Donor",
                  email: item.email || "donor@example.com",
                  phone: item.phone || "9999999999",
                  amount: typeof item.amount === "number" ? item.amount : 500,
                  category: item.category || "General Fund",
                  status: item.status || "PENDING_ADMIN_REVIEW",
                  submittedAt: item.submittedAt ? new Date(item.submittedAt) : new Date(),
                  ipAddress: item.ipAddress || null,
                },
              });
              console.log(`[Seed] Migrated legacy UTR submission: ${item.utrNumber}`);
            }
          }
        }
      }
    } catch (e) {
      console.error("[Seed] Error migrating legacy UTR submissions:", e);
    }
  }

  // 3. Seed 34 Verified Aanjana Gotras
  const verifiedGotras = [
    { id: "solanki", hi: "सोलंकी", gu: "સોલંકી", en: "Solanki" },
    { id: "bhati", hi: "भाटी", gu: "ભાટી", en: "Bhati" },
    { id: "parmar", hi: "परमार", gu: "પરમાર", en: "Parmar" },
    { id: "chauhan", hi: "चौहान", gu: "ચૌહાણ", en: "Chauhan" },
    { id: "rathore", hi: "राठौड़", gu: "રાઠોड", en: "Rathore" },
    { id: "dabhi", hi: "डाभी", gu: "ડાભી", en: "Dabhi" },
    { id: "gehlot", hi: "गेहलोत", gu: "ગેહલોત", en: "Gehlot" },
    { id: "parihar", hi: "पडिहार", gu: "પઢિયાર", en: "Parihar / Padhiyar" },
    { id: "bhutka", hi: "भूटका", gu: "ભૂટકા", en: "Bhutka" },
    { id: "hun", hi: "हूण", gu: "હૂણ", en: "Hun" },
    { id: "jaga", hi: "जागा", gu: "જાગા", en: "Jaga" },
    { id: "kukna", hi: "कुकना", gu: "કુકણા", en: "Kukna" },
    { id: "mewada", hi: "मेवाड़ा", gu: "મેવાડા", en: "Mewada" },
    { id: "bagada", hi: "बागड़ा", gu: "બાગડા", en: "Bagada" },
    { id: "khated", hi: "खातेड़", gu: "ખાતેડ", en: "Khated" },
    { id: "godara", hi: "गोदारा", gu: "ગોદારા", en: "Godara" },
    { id: "saran", hi: "सारण", gu: "સારણ", en: "Saran" },
    { id: "punia", hi: "पुनिया", gu: "પુનિયા", en: "Punia" },
    { id: "jakhar", hi: "जाखड़", gu: "જાખડ", en: "Jakhar" },
    { id: "kaswan", hi: "कसवां", gu: "કસવા", en: "Kaswan" },
    { id: "sihag", hi: "सिहाग", gu: "સિહાગ", en: "Sihag" },
    { id: "beniwal", hi: "बेनीवाल", gu: "બેનીવાલ", en: "Beniwal" },
    { id: "bera", hi: "बेड़ा", gu: "બેડા", en: "Bera" },
    { id: "chaudhari", hi: "चौधरी", gu: "ચૌધરી", en: "Chaudhari" },
    { id: "patel", hi: "पटेल", gu: "પટેલ", en: "Patel" },
    { id: "jat", hi: "जाट", gu: "જાટ", en: "Jat" },
    { id: "khap", hi: "खाप", gu: "ખાપ", en: "Khap" },
    { id: "bhabhor", hi: "भाभोर", gu: "ભાભોર", en: "Bhabhor" },
    { id: "taral", hi: "तराल", gu: "તરાલ", en: "Taral" },
    { id: "juva", hi: "जुवा", gu: "જુવા", en: "Juva" },
    { id: "odna", hi: "ओडना", gu: "ઓડના", en: "Odna" },
    { id: "siyar", hi: "सियार", gu: "સિયાર", en: "Siyar" },
    { id: "dudavat", hi: "दुदावत", gu: "દુદાવાત", en: "Dudavat" },
    { id: "limbat", hi: "लिम्बट", gu: "લીમ્બટ", en: "Limbat" },
  ];

  for (const g of verifiedGotras) {
    const existing = await prisma.gotra.findUnique({ where: { id: g.id } });
    if (!existing) {
      await prisma.gotra.create({
        data: {
          id: g.id,
          en: g.en,
          hi: g.hi,
          gu: g.gu,
        },
      });
    }
  }
  console.log(`[Seed] Seeded ${verifiedGotras.length} verified gotras.`);

  // 4. Migrate pending gotra submissions if legacy json file exists
  const legacyGotraPaths = [
    path.resolve(__dirname, "../../../pending-gotra-submissions.json"),
    path.resolve(__dirname, "../../../website/pending-gotra-submissions.json"),
  ];

  for (const legacyPath of legacyGotraPaths) {
    if (fs.existsSync(legacyPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(legacyPath, "utf-8"));
        if (Array.isArray(raw)) {
          for (const item of raw) {
            if (item.nameEn || item.nameHi || item.gotra) {
              const nameEn = item.nameEn || item.en || item.gotra || "Unknown";
              const existingSub = await prisma.gotraSubmission.findFirst({
                where: { nameEn },
              });
              if (!existingSub) {
                await prisma.gotraSubmission.create({
                  data: {
                    nameEn,
                    nameHi: item.nameHi || item.hi || null,
                    nameGu: item.nameGu || item.gu || null,
                    submittedBy: item.submittedBy || item.name || null,
                    contact: item.contact || null,
                    village: item.village || null,
                    status: item.status || "PENDING",
                    reviewNote: item.reviewNote || null,
                  },
                });
                console.log(`[Seed] Migrated legacy gotra submission: ${nameEn}`);
              }
            }
          }
        }
      } catch (err) {
        console.error("[Seed] Error migrating legacy gotra submissions:", err);
      }
    }
  }

  console.log("Backend database seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
