import axios from "axios";
import { TTLCache } from "./cache";
import type { CategoryScores } from "./types";

const ttlMinutes = 10;
const cache = new TTLCache<string, any>(ttlMinutes * 60 * 1000);

async function runPagespeed(url: string, strategy: "mobile" | "desktop", apiKey?: string) {
  const key = `${url}|${strategy}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const params: Record<string, string> = { url, strategy };
  if (apiKey) params.key = apiKey;
  const res = await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
    params,
    timeout: 20000,
  });
  cache.set(key, res.data);
  return res.data;
}

export async function getCategoryScores(url: string, apiKey?: string): Promise<CategoryScores> {
  try {
    const mobile = await runPagespeed(url, "mobile", apiKey);
    const m = mobile.lighthouseResult?.categories || {};
    const toScore = (x: any) => (typeof x?.score === "number" ? Math.round(x.score * 100) : 0);
    const mPerf = toScore(m.performance);
    const mAcc = toScore(m.accessibility);
    const mBP = toScore(m["best-practices"]);
    const mSeo = toScore(m.seo);
    if (mPerf + mAcc + mBP + mSeo > 0) {
      return { performance: mPerf, accessibility: mAcc, bestPractices: mBP, seo: mSeo };
    }
  } catch {}
  try {
    const desktop = await runPagespeed(url, "desktop", apiKey);
    const d = desktop.lighthouseResult?.categories || {};
    const toScore = (x: any) => (typeof x?.score === "number" ? Math.round(x.score * 100) : 0);
    return {
      performance: toScore(d.performance),
      accessibility: toScore(d.accessibility),
      bestPractices: toScore(d["best-practices"]),
      seo: toScore(d.seo),
    };
  } catch {}
  return { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
}
