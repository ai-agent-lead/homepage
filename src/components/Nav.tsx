"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LINKS } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/flow", label: "Flow" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-200"
      style={{
        background: scrolled ? "rgba(6,7,11,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border-soft)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between h-[64px]">
        <Link href="/" className="flex items-center gap-2 font-bold text-[1.06rem] tracking-tight">
          <span className="text-indigo">▮</span>
          AgentLead<span className="text-faint font-medium">.dev</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-[0.9rem] transition-colors"
              style={{
                color: isActive(item.href) ? "var(--color-text)" : "var(--color-muted)",
                background: isActive(item.href) ? "rgba(124,140,255,0.1)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={LINKS.org}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-3 py-2 rounded-lg text-[0.9rem] text-muted hover:text-text flex items-center gap-1.5 transition-colors"
          >
            <GitHubIcon /> <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
