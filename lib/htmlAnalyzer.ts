import axios from "axios";
import * as cheerio from "cheerio";
import type { ChecklistItem } from "./types";

function originOf(url: string) {
  const u = new URL(url);
  return `${u.protocol}//${u.hostname}`;
}

export async function analyzeHtml(url: string): Promise<{ items: ChecklistItem[]; okCount: number }> {
  const items: ChecklistItem[] = [];
  let ok = 0;
  let html = "";
  try {
    const res = await axios.get(url, { timeout: 20000 });
    html = res.data as string;
  } catch {
    html = "";
  }
  const $ = cheerio.load(html || "");

  const isHttps = url.startsWith("https://");
  if (!isHttps) {
    items.push({
      id: "https",
      category: "bestPractices",
      severity: "critical",
      message: "Site is not served over HTTPS",
      explanation: "HTTPS protects data integrity and is a ranking factor.",
      fix: "Enable HTTPS with a valid TLS certificate.",
      impact: 10,
    });
  } else ok++;

  const title = $("title").text().trim();
  if (!title) {
    items.push({
      id: "title",
      category: "seo",
      severity: "warning",
      message: "Missing meta title",
      explanation: "Title summarizes page content and influences search results.",
      fix: "Add a concise, keyword-rich title (50–60 chars).",
      impact: 6,
    });
  } else ok++;

  const desc = $('meta[name="description"]').attr("content")?.trim() || "";
  if (!desc) {
    items.push({
      id: "meta_description",
      category: "seo",
      severity: "warning",
      message: "Missing meta description",
      explanation: "Description improves click-through from search.",
      fix: "Add a unique description (50–160 chars).",
      impact: 5,
    });
  } else ok++;

  const canonical = $('link[rel="canonical"]').attr("href") || "";
  if (!canonical) {
    items.push({
      id: "canonical",
      category: "seo",
      severity: "info",
      message: "Missing canonical URL",
      explanation: "Canonical prevents duplicate content issues.",
      fix: "Add a canonical link to the preferred URL.",
      impact: 3,
    });
  } else ok++;

  const viewport = $('meta[name="viewport"]').attr("content") || "";
  if (!viewport || !viewport.includes("width=device-width")) {
    items.push({
      id: "viewport",
      category: "performance",
      severity: "warning",
      message: "Missing mobile viewport",
      explanation: "Viewport ensures proper scaling on mobile.",
      fix: "Add meta viewport with width=device-width, initial-scale=1.",
      impact: 6,
    });
  } else ok++;

  const h1s = $("h1").length;
  if (h1s !== 1) {
    items.push({
      id: "h1_structure",
      category: "seo",
      severity: h1s === 0 ? "warning" : "info",
      message: h1s === 0 ? "Missing H1 heading" : "Multiple H1 headings",
      explanation: "One clear H1 helps structure and relevance.",
      fix: "Ensure exactly one H1 that reflects primary topic.",
      impact: 5,
    });
  } else ok++;

  const h2s = $("h2").length;
  if (h2s < 1) {
    items.push({
      id: "h2_structure",
      category: "seo",
      severity: "info",
      message: "Consider adding H2 sections",
      explanation: "Subheadings improve readability and keyword coverage.",
      fix: "Add descriptive H2s to segment content.",
      impact: 2,
    });
  } else ok++;

  const imgs = $("img");
  let missingAlt = 0;
  imgs.each((_, el) => {
    const alt = $(el).attr("alt") || "";
    if (!alt.trim()) missingAlt++;
  });
  if (missingAlt > 0) {
    items.push({
      id: "img_alt",
      category: "accessibility",
      severity: missingAlt > 3 ? "warning" : "info",
      message: "Images missing alt text",
      explanation: "Alt text improves accessibility and SEO.",
      fix: "Add meaningful alt to all images.",
      impact: 4,
    });
  } else ok++;

  let lazyMissing = 0;
  imgs.each((_, el) => {
    const lazy = $(el).attr("loading") || "";
    if (lazy.toLowerCase() !== "lazy") lazyMissing++;
  });
  if (lazyMissing > 0) {
    items.push({
      id: "img_lazy",
      category: "performance",
      severity: lazyMissing > 3 ? "info" : "info",
      message: "Images without lazy loading",
      explanation: "Lazy loading reduces initial payload.",
      fix: "Add loading=lazy to non-critical images.",
      impact: 3,
    });
  } else ok++;

  const ldJson = $('script[type="application/ld+json"]').length;
  if (ldJson < 1) {
    items.push({
      id: "jsonld",
      category: "seo",
      severity: "info",
      message: "Missing JSON-LD structured data",
      explanation: "Structured data improves rich results.",
      fix: "Add relevant JSON-LD schema.",
      impact: 3,
    });
  } else ok++;

  let robotsOk = false;
  let sitemapOk = false;
  try {
    const robotsRes = await axios.get(`${originOf(url)}/robots.txt`, { timeout: 8000 });
    robotsOk = robotsRes.status === 200;
  } catch {}
  if (!robotsOk) {
    items.push({
      id: "robots",
      category: "seo",
      severity: "info",
      message: "robots.txt not found",
      explanation: "Robots guides crawler behavior.",
      fix: "Provide a robots.txt at the site root.",
      impact: 2,
    });
  } else ok++;
  try {
    const sitemapRes = await axios.get(`${originOf(url)}/sitemap.xml`, { timeout: 8000 });
    sitemapOk = sitemapRes.status === 200;
  } catch {}
  if (!sitemapOk) {
    items.push({
      id: "sitemap",
      category: "seo",
      severity: "info",
      message: "sitemap.xml not found",
      explanation: "Sitemaps help discovery and indexing.",
      fix: "Publish a sitemap.xml and reference in robots.txt.",
      impact: 2,
    });
  } else ok++;

  return { items, okCount: ok };
}
