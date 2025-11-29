import Database from "better-sqlite3";
import type { AuditReport } from "./types";

const db = new Database("data.sqlite");
db.exec(
  "CREATE TABLE IF NOT EXISTS audits (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "url TEXT NOT NULL," +
    "date TEXT NOT NULL," +
    "globalScore REAL NOT NULL," +
    "categoryScores TEXT NOT NULL," +
    "checklist TEXT NOT NULL," +
    "topActions TEXT NOT NULL" +
  ")"
);

export function saveAudit(report: AuditReport): number {
  const stmt = db.prepare(
    "INSERT INTO audits (url, date, globalScore, categoryScores, checklist, topActions) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const info = stmt.run(
    report.url,
    report.date,
    report.globalScore,
    JSON.stringify(report.categoryScores),
    JSON.stringify(report.checklist),
    JSON.stringify(report.topActions)
  );
  return Number(info.lastInsertRowid);
}

export function listAudits(limit = 20, url?: string) {
  if (url) {
    const rows = db
      .prepare("SELECT * FROM audits WHERE url = ? ORDER BY id DESC LIMIT ?")
      .all(url, limit);
    return rows.map(rowToReport);
  }
  const rows = db.prepare("SELECT * FROM audits ORDER BY id DESC LIMIT ?").all(limit);
  return rows.map(rowToReport);
}

export function getAudit(id: number): AuditReport | null {
  const row = db.prepare("SELECT * FROM audits WHERE id = ?").get(id);
  if (!row) return null;
  const r = rowToReport(row);
  return r;
}

function rowToReport(row: any): AuditReport {
  return {
    id: row.id,
    url: row.url,
    date: row.date,
    globalScore: row.globalScore,
    categoryScores: JSON.parse(row.categoryScores),
    checklist: JSON.parse(row.checklist),
    topActions: JSON.parse(row.topActions),
  };
}
