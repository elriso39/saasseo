import type { NextApiRequest, NextApiResponse } from "next";
import { runAudit } from "../../lib/audit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const { url, tasksDone, acceptanceThreshold } = req.body || {};
  if (typeof url !== "string") {
    res.status(400).send("Missing url");
    return;
  }
  try {
    const report = await runAudit({ url, tasksDone: Array.isArray(tasksDone) ? tasksDone : [], acceptanceThreshold });
    res.status(200).json(report);
  } catch (e: any) {
    res.status(400).send(e.message || "Audit error");
  }
}
