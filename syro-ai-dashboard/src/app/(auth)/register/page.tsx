"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { apiPost } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const error = useMemo(() => {
    if (!email || !password) return null;
    if (!isEmail(email)) return "Bitte eine gültige E-Mail eingeben.";
    if (password.length < 8) return "Passwort muss mindestens 8 Zeichen haben.";
    return null;
  }, [email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (error) {
      toast.error(error);
      return;
    }

    setPending(true);
    try {
      await apiPost("/auth/register", { email, password });
      toast.success("Account erstellt. Bitte einloggen.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message ?? "Registrierung fehlgeschlagen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Purple gradient accent background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#7C3AED]/5 to-[#2563EB]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#7C3AED]/5 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 justify-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-lg" />
            <div>
              <div className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#2563EB]">SYRO AI</div>
              <div className="text-xs text-slate-500">Platform • Phase 1</div>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Create your Syro account
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft2 border border-slate-200 overflow-hidden">
          {/* Purple gradient accent top */}
          <div className="h-1 bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
          
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-slate-500">
              Sign up for your Syro workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="rounded-xl border-slate-200 bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="rounded-xl border-slate-200 bg-slate-50"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-medium shadow-soft2 hover:shadow-lg hover:opacity-90 transition-all duration-200"
                disabled={pending}
              >
                {pending ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-sm text-slate-600 text-center pt-2">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-[#7C3AED] font-medium hover:text-[#6d28d9] transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400">
          Phase 1 UI • Local-only token storage
        </p>
      </div>
    </div>
  );
}
