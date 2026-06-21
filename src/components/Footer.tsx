import Link from "next/link";
import { LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border-soft mt-8">
      <div className="wrap py-12 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-bold text-[1.06rem]">
            <span className="text-indigo">▮</span>
            AgentLead<span className="text-faint font-medium">.dev</span>
          </div>
          <p className="text-muted text-sm mt-3 max-w-xs leading-relaxed">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="text-faint text-xs font-mono uppercase tracking-wider mb-3">Products</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/skills" className="hover:text-text transition-colors">Skills</Link></li>
            <li><Link href="/flow" className="hover:text-text transition-colors">Flow</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-faint text-xs font-mono uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href={LINKS.skillsRepo} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Skills on GitHub</a></li>
            <li><a href={LINKS.flowRepo} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Flow on GitHub</a></li>
            <li><a href={LINKS.flowPyPI} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Flow on PyPI</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap pb-10 flex flex-wrap items-center justify-between gap-3 text-xs text-faint">
        <span>© {SITE.name}.dev — built for the humans leading the agents.</span>
        <span className="font-mono">Skills · Apache-2.0 &nbsp;·&nbsp; Flow · MIT</span>
      </div>
    </footer>
  );
}
