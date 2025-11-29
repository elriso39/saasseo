import Head from "next/head";

export default function SettingsPage() {
  const threshold = process.env.NEXT_PUBLIC_ACCEPTANCE_THRESHOLD || process.env.ACCEPTANCE_THRESHOLD || "80";
  return (
    <div className="container">
      <Head>
        <title>Settings</title>
      </Head>
      <div className="py-6">
        <h1 className="text-lg font-semibold">Settings</h1>
        <div className="mt-4 space-y-4">
          <div className="rounded border p-4">
            <div className="text-sm text-gray-600">Acceptance threshold</div>
            <div className="text-xl font-semibold">{threshold}</div>
          </div>
          <div className="rounded border p-4">
            <div className="text-sm text-gray-600">PageSpeed API key</div>
            <div className="text-sm text-gray-700">Set `PAGESPEED_API_KEY` in environment for reliable audits.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
