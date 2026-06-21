// Single source of truth for links + product metadata used across the site.

export const SITE = {
  name: "AgentLead",
  domain: "agentlead.dev",
  url: "https://agentlead.dev",
  tagline: "Lead your AI agents like a disciplined team. You set the standard; they follow it.",
};

export const LINKS = {
  skillsRepo: "https://github.com/ai-agent-lead/skills",
  flowRepo: "https://github.com/ai-agent-lead/agentic-flow",
  flowPyPI: "https://pypi.org/project/agentlead-flow-core/",
  flowDocs: "https://github.com/ai-agent-lead/agentic-flow/blob/main/README.md",
  org: "https://github.com/ai-agent-lead",
};

export const PRODUCTS = {
  skills: {
    id: "skills",
    name: "AgentLead Skills",
    accent: "var(--color-indigo)",
    pitch:
      "Engineering discipline your AI coding assistant reaches for by default. Describe the task — the right flow fires.",
    install: "npx @ai-agent-lead/skills",
    license: "Apache-2.0",
    repo: "https://github.com/ai-agent-lead/skills",
    href: "/skills",
  },
  flow: {
    id: "flow",
    name: "AgentLead Flow",
    pkg: "agentlead-flow-core",
    accent: "var(--color-cyan)",
    pitch:
      "Declare agents in YAML and run them as a durable, orchestrated graph over shared state. Gemini and Claude built in.",
    install: "pip install agentlead-flow-core",
    license: "MIT",
    version: "0.1.1",
    repo: "https://github.com/ai-agent-lead/agentic-flow",
    pypi: "https://pypi.org/project/agentlead-flow-core/",
    href: "/flow",
  },
} as const;
