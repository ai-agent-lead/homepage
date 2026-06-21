import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CodeBlock } from "@/components/CodeBlock";
import { FlowDiagram } from "@/components/FlowDiagram";
import { CopyCommand } from "@/components/CopyCommand";
import { GitHubIcon, PyPIIcon, ArrowIcon } from "@/components/icons";
import { LINKS } from "@/lib/site";
import { FLOW_FEATURES, FLOW_CONCEPTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Flow — declare agents in YAML, run them as a graph",
  description:
    "agentlead-flow-core is a tiny framework for declaring agents in YAML and running them as a durable, orchestrated graph over shared state. Gemini by default, Claude built in, pluggable providers.",
};

const PIPELINE_YAML = `provider: gemini                 # default provider for all agents
model: gemini-3.5-flash          # default model for all agents

agents:
  analyst:
    system: "You are a data analyst..."
    tools: [fetch_sales_data, calculator]
  writer:
    system: "You are an executive writer..."
    tools: [save_report]

pipeline:
  - name: analyze
    agent: analyst
    input: "Analyze this year's sales..."
    output: analysis             # writes result to state["analysis"]
  - name: write
    agent: writer
    input: |
      Write a summary of:
      {analysis}                 # pulled from state
    output: summary`;

const TOOL_PY = `from agentic_flow import tool

@tool
def save_report(filename: str, content: str) -> str:
    """Write a report to disk and return the path.

    Args:
        filename: File name to write, e.g. "report.md".
        content: The full text of the report.
    """
    ...`;

const DURABLE_PY = `from agentic_flow import (
    Orchestrator, InMemoryCheckpointer, NodePaused, registry,
)

orch = Orchestrator.from_yaml("pipeline.yaml", registry)
cp = InMemoryCheckpointer()              # or JsonFileCheckpointer("./runs")
try:
    orch.run({"topic": "Q3"}, run_id="R1", checkpointer=cp)
except NodePaused as paused:
    print(paused.prompt)                 # show the human what to answer
    answer = "approve"                   # ...collected out of band...
store = orch.resume("R1", cp, human_input=answer)
print(store["result"])`;

const PROVIDERS_YAML = `provider: gemini             # pipeline default
model: gemini-3.5-flash

agents:
  analyst:                   # uses the defaults above
    system: "..."
  auditor:
    provider: anthropic      # this agent runs on Claude
    model: claude-opus-4-8   # optional — omit for the provider default
    system: "..."`;

const CLI_SH = `# run a pipeline against its tools module
agentic-flow pipeline.yaml --tools my.tools

# print the plan as a graph — no model called
agentic-flow pipeline.yaml --tools my.tools --dry-run

# seed initial state
agentic-flow pipeline.yaml --tools my.tools --set topic="Q3 sales"

# durable run with a checkpoint backend
agentic-flow pipeline.yaml --tools my.tools --checkpoint json:./runs --run-id R1`;

