// Experience data rendered in the editor pane as `src/experience.md`.
// Highlights support inline **bold** and `code`.
export const experience = {
  roles: [
    {
      title: "Senior engineer",
      company: "Stripe-like Co.",
      period: "2022 — present",
      location: "Remote",
      highlights: [
        "Rebuilt payments dashboard, **-40% load**",
        "Mentored 4 engineers",
        "Stack: `React` `Go` `AWS`",
      ],
    },
    {
      title: "Software engineer",
      company: "Startup",
      period: "2019 — 2022",
      location: "Manila",
      highlights: [
        "Built core API from zero to **1M req/day**",
        "Set up CI/CD and test culture",
      ],
    },
  ],
  careerLog: [
    { hash: "e3f9a1c", message: "feat: promoted to senior engineer" },
    { hash: "b72d04e", message: "feat: shipped first API to prod" },
    { hash: "1a0c5f2", message: "init: hello, world" },
  ],
};
