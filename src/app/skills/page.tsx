import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Chain } from "@/components/Chain";
import { CopyCommand } from "@/components/CopyCommand";
import { GitHubIcon, ArrowIcon } from "@/components/icons";
import { LINKS } from "@/lib/site";
import { LEGEND, START_ROWS, FLOWS, CROSS_ITEMS, type StepKind } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills — engineering discipline for your AI coding assistant",
  description:
    "AgentLead Skills encode engineering discipline so your AI coding assistant follows it by default. Describe the task and the right flow fires: investigate, design, test-first, review, verify.",
};

const DOT_COLOR: Record<StepKind, string> = {
  doc: "var(--color-amber)",
  shape: "var(--color-violet)",
  build: "var(--color-cyan)",
  gate: "var(--color-rose)",
  diag: "var(--color-sky)",
  util: "var(--color-purple)",
  next: "var(--color-indigo)",
  merge: "#34d399",
};

export default function SkillsPage() {
  return (
    <>
      {/* HERO */}
      <section className="block pt-16 sm:pt-24">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">AgentLead Skills · Claude Code · Codex · Antigravity · OpenCode</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.3rem,6vw,4.2rem)] font-extrabold leading-[1.05] mt-6 max-w-3xl">
              Pick by what’s <span className="grad-text">in front of you.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-muted text-[1.1rem] leading-relaxed mt-6 max-w-2xl">
              AgentLead Skills encode engineering discipline so your assistant follows it by default.
              You don’t choose a skill — you describe the task and the right{" "}
              <strong className="text-text font-semibold">flow</strong> fires: investigate before
              building, design the interface first, test-first, review at the boundary, verify before merge.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#start" className="btn btn-primary">Where to start <ArrowIcon /></a>
              <a href="#flows" className="btn btn-ghost">See the flows</a>
              <a href={LINKS.skillsRepo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon /> GitHub
              </a>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-12">
              {LEGEND.map((l) => (
                <span key={l.kind} className="inline-flex items-center gap-2 text-sm text-muted">
                  <i className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: DOT_COLOR[l.kind] }} />
                  <span className="font-mono text-[0.8rem]">{l.label}</span> — {l.blurb}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHERE TO START */}
      <section id="start" className="block block-alt scroll-mt-20">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title">Where to start</h2>
            <p className="block-sub">Match your situation to an entry point. The flow takes it from there.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="card mt-8 overflow-hidden">
              {START_ROWS.map((row) => (
                <a
                  key={row.href}
                  href={row.href}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-2 sm:gap-5 px-5 py-4 border-b border-border-soft last:border-b-0 hover:bg-panel-2 transition-colors group"
                >
                  <span className="text-text">{row.situation}</span>
                  <span className="font-mono text-[0.82rem] text-muted sm:text-right">{row.entry}</span>
                  <span className="text-faint text-[0.8rem] sm:min-w-[130px] sm:text-right group-hover:text-indigo transition-colors whitespace-nowrap">
                    {row.goto} →
                  </span>
                </a>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-2 sm:gap-5 px-5 py-4 text-faint">
                <span>Typo, dep bump, one-line config</span>
                <span className="font-mono text-[0.82rem] sm:text-right">just fix it</span>
                <span className="text-[0.8rem] sm:min-w-[130px] sm:text-right">no skill needed</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE FLOWS */}
      <section id="flows" className="block scroll-mt-20">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title">The flows</h2>
            <p className="block-sub">
              Each is a chain of skills. Doc steps write a contract; gate steps refuse to advance until they pass.
            </p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {FLOWS.map((flow, i) => (
              <Reveal key={flow.id} delay={i % 2 === 0 ? 0 : 60}>
                <article id={flow.id} className="card p-6 scroll-mt-24">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-bold">{flow.title}</h3>
                    <span className="badge">{flow.badge}</span>
                  </div>
                  <p className="text-muted text-sm mt-2 mb-5">{flow.desc}</p>
                  <Chain steps={flow.chain} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LENSES & GATES */}
      <section className="block block-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="block-title">Lenses &amp; gates that apply across</h2>
            <p className="block-sub">These don’t have a flow of their own — they hook into the ones above.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 mt-9">
            {CROSS_ITEMS.map((item, i) => (
              <Reveal key={item.name} delay={(i % 2) * 70}>
                <div className="feature h-full">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-mono text-[0.95rem] text-text">{item.name}</h4>
                    <span className={`kind ${item.kindClass}`}>{item.kind}</span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALL */}
      <section id="install" className="block scroll-mt-20">
        <div className="wrap wrap-narrow">
          <Reveal>
            <h2 className="block-title text-center">Install</h2>
            <p className="block-sub mx-auto text-center">
              One command. Works for Claude Code, Codex, Antigravity, and OpenCode.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-9 space-y-3">
              <CopyCommand comment="# interactive — pick assistants & scope" command="npx @ai-agent-lead/skills" />
              <CopyCommand comment="# everything, no prompts" command="npx @ai-agent-lead/skills --all --force" />
            </div>
            <p className="text-muted text-sm leading-relaxed mt-6 text-center">
              Scope it with <code className="ic">--global</code> (<code className="ic">~/.claude/skills</code>) or{" "}
              <code className="ic">--local</code> (<code className="ic">./.claude/skills</code>); target one assistant with{" "}
              <code className="ic">--claude</code>, <code className="ic">--codex</code>,{" "}
              <code className="ic">--antigravity</code>, or <code className="ic">--opencode</code>.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/flow" className="btn btn-ghost">
                Next: orchestrate your own agents with Flow <ArrowIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
