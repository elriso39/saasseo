import { getCategoryScores } from "./pagespeed";
import { analyzeHtml } from "./htmlAnalyzer";
import { buildReport } from "./scoring";
import { saveAudit } from "./db";
import type { AuditReport, ChecklistItem } from "./types";

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.hostname;
  } catch {
    return false;
  }
}

export async function runAudit(params: { url: string; tasksDone?: string[]; acceptanceThreshold?: number; apiKey?: string }): Promise<AuditReport> {
  const { url, tasksDone = [], acceptanceThreshold = parseInt(process.env.ACCEPTANCE_THRESHOLD || "80"), apiKey = process.env.PAGESPEED_API_KEY } = params;
  if (!isValidUrl(url)) throw new Error("Invalid URL");
  let categories = { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
  let checklist: ChecklistItem[] = [];
  try {
    categories = await getCategoryScores(url, apiKey);
  } catch {}
  try {
    const { items } = await analyzeHtml(url);
    checklist = items;
  } catch {}
  const report = buildReport(url, categories, checklist, tasksDone, acceptanceThreshold);
  try {
    const id = saveAudit(report);
    report.id = id;
  } catch {}
  return report;
}
