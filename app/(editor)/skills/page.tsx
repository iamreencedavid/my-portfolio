import type { Metadata } from "next";
import { site } from "@/content/about";
import { skills } from "@/content/skills";
import {
  chunk,
  CodeView,
  quote,
  Terminal,
  type Token,
} from "../../_components/code";

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

  // Long arrays wrap a few items per line, like a formatter would.
  const arrayBlock = (key: string, items: string[]): Token[][] => {
    const rows = chunk(items, 3);
    return [
      [
        ["plain", "  "],
        ["key", quote(key)],
        ["plain", ": ["],
      ],
      ...rows.map((row, i): Token[] => [
        ["plain", "    "],
        ...list(row),
        ...(i < rows.length - 1 ? [["plain", ","] as Token] : []),
      ]),
      [["plain", "  ],"]],
    ];
  };

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
    ...arrayBlock("management", skills.management),
    ...arrayBlock("frontend", skills.frontend),
    ...arrayBlock("backend", skills.backend),
    ...arrayBlock("databases", skills.databases),
    ...arrayBlock("devops", skills.devops),
    ...arrayBlock("ai", skills.ai),
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
