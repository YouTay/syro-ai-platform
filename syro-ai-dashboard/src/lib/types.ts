export type TokenOut = {
  access_token: string;
  token_type?: string;
};

export type MeOut = {
  email: string;
  created_at: string;
};

export type AgentOut = {
  id: number;
  name: string;
  system_prompt: string;
  created_at: string;
};
