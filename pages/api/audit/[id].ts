import type { NextApiRequest, NextApiResponse } from "next";
import { getAudit } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }
  const { id } = req.query;
  const num = Array.isArray(id) ? parseInt(id[0]) : parseInt(id || "");
  if (!num) {
    res.status(400).send("Missing id");
    return;
  }
  try {
    const report = getAudit(num);
    if (!report) {
      res.status(404).send("Not found");
      return;
    }
    res.status(200).json(report);
  } catch (e: any) {
    res.status(500).send(e.message || "Audit fetch error");
  }
}
