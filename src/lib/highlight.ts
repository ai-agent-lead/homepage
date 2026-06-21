import { createHighlighter, type Highlighter, type ThemeRegistrationRaw } from "shiki";

export type CodeLang = "yaml" | "python" | "bash" | "text";

// A TextMate theme tuned to the AgentLead palette so highlighted code matches
// the rest of the site (indigo keys, teal attrs, violet keywords, green strings).
const agentleadDark: ThemeRegistrationRaw = {
  name: "agentlead-dark",
  type: "dark",
  colors: { "editor.background": "#07090f", "editor.foreground": "#d3dae8" },
  settings: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5f6b80", fontStyle: "italic" } },
    { scope: ["string", "string.quoted", "string.unquoted", "meta.string"], settings: { foreground: "#7fe6b0" } },
    { scope: ["constant.numeric", "constant.language.boolean", "constant.language"], settings: { foreground: "#f0b429" } },
    { scope: ["keyword", "keyword.control", "keyword.operator.new", "storage.type", "storage.modifier"], settings: { foreground: "#b488ff" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call.generic"], settings: { foreground: "#38bdf8" } },
    { scope: ["entity.name.tag", "support.type.property-name", "entity.name.tag.yaml"], settings: { foreground: "#7c8cff" } },
    { scope: ["entity.other.attribute-name", "support.type", "support.constant"], settings: { foreground: "#4fd6c4" } },
    { scope: ["meta.decorator", "punctuation.decorator", "entity.name.function.decorator", "meta.function.decorator.python"], settings: { foreground: "#4fd6c4" } },
    { scope: ["variable", "meta.embedded", "variable.parameter"], settings: { foreground: "#d3dae8" } },
    { scope: ["punctuation", "meta.brace", "punctuation.separator", "punctuation.definition"], settings: { foreground: "#8893a7" } },
  ],
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [agentleadDark],
      langs: ["yaml", "python", "bash"],
    });
  }
  return highlighterPromise;
}

/** Highlight a code string to HTML at build time. Plain text passes through 'text'. */
export async function highlightCode(code: string, lang: CodeLang): Promise<string> {
  const highlighter = await getHighlighter();
  const useLang: CodeLang = lang === "text" ? "text" : lang;
  return highlighter.codeToHtml(code, {
    lang: useLang,
    theme: "agentlead-dark",
    transformers: [
      {
        // Drop Shiki's inline <pre> styles so our own terminal CSS controls it.
        pre(node) {
          delete node.properties.style;
          node.properties.class = "shiki";
        },
      },
    ],
  });
}
