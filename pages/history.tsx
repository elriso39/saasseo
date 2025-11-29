import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { AuditReport } from "../lib/types";

export default function HistoryPage() {
  const [items, setItems] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/history?limit=30`);
        if (!res.ok) throw new Error(await res.text());
        const data: AuditReport[] = await res.json();
        setItems(data);
      } catch (e: any) {
        setError(e.message || "History load failed");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>History</title>
      </Head>
      <div className="py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-7" />
          <h1 className="text-lg font-semibold">Audit History</h1>
        </div>
        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        <ul className="mt-6 space-y-2">
          {items.map((r) => (
            <li key={r.id} className="rounded border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r?.url}</div>
                  <div className="text-sm text-gray-600">{new Date(r.date).toLocaleString()}</div>
                </div>
                <div className="text-xl font-semibold">{Math.round(r.globalScore)}</div>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Perf {Math.round(r.categoryScores.performance)} · Acc {Math.round(r.categoryScores.accessibility)} · BP {Math.round(r.categoryScores.bestPractices)} · SEO {Math.round(r.categoryScores.seo)}
              </div>
              <div className="mt-2">
                <Link href={`/report?id=${r.id}`} className="text-brand-700 underline">Open report</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
