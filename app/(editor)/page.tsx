import { about, site } from "@/content/about";
import {
  chunk,
  CodeView,
  quote,
  Terminal,
  type Token,
} from "../_components/code";

function buildLines(): Token[][] {
  const field = (key: string, value: string): Token[] => [
    ["plain", `  ${key}: `],
    ["string", quote(value)],
    ["plain", ","],
  ];

  const stackRows = chunk(about.stack, 3).map((row): Token[] => [
    ["plain", "    "],
    ...row.flatMap((item, i): Token[] => [
      ...(i > 0 ? [["plain", ", "] as Token] : []),
      ["literal", quote(item)],
    ]),
    ["plain", ","],
  ]);

  return [
    [
      ["keyword", "const "],
      ["ident", "engineer"],
      ["plain", " = {"],
    ],
    field("name", about.name),
    field("bio", about.bio),
    field("role", about.role),
    field("location", about.location),
    [["plain", "  stack: ["]],
    ...stackRows,
    [["plain", "  ],"]],
    [
      ["plain", "  yearsShipping: "],
      ["number", String(about.yearsShipping)],
      ["plain", ","],
    ],
    [["plain", "};"]],
    [],
    [["comment", "// currently obsessed with"]],
    [
      ["ident", "engineer"],
      ["plain", "."],
      ["ident", "build"],
      ["plain", "("],
      ["string", quote(about.obsession)],
      ["plain", ");"],
    ],
  ];
}

export default function About() {
  return (
    <>
      <CodeView lines={buildLines()} />
      <Terminal
        command="npm run hire-me"
        note="— opening mail…"
        href={`mailto:${site.email}`}
      />
    </>
  );
}
