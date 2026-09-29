import { about, site } from "@/content/about";
import { contact } from "@/content/contact";
import {
  chunk,
  CodeView,
  literalList,
  quote,
  Terminal,
  type Token,
} from "../_components/code";
import { icons } from "../_components/icons";
import { personJsonLd } from "../_components/seo";

function buildLines(): Token[][] {
  const field = (key: string, value: string): Token[] => [
    ["plain", `  ${key}: `],
    ["string", quote(value)],
    ["plain", ","],
  ];

  // Long strings wrap into `"…" +` pieces, the way Prettier would print them.
  const wrappedField = (key: string, value: string, width = 56): Token[][] => {
    const pieces: string[] = [];
    let current = "";
    for (const word of value.split(" ")) {
      if (current && current.length + word.length + 1 > width) {
        pieces.push(`${current} `);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    pieces.push(current);

    return [
      [["plain", `  ${key}:`]],
      ...pieces.map((piece, i): Token[] => [
        ["plain", "    "],
        ["string", quote(piece)],
        ["plain", i < pieces.length - 1 ? " +" : ","],
      ]),
    ];
  };

  const stackRows = chunk(about.stack, 3).map((row): Token[] => [
    ["plain", "    "],
    ...literalList(row),
    ["plain", ","],
  ]);

  return [
    [
      ["keyword", "const "],
      ["ident", "engineer"],
      ["plain", " = {"],
    ],
    field("name", about.name),
    ...wrappedField("bio", about.bio),
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

// Static content: build the lines once, not on every render.
const lines = buildLines();

// Person structured data for Google; `<` escaped so the JSON can't close the tag.
const jsonLd = JSON.stringify(
  personJsonLd([contact.github, contact.linkedin]),
).replace(/</g, "\\u003c");

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <CodeView lines={lines} />
      <Terminal
        command="npm run hire-me"
        note="— opening mail…"
        href={`mailto:${site.email}`}
      >
        {/* Phones get a proper tap target; desktop keeps the prompt link. */}
        <a
          href={`mailto:${site.email}`}
          className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-lg border border-border py-3 text-text transition-colors hover:bg-selected/50 focus-ring md:hidden"
        >
          {icons.mail}
          Get in touch
        </a>
      </Terminal>
    </>
  );
}
