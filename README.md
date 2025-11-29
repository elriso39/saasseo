# SEO QuickAudit

SEO QuickAudit is a minimal SaaS-style web app that runs a basic automated SEO audit for SMEs. Enter a URL, get a text-only PDF report with global and per-category scores, a checklist of issues, and prioritized actions. Mark tasks as done and re-audit to refresh recommendations until your score meets a configurable threshold.

## Stack

- Next.js (React, TypeScript)
- Tailwind CSS
- Backend via Next.js API routes
- PageSpeed Insights API
- HTML parsing with Cheerio
- PDF generation with Puppeteer
- Fetch via `axios`
- Optional minimal storage via client state (no server persistence)

## Features

- Mobile-first PageSpeed scores combined with HTML checks
- Checklist items include id, category, severity, message, explanation, fix
- Up to 10 prioritized actions (severity + impact); top 3 highlighted in UI
- Text-only PDF with cover and body
- Simple TTL cache to limit PageSpeed calls
- Errors handled: invalid URL, API quota, timeouts; HTML-only fallback when PageSpeed fails

## Project Structure

```
.
├─ pages/            Next.js pages and API routes
│  ├─ index.tsx      Home with URL input
│  ├─ report.tsx     Report UI and actions
│  └─ api/
│     ├─ audit.ts    POST /api/audit
│     └─ pdf.ts      POST /api/pdf
├─ lib/              Core logic
│  ├─ audit.ts       Orchestration
│  ├─ pagespeed.ts   PageSpeed client with TTL cache
│  ├─ htmlAnalyzer.ts HTML checks via Cheerio
│  ├─ scoring.ts     Global score and prioritization
│  ├─ pdf.ts         HTML → PDF generation
│  └─ types.ts       Shared types
├─ styles/globals.css Tailwind styles
├─ public/logo.svg   Placeholder logo
├─ templates/pdf_template.html.ts  Sample HTML template function
├─ tests/            Jest unit tests
│  ├─ scoring.test.ts
│  └─ audit.test.ts
├─ samples/          Examples
│  ├─ example_api.json
│  └─ sample_pdf_text.txt
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.js
├─ .env.example
└─ Dockerfile
```

## Environment

Create `.env.local` with:

```
PAGESPEED_API_KEY=your_key_here
PORT=3000
ACCEPTANCE_THRESHOLD=80
```

`PAGESPEED_API_KEY` is recommended for reliable PageSpeed access. `ACCEPTANCE_THRESHOLD` sets the target score for acceptable health.

## Install & Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Audit Logic

- Fetch PageSpeed (mobile primary, desktop fallback). Extract category scores: performance, accessibility, best-practices, SEO.
- Fetch HTML and parse checks: meta title, meta description, canonical, robots.txt, sitemap.xml, H1/H2, alt attributes, HTTPS, mobile viewport, image lazy-loading, JSON-LD.
- Compute `globalScore` as the average of PageSpeed categories minus penalties for unresolved checklist items plus small bonus for informational items. Clamp to 0–100.
- Build `topActions` by sorting unresolved checklist items by severity and impact. Limit to 10; UI highlights top 3.
- When PageSpeed fails, return HTML-only audit.

## Re-audit Flow

- On the Report page, toggle checklist items as done.
- Click Re-audit to request `/api/audit` with `tasksDone`. The server suppresses penalties for checked items, regenerates scores and actions, and returns an updated report.
- Repeat until `globalScore` meets or exceeds `ACCEPTANCE_THRESHOLD`.

## API

### POST /api/audit

Input:

```json
{
  "url": "https://example.com",
  "tasksDone": ["title", "meta_description"],
  "acceptanceThreshold": 85
}
```

Output: `AuditReport` JSON.

See `samples/example_api.json`.

### POST /api/pdf

Input:

```json
{
  "report": { /* AuditReport */ }
}
```

Output: `application/pdf` download of the text-only report.

## Tests

```bash
npm run test
```

- `tests/scoring.test.ts` verifies scoring and prioritization.
- `tests/audit.test.ts` verifies invalid URL handling and HTML-only fallback behavior.

## Deployment

### Vercel

- Import the repository.
- Set environment variables in Project Settings.
- Deploy. For PDF generation on serverless, consider `puppeteer-core` with a compatible Chromium build. Local Node runtimes work out of the box with `puppeteer`.

### Docker

```bash
docker build -t seo-quickaudit .
docker run -p 3000:3000 --env PORT=3000 --env ACCEPTANCE_THRESHOLD=80 seo-quickaudit
```

## Sample PDF Template

`templates/pdf_template.html.ts` exports a function that generates the HTML used for PDF creation. The produced PDF uses only text with minimal styling.

`samples/sample_pdf_text.txt` shows an example text output.

## UX Copy

- Home: "Automated basic SEO audit for small and medium businesses."
- Report: "Global score" and clear action labels.
- PDF: Plain text with clear sections and actionable language.

## Next Steps For Production

- Use `puppeteer-core` or Playwright with a serverless-friendly Chromium.
- Add auth and user accounts.
- Persist report history in a database (SQLite, Postgres).
- Add more checks and deeper scoring calibration.
- Improve i18n and accessibility.

## Lint & Typecheck

```bash
npm run lint
npm run typecheck
```
