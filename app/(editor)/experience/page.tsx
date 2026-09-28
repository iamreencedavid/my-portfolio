import type { Metadata } from "next";
import { site } from "@/content/about";
import { experience } from "@/content/experience";
import { CodeView, Terminal, type Token } from "../../_components/code";

export const metadata: Metadata = {
  title: `experience.md · ${site.brand}`,
};

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

export default function Experience() {
  return (
    <>
      <CodeView lines={buildLines()} />
      <Terminal
        command="git log --oneline career"
        output={experience.careerLog.map(({ hash, message }) => (
          <p key={hash}>
            <span className="text-syn-literal">{hash}</span> {message}
          </p>
        ))}
      />
    </>
  );
}
