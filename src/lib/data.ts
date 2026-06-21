// ─────────────────────────── SKILLS content ───────────────────────────

export type StepKind = "doc" | "shape" | "build" | "gate" | "diag" | "util" | "next" | "merge";

export type ChainStep = { kind: StepKind; name: string; note?: string };

export type Flow = {
  id: string;
  title: string;
  badge: string;
  desc: string;
  chain: ChainStep[];
};

export const LEGEND: { kind: StepKind; label: string; blurb: string }[] = [
  { kind: "doc", label: "doc", blurb: "writes a contract" },
  { kind: "shape", label: "shape", blurb: "decides structure" },
  { kind: "build", label: "build", blurb: "writes code" },
  { kind: "gate", label: "gate", blurb: "verifies before merge" },
  { kind: "diag", label: "diagnose", blurb: "analyses first" },
];

export const START_ROWS: { situation: string; entry: string; goto: string; href: string }[] = [
  { situation: "New feature in an existing system", entry: "feature-doc", goto: "Standard feature", href: "#flow-feature" },
  { situation: "Large feature — many ACs or multi-package", entry: "feature-doc + tdd-rounds", goto: "Large feature", href: "#flow-large" },
  { situation: "New feature, direction still unclear", entry: "investigate", goto: "Investigation", href: "#flow-investigate" },
  { situation: "Bug — root cause obvious from the trace", entry: "tdd", goto: "Bug fix", href: "#flow-bug-clear" },
  { situation: "Bug — intermittent, flaky, or cause unclear", entry: "debug → tdd", goto: "Debug flow", href: "#flow-bug-unclear" },
  { situation: "Refactor / improve existing architecture", entry: "improve-codebase-architecture", goto: "Refactor", href: "#flow-refactor" },
  { situation: "New multi-module system from scratch", entry: "system-design", goto: "Greenfield system", href: "#flow-system" },
  { situation: "Reviewing someone else's PR", entry: "pr-review", goto: "Review", href: "#flow-review" },
];

export const FLOWS: Flow[] = [
  {
    id: "flow-feature",
    title: "Standard feature",
    badge: "single package",
    desc: "A single-package feature with a manageable acceptance-criteria count.",
    chain: [
      { kind: "doc", name: "feature-doc", note: "ACs → test list" },
      { kind: "shape", name: "design", note: "optional" },
      { kind: "build", name: "tdd", note: "red·green·refactor" },
      { kind: "build", name: "simplify", note: "tighten sweep" },
      { kind: "gate", name: "prod-ready", note: "pre-merge" },
      { kind: "merge", name: "PR" },
    ],
  },
  {
    id: "flow-large",
    title: "Large feature",
    badge: "≥10 ACs · multi-package",
    desc: "Orchestrated across rounds — the parent dispatches Builder sub-agents and holds state.",
    chain: [
      { kind: "doc", name: "feature-doc", note: "many ACs" },
      { kind: "build", name: "tdd-rounds", note: "design·tdd·simplify per round" },
      { kind: "gate", name: "verify-real-deps", note: "real upstreams" },
      { kind: "merge", name: "tag vN.0" },
    ],
  },
  {
    id: "flow-investigate",
    title: "Investigation before commitment",
    badge: "structural decision",
    desc: "For a new dependency, framework choice, or a cross-cutting refactor — options before code.",
    chain: [
      { kind: "doc", name: "investigate", note: "2–3 options" },
      { kind: "doc", name: "grill-plan", note: "stress-test → ADR" },
      { kind: "doc", name: "feature-doc", note: "capture direction" },
      { kind: "next", name: "→ feature flow" },
    ],
  },
  {
    id: "flow-bug-clear",
    title: "Bug fix — cause obvious",
    badge: "clear trace",
    desc: "The symptom and stack trace point straight at the bug.",
    chain: [
      { kind: "build", name: "tdd", note: "failing test → fix" },
      { kind: "gate", name: "prod-ready", note: "if infra / auth / DB" },
      { kind: "merge", name: "PR" },
    ],
  },
  {
    id: "flow-bug-unclear",
    title: "Bug fix — cause unclear",
    badge: "flaky · intermittent",
    desc: "Environment-specific, a regression, or you don't yet know what to assert.",
    chain: [
      { kind: "diag", name: "debug", note: "reproduce → name cause" },
      { kind: "build", name: "tdd", note: "repro = failing test" },
      { kind: "gate", name: "prod-ready", note: "if surface-changing" },
      { kind: "merge", name: "PR" },
    ],
  },
  {
    id: "flow-refactor",
    title: "Refactor existing code",
    badge: "brownfield",
    desc: "Improve architecture — turn shallow modules into deep ones. One candidate at a time.",
    chain: [
      { kind: "diag", name: "zoom-out", note: "if unfamiliar" },
      { kind: "shape", name: "improve-codebase-architecture", note: "candidate list" },
      { kind: "shape", name: "design", note: "deepen interface" },
      { kind: "build", name: "tdd", note: "tests stay green" },
      { kind: "gate", name: "prod-ready" },
    ],
  },
  {
    id: "flow-system",
    title: "Greenfield system",
    badge: "once per system",
    desc: "A new multi-module project. After topology is set, each feature runs its own flow.",
    chain: [
      { kind: "doc", name: "investigate", note: "optional" },
      { kind: "shape", name: "system-design", note: "modules · seams" },
      { kind: "shape", name: "design", note: "per module" },
      { kind: "doc", name: "feature-doc", note: "first feature" },
      { kind: "next", name: "→ feature flow" },
    ],
  },
  {
    id: "flow-review",
    title: "Review someone else's PR",
    badge: "utility",
    desc: "Runs whenever you read a diff — classifies findings by severity.",
    chain: [
      { kind: "diag", name: "sync-check", note: "drift scan, optional" },
      { kind: "gate", name: "pr-review", note: "blocker · suggestion · nit" },
    ],
  },
];

