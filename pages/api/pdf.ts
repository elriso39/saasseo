import type { NextApiRequest, NextApiResponse } from "next";
import { generatePdf } from "../../lib/pdf";
import type { AuditReport } from "../../lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const { report } = req.body || {} as { report: AuditReport };
  if (!report || !report.url) {
    res.status(400).send("Missing report");
    return;
  }
  try {
    const pdf = await generatePdf(report);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=seo_quickaudit_report.pdf");
    res.status(200).send(pdf);
  } catch (e: any) {
    res.status(500).send(e.message || "PDF error");
  }
}
