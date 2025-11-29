import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      new URL(url);
    } catch {
      setError("Enter a valid URL including protocol.");
      return;
    }
    setLoading(true);
    try {
      router.push(`/report?u=${encodeURIComponent(url)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>SEO QuickAudit</title>
      </Head>
      <div className="py-10">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-semibold">SEO QuickAudit</h1>
        </div>
        <p className="mt-4 text-gray-700">Automated basic SEO audit for small and medium businesses.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded bg-brand-600 text-white px-4 py-2 hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Audit"}
          </button>
        </form>
        <div className="mt-8 text-sm text-gray-600">
          <p>Mobile-first audit using PageSpeed Insights with HTML checks.</p>
        </div>
      </div>
    </div>
  );
}
