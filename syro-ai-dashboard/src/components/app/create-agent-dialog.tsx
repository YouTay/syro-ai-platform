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
        <Button variant="gradient" className="rounded-lg">
          Create Agent
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl glass shadow-lg-premium border-gray-200/60 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">Create New Agent</DialogTitle>
          <DialogDescription className="text-gray-600">
            Configure a new AI agent with custom name and system prompt to define its personality and behavior.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-900">Agent Name</Label>
            <Input
              id="name"
              placeholder="e.g., Customer Support Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-gray-200/50 bg-white/50 text-gray-900 backdrop-blur-sm focus:bg-white/80 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-medium text-gray-900">System Prompt</Label>
            <Textarea
              id="prompt"
              className="min-h-[140px] rounded-lg border-gray-200/50 bg-white/50 text-gray-900 backdrop-blur-sm focus:bg-white/80 transition-all"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Define the agent's role, personality, constraints, and output format..."
            />
            <div className="text-xs text-gray-600">
              Keep it focused. Include role, personality, constraints, and output format.
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            className="rounded-lg" 
            onClick={() => setOpen(false)} 
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            className="rounded-lg"
            onClick={create}
            disabled={pending}
          >
            {pending ? "Creating..." : "Create Agent"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
