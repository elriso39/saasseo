# 🚀 SEO QuickAudit

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)

**Automated SEO auditing tool for small and medium businesses**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Why SEO QuickAudit?](#-why-seo-quickaudit)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**SEO QuickAudit** is a minimal SaaS-style web application that performs automated SEO audits for small and medium enterprises. Enter any URL and receive a comprehensive text-based PDF report with global and category-specific scores, a detailed checklist of issues, and prioritized action items.

The tool combines real-time PageSpeed Insights data with thorough HTML analysis to provide actionable recommendations. Users can mark tasks as completed and re-run audits to track improvements until reaching a configurable quality threshold.

---

## 💡 Why SEO QuickAudit?

- **🎯 Focused on SMEs**: Designed specifically for small and medium businesses without dedicated SEO teams
- **📊 Actionable Insights**: Not just scores—get prioritized tasks with clear explanations and fixes
- **🔄 Iterative Improvement**: Mark tasks as done and re-audit to track your progress
- **📱 Mobile-First**: Prioritizes mobile performance, reflecting real-world user behavior
- **📄 PDF Reports**: Generate professional, shareable reports for clients or stakeholders
- **⚡ Fast & Lightweight**: No complex setup—just enter a URL and get results
- **🔒 Privacy-Focused**: No data persistence, client-side state management only

---

## ✨ Features

### Core Functionality
- ✅ **Automated SEO Auditing**: Comprehensive analysis combining PageSpeed Insights and HTML checks
- ✅ **Global Scoring System**: Weighted scoring based on severity and impact of issues
- ✅ **Category Breakdown**: Separate scores for Performance, Accessibility, Best Practices, and SEO
- ✅ **Prioritized Actions**: Up to 10 actionable recommendations, with top 3 highlighted
- ✅ **Interactive Checklist**: Mark tasks as completed and track your progress
- ✅ **Re-audit Capability**: Instant re-scanning with updated recommendations
- ✅ **PDF Export**: Professional text-based reports ready to share

### Technical Features
- 🔍 **PageSpeed Integration**: Mobile-first scores with desktop fallback
- 🧪 **HTML Analysis**: 10+ checks including meta tags, structured data, and accessibility
- 💾 **Smart Caching**: TTL-based cache to optimize API calls
- 🛡️ **Error Handling**: Graceful degradation with HTML-only fallback mode
- 🎨 **Responsive UI**: Mobile-first design with Tailwind CSS
- 🔧 **Type-Safe**: Full TypeScript coverage for reliability

### SEO Checks Included
- Meta title and description
- Canonical URLs
- robots.txt and sitemap.xml presence
- H1/H2 heading structure
- Image alt attributes
- HTTPS enforcement
- Mobile viewport configuration
- Image lazy-loading
- JSON-LD structured data
- Core Web Vitals (via PageSpeed)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (React + TypeScript) |
| **Styling** | Tailwind CSS |
| **API Routes** | Next.js API Routes |
| **External APIs** | Google PageSpeed Insights |
| **HTML Parsing** | Cheerio |
| **PDF Generation** | Puppeteer |
| **HTTP Client** | Axios |
| **Testing** | Jest |
| **Containerization** | Docker |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Google PageSpeed Insights API key (recommended)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/elriso39/saasseo.git
cd saasseo
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
PAGESPEED_API_KEY=your_api_key_here
PORT=3000
ACCEPTANCE_THRESHOLD=80
```

> 💡 **Note**: `PAGESPEED_API_KEY` is highly recommended for reliable PageSpeed access. Get your free API key from [Google Cloud Console](https://console.cloud.google.com/).

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 🚀 Usage

### Basic Workflow

1. **Enter URL**: On the home page, input the website URL you want to audit
2. **Review Report**: Analyze the global score and category breakdowns
3. **Check Actions**: Review the top 10 prioritized action items (top 3 highlighted)
4. **Mark Completed**: Toggle checklist items as you fix them
5. **Re-audit**: Click "Re-audit" to get updated scores and recommendations
6. **Export PDF**: Download a professional report for your records or clients

### Understanding Scores

- **Global Score**: Overall site health (0-100)
  - Calculated from PageSpeed category averages
  - Minus penalties for unresolved critical issues
  - Plus bonuses for informational checks passed
  - Target: ≥ `ACCEPTANCE_THRESHOLD` (default: 80)

- **Category Scores**: Individual metrics from PageSpeed Insights
  - **Performance**: Loading speed and resource optimization
  - **Accessibility**: User experience for all visitors
  - **Best Practices**: Modern web standards compliance
  - **SEO**: Search engine optimization fundamentals

---

## 📁 Project Structure

```
saasseo/
├── pages/                    # Next.js pages and API routes
│   ├── index.tsx            # Home page with URL input
│   ├── report.tsx           # Report UI with interactive checklist
│   └── api/
│       ├── audit.ts         # POST /api/audit - Main audit endpoint
│       └── pdf.ts           # POST /api/pdf - PDF generation
├── lib/                      # Core business logic
│   ├── audit.ts             # Audit orchestration
│   ├── pagespeed.ts         # PageSpeed client with TTL cache
│   ├── htmlAnalyzer.ts      # HTML parsing and checks
│   ├── scoring.ts           # Score calculation and prioritization
│   ├── pdf.ts               # PDF generation logic
│   └── types.ts             # Shared TypeScript types
├── tests/                    # Jest unit tests
│   ├── scoring.test.ts      # Scoring algorithm tests
│   └── audit.test.ts        # Audit logic tests
├── templates/
│   └── pdf_template.html.ts # HTML template for PDF generation
├── samples/                  # Example files
│   ├── example_api.json     # Sample API response
│   └── sample_pdf_text.txt  # Sample PDF output
├── styles/
│   └── globals.css          # Global Tailwind styles
├── public/
│   └── logo.svg             # Application logo
├── .env.example             # Environment variables template
├── Dockerfile               # Docker configuration
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## 🔌 API Reference

### POST `/api/audit`

Perform an SEO audit on the specified URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "tasksDone": ["title", "meta_description"],
  "acceptanceThreshold": 85
}
```

**Parameters:**
- `url` (string, required): The URL to audit
- `tasksDone` (string[], optional): Array of task IDs marked as completed
- `acceptanceThreshold` (number, optional): Target score threshold (0-100)

**Response:**
```json
{
  "url": "https://example.com",
  "globalScore": 85,
  "categories": {
    "performance": 90,
    "accessibility": 85,
    "bestPractices": 88,
    "seo": 95
  },
  "checklist": [...],
  "topActions": [...],
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

See `samples/example_api.json` for a complete response example.

### POST `/api/pdf`

Generate a PDF report from audit results.

**Request Body:**
```json
{
  "report": { 
    /* AuditReport object */
  }
}
```

**Response:**
- Content-Type: `application/pdf`
- Downloadable PDF file with audit results

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PAGESPEED_API_KEY` | Google PageSpeed Insights API key | - | Recommended |
| `PORT` | Server port | 3000 | No |
| `ACCEPTANCE_THRESHOLD` | Target quality score (0-100) | 80 | No |

### Audit Behavior

- **Mobile-First**: PageSpeed fetches mobile scores primarily, desktop as fallback
- **Caching**: Results cached with TTL to prevent API quota exhaustion
- **Graceful Degradation**: If PageSpeed fails, returns HTML-only audit
- **Action Limit**: Maximum 10 prioritized actions per report
- **Top Highlights**: UI emphasizes top 3 most critical actions

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

**Test Coverage:**
- `scoring.test.ts`: Score calculation and action prioritization
- `audit.test.ts`: Invalid URL handling and HTML-only fallback

Additional commands:

```bash
npm run lint        # ESLint check
npm run typecheck   # TypeScript validation
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Import your repository in Vercel dashboard
2. Set environment variables in Project Settings
3. Deploy

**Note for Serverless PDF Generation:**
- Consider switching to `puppeteer-core` with a compatible Chromium build
- Or use alternative PDF libraries like `jsPDF` or `react-pdf`
- Local Node.js runtimes work out of the box with standard `puppeteer`

### Docker

Build the image:
```bash
docker build -t seo-quickaudit .
```

Run the container:
```bash
docker run -p 3000:3000 \
  --env PORT=3000 \
  --env ACCEPTANCE_THRESHOLD=80 \
  --env PAGESPEED_API_KEY=your_key_here \
  seo-quickaudit
```

---

## 🗺️ Roadmap

### Planned Features
- [ ] User authentication and accounts
- [ ] Report history persistence (database integration)
- [ ] Advanced SEO checks and deeper analysis
- [ ] Internationalization (i18n)
- [ ] Improved accessibility compliance
- [ ] Competitive analysis features
- [ ] Scheduled audits and monitoring
- [ ] Email notifications for score changes
- [ ] Multi-page site scanning

### Technical Improvements
- [ ] Switch to `puppeteer-core` for serverless compatibility
- [ ] Implement Redis caching for better scalability
- [ ] Add rate limiting per user/IP
- [ ] Expand test coverage
- [ ] Add E2E tests with Playwright
- [ ] Performance optimizations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google PageSpeed Insights API for performance metrics
- Next.js team for the amazing framework
- Open source community for the excellent tools and libraries

---

<div align="center">

**[⬆ back to top](#-seo-quickaudit)**

Made with ❤️ by [elriso39](https://github.com/elriso39)

If you find this project helpful, please consider giving it a ⭐!


</div>

