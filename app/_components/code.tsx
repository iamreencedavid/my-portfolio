import type { ReactNode } from "react";
import { SKILL_MAX } from "@/content/skills";

type Kind =
  | "keyword"
  | "ident"
  | "key"
  | "string"
  | "literal"
  | "number"
  | "comment"
  | "plain"
  | "heading"
  | "subheading"
  | "bullet"
  | "bold"
  | "inline"
  | "bar";
// A "bar" token's text is the level, rendered as a SKILL_MAX-segment meter.
// An optional third item turns the token into an external link.
export type Token = [Kind, string, href?: string];

const tokenClass: Record<Kind, string> = {
  keyword: "text-syn-keyword",
  ident: "text-syn-ident",
  key: "text-syn-ident",
  string: "text-syn-string",
  literal: "text-syn-literal",
  number: "text-syn-number",
  comment: "text-muted",
  plain: "text-text",
  heading: "text-syn-keyword",
  subheading: "text-syn-ident",
  bullet: "text-syn-literal",
  bold: "text-syn-string",
  inline: "text-syn-number",
  bar: "",
};

export const quote = (s: string) => `"${s}"`;

// `"a", "b", "c"` as tokens: quoted literals joined by commas.
export const literalList = (items: string[]): Token[] =>
  items.flatMap((item, i): Token[] =>
    i > 0
      ? [
          ["plain", ", "],
          ["literal", quote(item)],
        ]
      : [["literal", quote(item)]],
  );

export function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    rows.push(items.slice(i, i + size));
  return rows;
}

function LevelBar({ level }: { level: number }) {
  return (
    <span
      role="img"
      aria-label={`${level} of ${SKILL_MAX}`}
      className="ml-[1em] inline-flex h-[0.95em] translate-y-[0.12em] align-baseline"
    >
      {Array.from({ length: SKILL_MAX }, (_, i) => (
        <span
          key={i}
          className={`w-[0.6em] ${i < level ? "bg-online" : "level-empty"}`}
        />
      ))}
    </span>
  );
}

export function CodeView({
  lines,
  cursor = true,
}: {
  lines: Token[][];
  cursor?: boolean;
}) {
  return (
    <pre className="mb-6 overflow-x-auto md:mb-10 md:min-h-0 md:flex-1 md:overflow-y-auto text-[13px] leading-6 sm:text-sm sm:leading-7 lg:text-base lg:leading-8 xl:text-lg xl:leading-9">
      <code>
        {lines.map((tokens, i) => {
          const last = i === lines.length - 1;
          return (
            <div key={i} className="flex">
              <span
                className={`w-[2.75em] shrink-0 select-none pr-[1em] text-right ${
                  last ? "text-text" : "text-muted"
                }`}
              >
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {tokens.map(([kind, text, href], j) =>
                  kind === "bar" ? (
                    <LevelBar key={j} level={Number(text)} />
                  ) : href ? (
                    <a
                      key={j}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tokenClass[kind]} underline decoration-current/40 underline-offset-4 hover:decoration-current focus-ring`}
                    >
                      {text}
                    </a>
                  ) : (
                    <span key={j} className={tokenClass[kind]}>
                      {text}
                    </span>
                  ),
                )}
                {last && cursor && (
                  <span
                    className="cursor ml-0.5 inline-block h-[1.2em] w-[0.55em] translate-y-[0.2em] bg-text"
                    aria-hidden
                  />
                )}
              </span>
            </div>
          );
        })}
      </code>
    </pre>
  );
}

export function Terminal({
  command,
  cwd = "~",
  note,
  href,
  label,
  children,
}: {
  command: string;
  cwd?: string;
  note?: string;
  href?: string;
  label?: string;
  children?: ReactNode;
}) {
  const prompt = (
    <>
      <span className="text-online">→</span>
      <span className="text-syn-ident">{cwd}</span>
      <span
        className={
          href ? "group-hover:underline group-focus-visible:underline" : ""
        }
      >
        {command}
      </span>
      {note && <span className="text-muted">{note}</span>}
    </>
  );

  return (
    <div className="mt-auto shrink-0 border-t border-border pt-4 text-[13px] sm:text-lg md:pt-6 lg:text-xl">
      <p className="mb-3 flex justify-between text-xs tracking-wider text-muted sm:mb-4 sm:text-sm lg:text-base">
        TERMINAL
        {label && <span className="tracking-normal">{label}</span>}
      </p>
      {href ? (
        <a
          href={href}
          className="group inline-flex flex-wrap items-center gap-x-2 text-text"
        >
          {prompt}
        </a>
      ) : (
        <p className="flex flex-wrap items-center gap-x-2 text-text">
          {prompt}
        </p>
      )}
      {/* Command output: text lines or interactive content. */}
      {children && <div className="mt-2 space-y-1 text-text">{children}</div>}
    </div>
  );
}
