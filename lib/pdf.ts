import type { AuditReport } from "./types";
import puppeteer from "puppeteer";

function text(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function reportHtml(report: AuditReport) {
  const top = report.topActions.slice(0, 5);
  const categories = report.categoryScores;
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>SEO QuickAudit Report</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111; }
    .cover { padding: 40px; border-bottom: 1px solid #ddd; }
    .title { font-size: 24px; font-weight: 700; }
    .meta { color: #555; margin-top: 4px; }
    .scores { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 20px; }
    .card { border: 1px solid #ddd; padding: 10px; }
    .section { margin-top: 24px; }
    .item { border: 1px solid #ddd; padding: 10px; margin-top: 8px; }
    .small { font-size: 12px; color: #555; }
  </style>
</head>
<body>
  <div class="cover">
    <div class="title">SEO QuickAudit</div>
    <div class="meta">${text(report.url)}</div>
    <div class="meta">${new Date(report.date).toLocaleString()}</div>
    <div class="section">
      <div>Global score: ${Math.round(report.globalScore)}</div>
      <div class="scores">
        <div class="card">Performance: ${Math.round(categories.performance)}</div>
        <div class="card">Accessibility: ${Math.round(categories.accessibility)}</div>
        <div class="card">Best Practices: ${Math.round(categories.bestPractices)}</div>
        <div class="card">SEO: ${Math.round(categories.seo)}</div>
      </div>
    </div>
  </div>
  <div class="section" style="padding: 20px;">
    <div class="title" style="font-size:18px;">Top actions</div>
    ${top.map((i) => `<div class="item"><div><b>${text(i.message)}</b></div><div class="small">${text(i.explanation)}</div><div class="small">Fix: ${text(i.fix)}</div></div>`).join("")}
    <div class="title" style="font-size:18px; margin-top:20px;">Checklist</div>
    ${report.checklist.map((i) => `<div class="item"><div><b>${text(i.message)}</b> <span class="small">(${i.severity})</span></div><div class="small">${text(i.explanation)}</div><div class="small">Fix: ${text(i.fix)}</div></div>`).join("")}
  </div>
</body>
</html>`;
}

export async function generatePdf(report: AuditReport) {
  const html = reportHtml(report);
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"], headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: false });
  await browser.close();
  return pdf;
}
