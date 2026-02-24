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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 justify-center">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-soft" />
            <div className="text-xl font-semibold tracking-tight">SYRO AI</div>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Create your Syro account
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft2 border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Registrieren</CardTitle>
            <CardDescription>
              Erstelle einen Account für dein lokales Dashboard.
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
                  placeholder="Min. 8 Zeichen"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shadow-soft hover:opacity-95"
                disabled={pending}
              >
                {pending ? "Creating..." : "Account erstellen"}
              </Button>

              <div className="text-sm text-slate-600 text-center">
                Schon dabei?{" "}
                <Link href="/login" className="text-[#2563EB] hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400">
          Phase 1 UI • JWT stored in localStorage (MVP)
        </p>
      </div>
    </div>
  );
}
