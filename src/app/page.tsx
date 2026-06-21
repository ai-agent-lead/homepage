import { Fragment } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AgentRoster } from "@/components/AgentRoster";
import { CodeWindow } from "@/components/CodeWindow";
import { GitHubIcon, PyPIIcon, ArrowIcon, ExternalIcon } from "@/components/icons";
import { LINKS } from "@/lib/site";

const WORKS_WITH = ["Claude Code", "Codex", "Antigravity", "OpenCode", "Gemini", "Anthropic"];
const LEAD_VERBS = ["Direct", "Delegate", "Review", "Ship"];

export default function HomePage() {
  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section className="block pt-16 sm:pt-24">
        <div className="wrap grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">Open-source toolkit for agent leads</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[1.04] mt-6">
                You set the standard.
                <br />
                <span className="grad-text">Your agents follow it.</span>
              </h1>
            </Reveal>
            <Reveal delay={130}>
              <p className="text-muted text-[1.1rem] leading-relaxed mt-6 max-w-xl">
                AgentLead is two open-source tools for the human in the loop.{" "}
                <strong className="text-text font-semibold">Skills</strong> make the agent in your
                editor follow real engineering discipline.{" "}
                <strong className="text-text font-semibold">Flow</strong> lets you stand up and direct
                your own team of agents — declared in YAML, with durable state and clear lines of authority.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/skills" className="btn btn-primary">Explore Skills <ArrowIcon /></Link>
                <Link href="/flow" className="btn btn-ghost">Explore Flow <ArrowIcon /></Link>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="flex flex-wrap items-center gap-2 mt-9 font-mono text-[0.78rem]">
                {LEAD_VERBS.map((v, i) => (
                  <Fragment key={v}>
                    <span className="px-2.5 py-1 rounded-md border border-border-soft text-muted bg-white/[0.02]">{v}</span>
                    {i < LEAD_VERBS.length - 1 && <span className="text-faint">→</span>}
                  </Fragment>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <AgentRoster />
          </Reveal>
        </div>

        {/* works-with bar */}
        <Reveal delay={80}>
          <div className="wrap mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <span className="font-mono text-[0.72rem] text-faint uppercase tracking-wider mr-1">Works with</span>
            {WORKS_WITH.map((p) => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ───────────────── TWO PRODUCTS ───────────────── */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow text-center">Two ways to lead</p>
            <h2 className="block-title text-center mt-3">Direct the agent beside you — or the fleet you deploy</h2>
            <p className="block-sub mx-auto text-center">
              One standard of rigor, whether the agent is writing your code or running in production.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2 mt-12">
            {/* SKILLS CARD */}
            <Reveal>
              <article className="card card-glow p-7 h-full flex flex-col">
                <div className="h-1 w-14 rounded-full mb-6" style={{ background: "linear-gradient(90deg,#7c8cff,#b488ff)" }} />
                <span className="font-mono text-[0.72rem] text-faint uppercase tracking-wider">The agent at your side</span>
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <h3 className="text-2xl font-bold">AgentLead Skills</h3>
                  <span className="badge">npx</span>
                </div>
                <p className="text-muted leading-relaxed mt-2">
                  Your AI coding assistant, led like a disciplined engineer. You don’t pick a skill —
                  you describe the task and the right <em className="text-text not-italic font-medium">flow</em> fires:
                  investigate, design, test-first, review, verify.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-muted">
                  <li className="flex gap-2.5"><span className="text-indigo mt-px">▸</span> Task-matched flows — feature, bug, refactor, greenfield, review</li>
                  <li className="flex gap-2.5"><span className="text-indigo mt-px">▸</span> Gates that refuse to advance until they pass</li>
                  <li className="flex gap-2.5"><span className="text-indigo mt-px">▸</span> Works in Claude Code, Codex, Antigravity & OpenCode</li>
                </ul>
                <div className="mt-6 rounded-lg border border-border bg-[#07090f] px-4 py-3 font-mono text-sm">
                  <span className="text-cyan select-none">$ </span>npx @ai-agent-lead/skills
                </div>
                <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border-soft text-sm">
                  <Link href="/skills" className="text-indigo font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all">
                    Lead with Skills <ArrowIcon />
                  </Link>
                  <a href={LINKS.skillsRepo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text flex items-center gap-1.5 ml-auto">
                    <GitHubIcon /> GitHub
                  </a>
                  <span className="badge">Apache-2.0</span>
                </div>
              </article>
            </Reveal>

            {/* FLOW CARD */}
            <Reveal delay={90}>
              <article className="card card-glow p-7 h-full flex flex-col">
                <div className="h-1 w-14 rounded-full mb-6" style={{ background: "linear-gradient(90deg,#4fd6c4,#38bdf8)" }} />
                <span className="font-mono text-[0.72rem] text-faint uppercase tracking-wider">The team you command</span>
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <h3 className="text-2xl font-bold">AgentLead Flow</h3>
                  <span className="badge">pip · agentlead-flow-core</span>
                </div>
                <p className="text-muted leading-relaxed mt-2">
                  Stand up your own agents in YAML — each a system prompt plus tools — and run them as a{" "}
                  <em className="text-text not-italic font-medium">graph</em> over shared state. You hold the
                  authority; the model only gets what you grant it.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-muted">
                  <li className="flex gap-2.5"><span className="text-cyan mt-px">▸</span> Pipelines, loops, branches & native graphs</li>
                  <li className="flex gap-2.5"><span className="text-cyan mt-px">▸</span> Durable checkpoints + human-in-the-loop sign-off</li>
                  <li className="flex gap-2.5"><span className="text-cyan mt-px">▸</span> Delegation, shared Store, secrets, retries & limits</li>
                </ul>
                <div className="mt-6 rounded-lg border border-border bg-[#07090f] px-4 py-3 font-mono text-sm">
                  <span className="text-cyan select-none">$ </span>pip install agentlead-flow-core
                </div>
                <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border-soft text-sm">
                  <Link href="/flow" className="font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: "var(--color-cyan)" }}>
                    Command with Flow <ArrowIcon />
                  </Link>
                  <a href={LINKS.flowPyPI} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text flex items-center gap-1.5 ml-auto">
                    <PyPIIcon /> PyPI
                  </a>
                  <a href={LINKS.flowRepo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text flex items-center gap-1.5">
                    <GitHubIcon /> GitHub
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── THE THROUGHLINE ───────────────── */}
      <section className="block">
        <div className="wrap grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div>
              <p className="eyebrow">The throughline</p>
              <h2 className="block-title mt-3">A good lead sets the standard once</h2>
              <p className="text-muted leading-relaxed mt-5">
                The judgment that makes a feature ship cleanly — investigate before you build, design
                the interface first, test what matters, verify before you merge — is exactly what a
                team of agents needs before you can trust it with real work.
              </p>
              <p className="text-muted leading-relaxed mt-4">
                <strong className="text-text font-semibold">Skills</strong> instills it in the
                assistant at your side. <strong className="text-text font-semibold">Flow</strong> lets
                you encode it into the agents you deploy — explicit control flow, durable state, and a
                hard boundary on how much authority the model holds.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/skills" className="btn btn-ghost">Skills <ArrowIcon /></Link>
                <Link href="/flow" className="btn btn-ghost">Flow <ArrowIcon /></Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <CodeWindow title="a day as the lead">
              <span className="cmt"># direct the agent in your editor</span>{"\n"}
              <span className="prompt">$</span> npx @ai-agent-lead/skills{"\n\n"}
              <span className="cmt"># command your own team of agents</span>{"\n"}
              <span className="prompt">$</span> pip install agentlead-flow-core{"\n"}
              <span className="prompt">$</span> agentic-flow pipeline.yaml <span className="k">--tools</span> my.tools{"\n\n"}
              <span className="cmt"># same standard, every agent on the team.</span>
            </CodeWindow>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── POSITIONING TABLE ───────────────── */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title text-center">Where each one fits</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="card mt-10 overflow-hidden">
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-soft">
                <div className="p-7">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-indigo">▮</span> Skills
                  </h3>
                  <dl className="mt-5 space-y-3.5 text-sm">
                    <Row k="Leads" v="The agent working beside you" />
                    <Row k="Install" v="npx @ai-agent-lead/skills" mono />
                    <Row k="Targets" v="Claude Code · Codex · Antigravity · OpenCode" />
                    <Row k="License" v="Apache-2.0" />
                  </dl>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-cyan">▮</span> Flow
                  </h3>
                  <dl className="mt-5 space-y-3.5 text-sm">
                    <Row k="Commands" v="The agents you deploy & ship" />
                    <Row k="Install" v="pip install agentlead-flow-core" mono />
                    <Row k="Providers" v="Gemini · Anthropic · pluggable" />
                    <Row k="License" v="MIT" />
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── CLOSING CTA ───────────────── */}
      <section className="block">
        <div className="wrap-narrow wrap text-center">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold">Start leading with whichever you need today.</h2>
            <p className="block-sub mx-auto text-center mt-4">
              Both are open source, free, and a single command away.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link href="/skills" className="btn btn-primary">Get Skills <ArrowIcon /></Link>
              <Link href="/flow" className="btn btn-ghost">Get Flow <ArrowIcon /></Link>
              <a href={LINKS.org} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon /> View the org <ExternalIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt className="text-faint w-24 shrink-0 font-mono text-xs uppercase tracking-wide pt-0.5">{k}</dt>
      <dd className={mono ? "font-mono text-[0.82rem] text-text" : "text-muted"}>{v}</dd>
    </div>
  );
}
