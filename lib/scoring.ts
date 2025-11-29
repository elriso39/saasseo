import type { AuditReport, CategoryScores, ChecklistItem } from "./types";

function avg(scores: number[]) {
  if (!scores.length) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function computeGlobalScore(categories: CategoryScores, checklist: ChecklistItem[], tasksDone: string[] = []) {
  const base = avg([categories.performance, categories.accessibility, categories.bestPractices, categories.seo]);
  let bonus = 0;
  let penalty = 0;
  checklist.forEach((item) => {
    const done = tasksDone.includes(item.id);
    const impact = item.impact || 3;
    if (done) return;
    if (item.severity === "critical") penalty += impact * 1.2;
    else if (item.severity === "warning") penalty += impact;
    else bonus += 0.5;
  });
  const score = Math.max(0, Math.min(100, Math.round(base - penalty + Math.min(10, bonus))));
  return score;
}

export function prioritize(checklist: ChecklistItem[], tasksDone: string[] = []) {
  const items = checklist.filter((i) => !tasksDone.includes(i.id));
  const weight = (i: ChecklistItem) => {
    const s = i.severity === "critical" ? 3 : i.severity === "warning" ? 2 : 1;
    const imp = i.impact || 3;
    return s * 10 + imp;
  };
  return items.sort((a, b) => weight(b) - weight(a)).slice(0, 10);
}

export function buildReport(url: string, categories: CategoryScores, checklist: ChecklistItem[], tasksDone: string[], acceptanceThreshold: number): AuditReport {
  const globalScore = computeGlobalScore(categories, checklist, tasksDone);
  const topActions = prioritize(checklist, tasksDone);
  return {
    url,
    date: new Date().toISOString(),
    globalScore,
    categoryScores: categories,
    checklist,
    topActions,
  };
}
