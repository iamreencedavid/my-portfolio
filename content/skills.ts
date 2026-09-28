// Skills data rendered in the editor pane as `src/skills.json`.
export const SKILL_MAX = 5;

export const skills = {
  languages: {
    TypeScript: 5,
    Go: 4,
    Python: 4,
  } as Record<string, number>,
  frontend: ["React", "Next.js", "Tailwind"],
  backend: ["Node", "PostgreSQL", "Redis"],
  devops: ["Docker", "AWS", "CI/CD"],
  learning: "Rust",
};
