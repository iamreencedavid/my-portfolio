import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { pageMetadata } from "../../_components/seo";
import { CodeView, Terminal, type Token } from "../../_components/code";

export const metadata: Metadata = pageMetadata({
  title: "experience.md",
  description:
    "Reence David's career: senior full-stack roles at Officeworks, Emersion and Digital Central.",
  path: "/experience",
});

// Splits "a **b** `c`" into plain/bold/inline tokens, keeping the markers.
function inlineMd(text: string): Token[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    .filter(Boolean)
    .map((part): Token => {
      if (part.startsWith("**")) return ["bold", part];
      if (part.startsWith("`")) return ["inline", part];
      return ["plain", part];
    });
}

function buildLines(): Token[][] {
  const roles = experience.roles.map((role): Token[][] => [
    [
      ["subheading", `## ${role.title}`],
      ["comment", ` @ ${role.company}`],
    ],
    [["comment", `> ${role.period} · ${role.location}`]],
    ...role.highlights.map((h): Token[] => [["bullet", "- "], ...inlineMd(h)]),
  ]);

  return [
    [["heading", "# Experience"]],
    [],
    ...roles.flatMap((lines, i) => (i > 0 ? [[], ...lines] : lines)),
  ];
}

const lines = buildLines();

export default function Experience() {
  return (
    <>
      <CodeView lines={lines} />
      <Terminal command="git log --oneline career">
        {experience.careerLog.map(({ hash, message }) => (
          <p key={hash}>
            <span className="text-syn-literal">{hash}</span> {message}
          </p>
        ))}
      </Terminal>
    </>
  );
}
