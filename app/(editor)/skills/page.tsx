import type { Metadata } from "next";
import { skills } from "@/content/skills";
import {
  chunk,
  CodeView,
  literalList,
  quote,
  Terminal,
  type Token,
} from "../../_components/code";

export const metadata: Metadata = {
  title: "skills.json",
};

function buildLines(): Token[][] {
  const { languages, ...groups } = skills;
  const langs = Object.entries(languages);
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
        ...literalList(row),
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
    // Every other group, in the order it appears in content/skills.ts.
    ...Object.entries(groups).flatMap(([key, items]) => arrayBlock(key, items)),
    [["plain", "}"]],
  ];
}

const lines = buildLines();

export default function Skills() {
  return (
    <>
      <CodeView lines={lines} />
      <Terminal command="jq '.ai-engineering | length'">
        {skills.devops.length} <span className="text-muted">— and growing</span>
      </Terminal>
    </>
  );
}
