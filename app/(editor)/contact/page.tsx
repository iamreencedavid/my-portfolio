import type { Metadata } from "next";
import { site } from "@/content/about";
import { contact } from "@/content/contact";
import { CodeView, quote, Terminal, type Token } from "../../_components/code";
import { ContactForm } from "../../_components/contact-form";

export const metadata: Metadata = {
  title: `contact.sh · ${site.brand}`,
};

function buildLines(): Token[][] {
  const variable = (name: string, value: string): Token[] => [
    ["ident", name],
    ["plain", "="],
    ["string", quote(value)],
  ];

  // Same as `variable`, but the URL inside the quotes opens in a new tab.
  const linkVariable = (name: string, url: string): Token[] => [
    ["ident", name],
    ["plain", "="],
    ["string", '"'],
    ["string", url, url],
    ["string", '"'],
  ];

  return [
    [["comment", "#!/bin/bash"]],
    [["comment", `# ${contact.tagline}`]],
    [],
    variable("EMAIL", site.email),
    linkVariable("GITHUB", contact.github),
    linkVariable("LINKEDIN", contact.linkedin),
    [],
    [
      ["keyword", "echo "],
      ["string", quote(contact.replyNote)],
    ],
  ];
}

export default function Contact() {
  return (
    <>
      <CodeView lines={buildLines()} cursor={false} />
      <Terminal command="./contact.sh" label="zsh">
        <ContactForm email={site.email} resume={contact.resume} />
      </Terminal>
    </>
  );
}
