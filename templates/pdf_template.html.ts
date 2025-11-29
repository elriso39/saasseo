import type { AuditReport } from "../lib/types";
import { reportHtml } from "../lib/pdf";

export function sampleTemplate(report: AuditReport) {
  return reportHtml(report);
}
