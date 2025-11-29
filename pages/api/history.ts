import type { NextApiRequest, NextApiResponse } from "next";
import { listAudits } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }
  const { url, limit } = req.query;
  const lim = typeof limit === "string" ? parseInt(limit) || 20 : 20;
  try {
    const items = listAudits(lim, typeof url === "string" ? url : undefined);
    res.status(200).json(items);
  } catch (e: any) {
    res.status(500).send(e.message || "History error");
  }
}
