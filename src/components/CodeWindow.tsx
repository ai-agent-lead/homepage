import type { ReactNode } from "react";

type CodeWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

/** Terminal-style chrome around a block of code or shell output. */
export function CodeWindow({ title = "shell", children, className = "" }: CodeWindowProps) {
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-bar">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="terminal-title">{title}</span>
      </div>
      <pre className="terminal-body">
        <code>{children}</code>
      </pre>
    </div>
  );
}