export type CrossItem = { name: string; kind: string; kindClass: string; desc: string };

export const CROSS_ITEMS: CrossItem[] = [
  {
    name: "code-hygiene",
    kind: "lens",
    kindClass: "k-lens",
    desc: "Boring code, naming as the primary refactor, YAGNI, rule of 3, locality. Carried into simplify and pr-review.",
  },
  {
    name: "security-review",
    kind: "gate",
    kindClass: "k-gate",
    desc: "Fires on surface-changing work — new entry points, identity flows, authz, sensitive data, external deps. Runs alongside tdd.",
  },
  {
    name: "zoom-out",
    kind: "utility",
    kindClass: "k-util",
    desc: "Interrupts any flow when you're lost in unfamiliar code. Maps the relevant modules and callers, then hands back.",
  },
  {
    name: "bench",
    kind: "measure",
    kindClass: "k-meas",
    desc: "Performance benchmarking discipline — measures latency and throughput when a flow carries a performance AC.",
  },
];

// ─────────────────────────── FLOW (library) content ───────────────────────────

export type Feature = { tag: string; title: string; desc: string };

export const FLOW_FEATURES: Feature[] = [
  {
    tag: "control flow",
    title: "Pipelines, loops & branches",
    desc: "A linear pipeline: lowers to a graph. Add a loop: with an until: condition and a max_iterations: cap, or a when:/then:/else: branch — no expression language, just state-template truthiness.",
  },
  {
    tag: "graph",
    title: "Author the graph directly",
    desc: "When a readable sequence can't express the flow — any-to-any handoff, cycles, fan-in, fan-out — declare an entry, nodes, and edges (static, conditional, or model-routed).",
  },
  {
    tag: "structured output",
    title: "JSON-schema results",
    desc: "Give an agent an output_schema and its answer comes back as a dict. Later steps address fields directly with {report[title]}.",
  },
  {
    tag: "delegation",
    title: "Agents as tools",
    desc: "List other agents under an agent's agents: key and they become callable tools. The sub-agent runs its own loop and shares the same Store.",
  },
  {
    tag: "shared state",
    title: "One Store per run",
    desc: "Versioned channels + reducers + a message log + a todo board, threaded through every agent, tool, and sub-agent. Messages and todos use exactly-once delivery.",
  },
  {
    tag: "durability",
    title: "Checkpoint at every node",
    desc: "Every run checkpoints at each node boundary, so a crash resumes at the last completed node — inside loops and branches too. In-memory and JSON-file backends ship.",
  },
  {
    tag: "human-in-the-loop",
    title: "Pause for a person",
    desc: "A human: node pauses the run, checkpoints a marker, and raises NodePaused. The host collects an answer and calls resume() to continue — durable by definition.",
  },
  {
    tag: "secrets",
    title: "Named, never embedded",
    desc: "Credentials are named in YAML and fetched late at point-of-use, wrapped in a masked Secret type, and never written to the Store — so they can't reach a checkpoint.",
  },
  {
    tag: "reliability",
    title: "Retries & limits",
    desc: "Retry policies with exponential backoff at tool and agent scope, plus limits on steps, output tokens, wall-clock, and per-node visits — per agent and for the whole run.",
  },
  {
    tag: "providers",
    title: "Mix Gemini & Claude",
    desc: "Gemini by default, Anthropic built in, pluggable interface for the rest. Agents on different providers share one Store and can delegate to each other in a single graph.",
  },
  {
    tag: "authority",
    title: "Let the model drive flow",
    desc: "Opt into the authority spectrum: route (an agent picks the next node from your candidates) or replan (a planner rewrites the not-yet-run subgraph from your declared vocabulary).",
  },
  {
    tag: "observability",
    title: "One event seam",
    desc: "on_event(event, data) sees every node, tool call, retry, checkpoint, route and replan. Route it to the console, standard logging, or an EventBus you can stream() live.",
  },
];

export type Concept = { term: string; def: string };

export const FLOW_CONCEPTS: Concept[] = [
  { term: "Agent", def: "A system prompt + a set of tools + the model's tool-use loop." },
  { term: "Node", def: "A graph vertex wrapping an agent, a tool call, or a human step." },
  { term: "Edge", def: "A connection between nodes — static, conditional (when), or model-driven (route)." },
  { term: "Store", def: "Versioned channels + reducers + a message log + a todo board for one run." },
  { term: "Reducer", def: "A function that merges channel updates across versions." },
  { term: "Checkpoint", def: "A state snapshot taken at every node boundary, for durability and resume." },
  { term: "Provider", def: "The LLM backend interface — Gemini and Anthropic ship; add your own." },
  { term: "Authority", def: "The spectrum from a static flow to model-driven routing and replanning." },
  { term: "Exactly-once delivery", def: "A message/todo guarantee for recipients that survives crashes and resume." },
];
