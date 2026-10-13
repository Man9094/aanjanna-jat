"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { AuthService } from "@/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await AuthService.login(email.trim().toLowerCase(), password);

      if (!result.success) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      // Successful login — redirect to dashboard or callback URL
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      const msg = err?.message || "An unexpected error occurred. Please try again.";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B1E1E] shadow-lg">
            <Shield size={32} className="text-[#C8A24A]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin Panel</h1>
          <p className="mt-1 text-sm text-[#8B1E1E] font-semibold">
            Anjana Jat Mahasabha
          </p>
          <p className="mt-2 text-xs text-[#777]">
            Secure administrative access only
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#E5DDD3] bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-xs font-semibold text-[#333] uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-xs font-semibold text-[#333] uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-4 py-3 pr-12 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#555] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B1E1E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#6B1515] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/30 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Shield size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-[#999]">
          This is a restricted area. Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}
