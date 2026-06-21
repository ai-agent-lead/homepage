// A stylized "team console": you (the lead) at the top, your agents below —
// sells the AgentLead premise that a human directs a team of AI agents.

type Agent = {
  name: string;
  role: string;
  status: string;
  color: string;
  state: "running" | "queued" | "done" | "idle";
};

const AGENTS: Agent[] = [
  { name: "analyst", role: "research", status: "running", color: "var(--color-cyan)", state: "running" },
  { name: "writer", role: "drafting", status: "queued", color: "var(--color-violet)", state: "queued" },
  { name: "reviewer", role: "gate", status: "pass ✓", color: "var(--color-rose)", state: "done" },
  { name: "shipper", role: "deploy", status: "idle", color: "var(--color-sky)", state: "idle" },
];

export function AgentRoster() {
  return (
    <div className="card overflow-hidden roster">
      {/* console bar */}
      <div className="roster-bar">
        <span className="font-mono text-[0.72rem] text-faint tracking-wide">your team</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
          <i className="w-1.5 h-1.5 rounded-full inline-block roster-live" style={{ background: "#34d399" }} />
          live
        </span>
      </div>

      {/* the lead — you */}
      <div className="roster-lead">
        <span className="roster-avatar">▮</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <b className="text-text text-[0.96rem]">You</b>
            <span className="badge" style={{ color: "#c3ccff", borderColor: "rgba(124,140,255,0.35)" }}>lead</span>
          </div>
          <div className="text-faint text-[0.78rem] mt-0.5">sets the standard · directs the work · signs off</div>
        </div>
      </div>

      <div className="roster-directs">directs ↓</div>

      {/* the agents */}
      <div>
        {AGENTS.map((a) => (
          <div key={a.name} className="roster-row">
            <i
              className={`roster-dot ${a.state === "running" ? "roster-pulse" : ""}`}
              style={{ background: a.color, color: a.color }}
            />
            <b className="font-mono text-[0.86rem] text-text">{a.name}</b>
            <span className="badge ml-1">{a.role}</span>
            <span
              className="ml-auto font-mono text-[0.74rem]"
              style={{ color: a.state === "idle" || a.state === "queued" ? "var(--color-faint)" : a.color }}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>

      <div className="roster-foot">
        <span className="font-mono text-[0.72rem] text-faint">1 lead · 4 agents · 1 standard</span>
      </div>
    </div>
  );
}
