import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AuditReport, ChecklistItem } from "../lib/types";

export default function ReportPage() {
  const router = useRouter();
  const urlParam = typeof router.query.u === "string" ? router.query.u : "";
  const idParam = typeof router.query.id === "string" ? router.query.id : "";
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doneIds, setDoneIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchAudit = async () => {
      setLoading(true);
      setError("");
      try {
        let res: Response;
        if (idParam) {
          res = await fetch(`/api/audit/${idParam}`);
        } else {
          if (!urlParam) return;
          res = await fetch("/api/audit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlParam, tasksDone: doneIds }),
          });
        }
        if (!res.ok) throw new Error(await res.text());
        const data: AuditReport = await res.json();
        setReport(data);
      } catch (e: any) {
        setError(e.message || "Audit failed");
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [urlParam, idParam]);

  const toggleDone = (id: string) => {
    setDoneIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const reAudit = async () => {
    if (!urlParam) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlParam, tasksDone: doneIds }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: AuditReport = await res.json();
      setReport(data);
    } catch (e: any) {
      setError(e.message || "Audit failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!report) return;
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seo_quickaudit_report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const top3 = useMemo(() => (report?.topActions || []).slice(0, 3), [report]);

  return (
    <div className="container">
      <Head>
        <title>Report</title>
      </Head>
      <div className="py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-7" />
          <h1 className="text-lg font-semibold">Audit Report</h1>
        </div>
        {urlParam && <p className="mt-2 text-sm text-gray-600">{urlParam}</p>}
        {idParam && <p className="mt-2 text-sm text-gray-600">Saved report ID: {idParam}</p>}
        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {report && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{Math.round(report.globalScore)}</div>
              <div className="text-gray-600">Global score</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border p-4"><div className="text-sm text-gray-600">Performance</div><div className="text-xl font-semibold">{Math.round(report.categoryScores.performance)}</div></div>
              <div className="rounded border p-4"><div className="text-sm text-gray-600">Accessibility</div><div className="text-xl font-semibold">{Math.round(report.categoryScores.accessibility)}</div></div>
              <div className="rounded border p-4"><div className="text-sm text-gray-600">Best Practices</div><div className="text-xl font-semibold">{Math.round(report.categoryScores.bestPractices)}</div></div>
              <div className="rounded border p-4"><div className="text-sm text-gray-600">SEO</div><div className="text-xl font-semibold">{Math.round(report.categoryScores.seo)}</div></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Top actions</h2>
              <ul className="mt-3 space-y-2">
                {top3.map((item) => (
                  <li key={item.id} className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.message}</span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{item.severity}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{item.explanation}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Checklist</h2>
              <ul className="mt-3 space-y-2">
                {report.checklist.map((item: ChecklistItem) => (
                  <li key={item.id} className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={doneIds.includes(item.id)} onChange={() => toggleDone(item.id)} />
                        <span className="font-medium">{item.message}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{item.severity}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{item.explanation}</div>
                    <div className="text-sm text-gray-900 mt-1">Fix: {item.fix}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <button onClick={reAudit} className="rounded bg-brand-600 text-white px-4 py-2 hover:bg-brand-700">Re-audit</button>
              <a href="/history" className="rounded border border-gray-300 px-4 py-2">View history</a>
              <button onClick={downloadPdf} className="rounded border border-gray-300 px-4 py-2">Download PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
