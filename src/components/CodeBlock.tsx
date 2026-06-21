import { highlightCode, type CodeLang } from "@/lib/highlight";

type CodeBlockProps = {
  title?: string;
  code: string;
  lang: CodeLang;
  className?: string;
};

/**
 * Terminal-chromed, syntax-highlighted code block. Highlighting runs at build
 * time (Shiki, server-only), so nothing ships to the client beyond static HTML.
 */
export async function CodeBlock({ title, code, lang, className = "" }: CodeBlockProps) {
  const html = await highlightCode(code, lang);
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-bar">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="terminal-title">{title ?? lang}</span>
      </div>
      <div className="code-host" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
