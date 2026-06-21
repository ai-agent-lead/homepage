import { Fragment } from "react";

// Visual model of how Flow runs: YAML lowers to a graph, the scheduler walks it
// node by node, and results flow through versioned channels. Replaces the old
// ASCII diagram with a responsive, brand-styled figure.

type Node = { name: string; note: string; tone: string };

const BUILD: Node[] = [
  { name: "YAML", note: "agents · tools · edges", tone: "var(--color-indigo)" },
  { name: "build_program", note: "validate & lower", tone: "var(--color-violet)" },
  { name: "Graph", note: "nodes + edges (IR)", tone: "var(--color-sky)" },
  { name: "scheduler", note: "walk the frontier", tone: "var(--color-cyan)" },
];

const RUNTIME: Node[] = [
  { name: "entry", note: "start", tone: "var(--color-indigo)" },
  { name: "gather", note: "agent", tone: "var(--color-cyan)" },
  { name: "analyze", note: "agent", tone: "var(--color-cyan)" },
  { name: "write", note: "tool", tone: "var(--color-amber)" },
  { name: "__end__", note: "done", tone: "#34d399" },
];

const CHANNELS = ["sources", "claims", "draft"];

function Arrow() {
  return (
    <div className="flex items-center justify-center shrink-0 text-faint px-1">
      <span className="hidden sm:inline">→</span>
      <span className="sm:hidden">↓</span>
    </div>
  );
}

function Line({ nodes }: { nodes: Node[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
      {nodes.map((n, i) => (
        <Fragment key={n.name}>
          <div className="dnode" style={{ borderTopColor: n.tone }}>
            <b>{n.name}</b>
            <span style={{ color: n.tone }}>{n.note}</span>
          </div>
          {i < nodes.length - 1 && <Arrow />}
        </Fragment>
      ))}
    </div>
  );
}

export function FlowDiagram() {
  return (
    <div className="card diagram p-5 sm:p-7">
      {/* Build: YAML → graph */}
      <div className="dcap">build · YAML lowers to a runnable graph</div>
      <Line nodes={BUILD} />

      <div className="ddiv">
        <span className="dchip">the scheduler walks the graph</span>
      </div>

      {/* Run: the scheduler walks the nodes */}
      <div className="dcap">run · one node at a time, checkpointed at every boundary</div>
      <Line nodes={RUNTIME} />

      {/* Channels: data flowing through versioned state */}
      <div className="dchannels">
        <span className="dch-label">channels</span>
        {CHANNELS.map((c, i) => (
          <Fragment key={c}>
            <span className="dch">{c}</span>
            {i < CHANNELS.length - 1 && <span className="dch-arrow">→</span>}
          </Fragment>
        ))}
        <span className="dch-meta">value + version + reducer</span>
      </div>
    </div>
  );
}
