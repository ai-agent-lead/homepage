"use client";

import { useState } from "react";

type CopyCommandProps = {
  command: string;
  /** optional label shown above the command, e.g. a comment */
  comment?: string;
};

/** A single shell command with a one-click copy button. */
export function CopyCommand({ command, comment }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-[#07090f] px-4 py-3 font-mono text-sm">
      <div className="min-w-0">
        {comment && <div className="text-faint text-xs mb-1">{comment}</div>}
        <div className="truncate">
          <span className="text-cyan select-none">$ </span>
          <span className="text-text">{command}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-md border border-border-soft px-2.5 py-1 text-xs text-muted hover:text-text hover:border-indigo transition-colors"
        aria-label="Copy command"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}
