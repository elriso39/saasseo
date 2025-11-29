export type CategoryScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type Severity = "critical" | "warning" | "info";

export type ChecklistItem = {
  id: string;
  category: keyof CategoryScores | "content" | "technical";
  severity: Severity;
  message: string;
  explanation: string;
  fix: string;
  impact?: number;
  done?: boolean;
};

export type AuditReport = {
  id?: number;
  url: string;
  date: string;
  globalScore: number;
  categoryScores: CategoryScores;
  checklist: ChecklistItem[];
  topActions: ChecklistItem[];
};
