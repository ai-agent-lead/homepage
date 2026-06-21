import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentlead.dev"),
  title: {
    default: "AgentLead — lead your AI agents like a team",
    template: "%s · AgentLead",
  },
  description:
    "AgentLead is two open-source tools for the human in the loop. Skills make the agent in your editor follow real engineering discipline. Flow lets you stand up and direct your own team of agents in YAML — with durable state and clear lines of authority.",
  keywords: [
    "AgentLead",
    "Claude Code",
    "AI agents",
    "agent orchestration",
    "YAML agents",
    "agentlead-flow-core",
    "agentic-flow",
    "Gemini",
    "Anthropic",
    "engineering discipline",
  ],
  openGraph: {
    title: "AgentLead — lead your AI agents like a team",
    description:
      "You set the standard; your agents follow it. Skills disciplines the agent in your editor. Flow lets you direct your own team of agents in YAML.",
    url: "https://agentlead.dev",
    siteName: "AgentLead",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentLead — lead your AI agents like a team",
    description:
      "You set the standard; your agents follow it. Skills for the agent in your editor, Flow for the team you deploy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