export default function FlowPage() {
  return (
    <>
      {/* HERO */}
      <section className="block pt-16 sm:pt-24">
        <div className="wrap grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">pip install agentlead-flow-core · v0.1.1 · MIT</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-[clamp(2.2rem,5.4vw,3.9rem)] font-extrabold leading-[1.06] mt-6">
                Declare agents in YAML.<br />
                <span className="grad-text">Run them as a graph.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-muted text-[1.08rem] leading-relaxed mt-6 max-w-xl">
                A tiny framework for declaring agents — each a system prompt plus a set of tools —
                and running them as a graph over shared data state. Gemini by default, Claude built
                in, and a pluggable provider interface for the rest.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#install" className="btn btn-primary">Install <ArrowIcon /></a>
                <a href={LINKS.flowPyPI} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <PyPIIcon /> PyPI
                </a>
                <a href={LINKS.flowRepo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <GitHubIcon /> GitHub
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <CodeBlock title="pipeline.yaml" lang="yaml" code={PIPELINE_YAML} />
          </Reveal>
        </div>
      </section>

      {/* THE IDEA */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow text-center">The idea</p>
            <h2 className="block-title text-center mt-3">
              You declare the graph.
              <br className="hidden sm:block" /> The engine owns how it runs.
            </h2>
            <p className="block-sub mx-auto text-center">
              Nodes wrap an agent or a tool; edges decide what runs next. A linear{" "}
              <code className="ic">pipeline:</code> is just sugar the loader lowers to the same
              graph — so everything runs on one engine.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-10">
              <FlowDiagram />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { h: "A scheduler walks the frontier", p: "It runs every ready node, writes each result to a versioned channel, and drives the tool-use loop inside each agent." },
              { h: "Checkpoints at every boundary", p: "State is snapshotted after each node, so a crashed or paused run resumes exactly where it left off." },
              { h: "Authority is opt-in", p: "The model never owns flow by default. You grant it routing or replanning — only from a vocabulary you declare." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 70}>
                <div className="feature h-full">
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS + AGENTS */}
      <section className="block">
        <div className="wrap grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <div>
              <h2 className="block-title">Any typed function is a tool</h2>
              <p className="block-sub">
                Add <code className="ic">@tool</code> to a function with type hints — the JSON Schema
                is derived for you. The docstring summary becomes the description; the{" "}
                <code className="ic">Args:</code> lines document each parameter.
              </p>
              <div className="mt-7">
                <CodeBlock title="tools.py" lang="python" code={TOOL_PY} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div>
              <h2 className="block-title">Mix providers in one graph</h2>
              <p className="block-sub">
                Set a pipeline default and override it per agent. Agents on different providers share
                one <code className="ic">Store</code> and can delegate to each other.
              </p>
              <div className="mt-7">
                <CodeBlock title="providers.yaml" lang="yaml" code={PROVIDERS_YAML} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title">Everything you need to run agents in production</h2>
            <p className="block-sub">
              Control flow, durability, delegation, secrets, reliability and observability — each
              configured in the same YAML, covered in depth in the docs.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {FLOW_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 60}>
                <div className="feature h-full">
                  <span className="fi">{f.tag}</span>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DURABLE RUNS */}
      <section className="block">
        <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Durable runs &amp; human-in-the-loop</p>
              <h2 className="block-title mt-3">Pause for a person. Resume after a crash.</h2>
              <p className="text-muted leading-relaxed mt-5">
                The engine checkpoints at every node boundary, so a crash resumes at the last
                completed node — inside loops and branches too. A <code className="ic">human:</code>{" "}
                node pauses the run and raises <code className="ic">NodePaused</code>; your host
                collects the answer and calls <code className="ic">resume(...)</code> to continue.
              </p>
              <p className="text-muted leading-relaxed mt-4">
                Channel values are JSON-serializable and{" "}
                <strong className="text-text font-semibold">exactly-once delivery survives a resume</strong>,
                so messages and assigned todos are never lost or doubled.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <CodeBlock title="approval.py" lang="python" code={DURABLE_PY} />
          </Reveal>
        </div>
      </section>

      {/* CONCEPTS */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title">The vocabulary</h2>
            <p className="block-sub">A small, precise glossary — the same terms the docs and the code use.</p>
          </Reveal>
          <Reveal delay={80}>
            <dl className="card mt-9 grid sm:grid-cols-2 lg:grid-cols-3">
              {FLOW_CONCEPTS.map((c) => (
                <div key={c.term} className="concept">
                  <dt>{c.term}</dt>
                  <dd>{c.def}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* INSTALL + CLI */}
      <section id="install" className="block scroll-mt-20">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title text-center">Install &amp; run</h2>
            <p className="block-sub mx-auto text-center">
              <code className="ic">pip install</code> gives you the importable library and the{" "}
              <code className="ic">agentic-flow</code> CLI. Requires Python 3.10+.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-6 mt-10 items-start">
            <Reveal>
              <div className="space-y-3">
                <CopyCommand comment="# from PyPI" command="pip install agentlead-flow-core" />
                <CopyCommand comment="# run the examples on Gemini" command="export GEMINI_API_KEY=..." />
                <CopyCommand comment="# or run an agent on Claude" command="export ANTHROPIC_API_KEY=sk-ant-..." />
                <p className="text-muted text-sm leading-relaxed pt-2">
                  Examples and docs live in the GitHub repo (not the wheel) — clone{" "}
                  <code className="ic">ai-agent-lead/agentic-flow</code> and read the{" "}
                  <code className="ic">examples/</code> ladder in order.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <CodeBlock title="agentic-flow — CLI" lang="bash" code={CLI_SH} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="block pt-0">
        <div className="wrap wrap-narrow text-center">
          <Reveal>
            <div className="card p-10">
              <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] font-bold">Build your agents with the same rigor.</h2>
              <p className="block-sub mx-auto text-center mt-3">
                Open source, MIT-licensed, and one <code className="ic">pip install</code> away.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
                <a href={LINKS.flowPyPI} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <PyPIIcon /> View on PyPI
                </a>
                <a href={LINKS.flowDocs} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Read the docs <ArrowIcon />
                </a>
                <Link href="/skills" className="btn btn-ghost">Back to Skills</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
