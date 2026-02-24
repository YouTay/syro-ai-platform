"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { setToken } from "@/lib/auth";
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

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard";

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
      const res = await apiPost<{ access_token: string }>("/auth/login", {
        email,
        password,
      });
      setToken(res.access_token);
      toast.success("Erfolgreich eingeloggt.");
      router.push(next);
    } catch (err: any) {
      toast.error(err?.message ?? "Login fehlgeschlagen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 justify-center">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-soft" />
            <div className="text-xl font-semibold tracking-tight">SYRO AI</div>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your Syro workspace
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft2 border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Nutze deine Zugangsdaten, um fortzufahren.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shadow-soft hover:opacity-95"
                disabled={pending}
              >
                {pending ? "Signing in..." : "Login"}
              </Button>

              <div className="text-sm text-slate-600 text-center">
                Noch keinen Account?{" "}
                <Link href="/register" className="text-[#2563EB] hover:underline">
                  Registrieren
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400">
          Phase 1 UI • Local-only token storage (MVP)
        </p>
      </div>
    </div>
  );
}
