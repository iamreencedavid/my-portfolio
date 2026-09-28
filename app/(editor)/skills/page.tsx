import type { Metadata } from "next";
import { site } from "@/content/about";
import { skills } from "@/content/skills";
import { CodeView, quote, Terminal, type Token } from "../../_components/code";

export const metadata: Metadata = {
  title: `skills.json · ${site.brand}`,
};

const list = (items: string[]): Token[] =>
  items.flatMap((item, i): Token[] => [
    ...(i > 0 ? [["plain", ", "] as Token] : []),
    ["literal", quote(item)],
  ]);

function buildLines(): Token[][] {
  const langs = Object.entries(skills.languages);
  const keyWidth = Math.max(...langs.map(([name]) => name.length + 3));

  const arrayBlock = (key: string, items: string[]): Token[][] => [
    [
      ["plain", "  "],
      ["key", quote(key)],
      ["plain", ": ["],
    ],
    [["plain", "    "], ...list(items)],
    [["plain", "  ],"]],
  ];

  return [
    [["plain", "{"]],
    [
      ["plain", "  "],
      ["key", quote("languages")],
      ["plain", ": {"],
    ],
    ...langs.map(([name, level], i): Token[] => [
      ["plain", "    "],
      ["key", quote(name)],
      ["plain", ":".padEnd(keyWidth - name.length - 1)],
      ["number", String(level)],
      ["plain", i < langs.length - 1 ? "," : " "],
      ["bar", String(level)],
    ]),
    [["plain", "  },"]],
    ...arrayBlock("frontend", skills.frontend),
    ...arrayBlock("backend", skills.backend),
    [
      ["plain", "  "],
      ["key", quote("devops")],
      ["plain", ": ["],
      ...list(skills.devops),
      ["plain", "],"],
    ],
    [
      ["plain", "  "],
      ["key", quote("learning")],
      ["plain", ": "],
      ["literal", quote(skills.learning)],
    ],
    [["plain", "}"]],
  ];
}

export default function Skills() {
  return (
    <>
      <CodeView lines={buildLines()} />
      <Terminal
        command="jq '.devops | length'"
        output={
          <>
            {skills.devops.length}{" "}
            <span className="text-muted">— and growing</span>
          </>
        }
      />
    </>
  );
}
