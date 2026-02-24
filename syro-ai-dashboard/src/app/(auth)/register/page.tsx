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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="h-10 w-10 rounded-lg bg-purple-600" />
            <div className="text-2xl font-bold text-purple-600">Syro</div>
          </div>
          <p className="text-sm text-gray-600">
            Create your Syro account
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft2 border border-gray-200">
          <CardHeader className="pb-5">
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-gray-600">
              Sign up for your Syro workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="rounded-xl border-gray-200 bg-gray-50 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-900">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="rounded-xl border-gray-200 bg-gray-50 text-gray-900"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors mt-6"
                disabled={pending}
              >
                {pending ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-sm text-gray-600 text-center pt-2">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500">
          Phase 1 UI • Local-only token storage
        </p>
      </div>
    </div>
  );
}
