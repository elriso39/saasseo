import { computeGlobalScore, prioritize } from "../lib/scoring";
import type { CategoryScores, ChecklistItem } from "../lib/types";

const categories: CategoryScores = { performance: 80, accessibility: 90, bestPractices: 85, seo: 88 };

const checklist: ChecklistItem[] = [
  { id: "https", category: "bestPractices", severity: "critical", message: "HTTPS", explanation: "", fix: "", impact: 10 },
  { id: "title", category: "seo", severity: "warning", message: "Title", explanation: "", fix: "", impact: 6 },
  { id: "jsonld", category: "seo", severity: "info", message: "JSON-LD", explanation: "", fix: "", impact: 3 },
];

test("global score decreases with issues", () => {
  const s1 = computeGlobalScore(categories, checklist, []);
  const s2 = computeGlobalScore(categories, checklist, ["https", "title"]);
  expect(s1).toBeLessThan(s2);
});

test("prioritize orders by severity and impact", () => {
  const p = prioritize(checklist);
  expect(p[0].id).toBe("https");
});
