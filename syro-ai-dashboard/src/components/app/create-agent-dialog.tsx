"use client";

import { useState } from "react";
import { toast } from "sonner";

import { apiPost } from "@/lib/api";
import type { AgentOut } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAgentDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant for Syro AI Platform. Be concise and accurate."
  );

  async function create() {
    if (name.trim().length < 2) {
      toast.error("Name muss mindestens 2 Zeichen haben.");
      return;
    }
    if (systemPrompt.trim().length < 5) {
      toast.error("System Prompt ist zu kurz.");
      return;
    }

    setPending(true);
    try {
      await apiPost<AgentOut>("/agents", {
        name: name.trim(),
        system_prompt: systemPrompt.trim(),
      });
      toast.success("Agent created.");
      setOpen(false);
      setName("");
      setSystemPrompt("You are a helpful assistant for Syro AI Platform. Be concise and accurate.");
      onCreated();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create agent.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shadow-soft hover:opacity-95">
          Create Agent
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Agent</DialogTitle>
          <DialogDescription>
            Definiere Name & System Prompt. Der Prompt steuert Persönlichkeit & Verhalten.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Support Copilot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">System Prompt</Label>
            <Textarea
              id="prompt"
              className="min-h-[140px]"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
            <div className="text-xs text-slate-500">
              Tip: Keep it focused. Add role, constraints, output format.
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)} disabled={pending}>
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shadow-soft hover:opacity-95"
            onClick={create}
            disabled={pending}
          >
            {pending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
