# Contributing to SEO QuickAudit

First off, thank you for considering contributing to SEO QuickAudit! It's people like you that make this tool better for everyone. 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to uphold this code.

**Expected Behavior:**
- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

**Unacceptable Behavior:**
- Harassment, discrimination, or derogatory comments
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Any conduct which could reasonably be considered inappropriate

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/elriso39/saasseo/issues) to avoid duplicates. When you create a bug report, include as many details as possible.

**How to submit a good bug report:**

1. **Use a clear and descriptive title** for the issue
2. **Describe the exact steps to reproduce the problem** in as many details as possible
3. **Provide specific examples** - include URLs, screenshots, or code snippets
4. **Describe the behavior you observed** and what you expected to see
5. **Include details about your environment:**
   - OS version
   - Node.js version
   - Browser (if applicable)
   - Any relevant configuration

**Bug Report Template:**

```markdown
**Description:**
A clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g., macOS 14.0]
- Node.js: [e.g., v18.17.0]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional Context:**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Before creating an enhancement suggestion, please check if it's already been suggested.

**How to submit a good enhancement suggestion:**

1. **Use a clear and descriptive title**
2. **Provide a detailed description** of the suggested enhancement
3. **Explain why this enhancement would be useful** to most users
4. **List any alternatives** you've considered
5. **Include mockups or examples** if possible

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm always frustrated when [...]

**Describe the solution you'd like:**
A clear description of what you want to happen.

**Describe alternatives you've considered:**
Any alternative solutions or features you've considered.

**Additional context:**
Any other context, screenshots, or examples about the feature request.
```

### Your First Code Contribution

Unsure where to start? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Issues that need attention
- `documentation` - Documentation improvements

**Getting Started:**

1. Comment on the issue you'd like to work on
2. Wait for maintainer approval before starting work
3. Fork the repository and create a branch
4. Make your changes following our coding standards
5. Test your changes thoroughly
6. Submit a pull request

### Pull Requests

1. **Fork the repo** and create your branch from `main`
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** following our coding standards

3. **Add or update tests** as needed

4. **Ensure all tests pass**
   ```bash
   npm run test
   npm run lint
   npm run typecheck
   ```

5. **Update documentation** if you're changing functionality

6. **Commit your changes** using conventional commit messages

7. **Push to your fork** and submit a pull request to the `main` branch

8. **Wait for review** - a maintainer will review your PR and may request changes

**Pull Request Guidelines:**

- Keep PRs focused on a single feature or fix
- Include tests for new functionality
- Update relevant documentation
- Keep commits clean and well-organized
- Respond to review feedback promptly
- Be patient - reviews may take a few days

**PR Title Format:**
```
feat: add new SEO check for Open Graph tags
fix: resolve PDF generation timeout issue
docs: update installation instructions
refactor: improve scoring algorithm performance
test: add tests for HTML analyzer
```

---

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm
- Git

### Local Development

1. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/saasseo.git
   cd saasseo
   ```

2. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/elriso39/saasseo.git
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Run tests:**
   ```bash
   npm run test
   npm run test:watch  # Watch mode for development
   ```

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Avoid `any` types** - use proper types or `unknown` when necessary
- **Define interfaces** for complex objects
- **Use type inference** where it makes code cleaner

```typescript
// Good
interface AuditResult {
  score: number;
  url: string;
  timestamp: Date;
}

const getAudit = async (url: string): Promise<AuditResult> => {
  // ...
};

// Avoid
const getAudit = async (url: any): Promise<any> => {
  // ...
};
```

### Code Style

We use ESLint and Prettier to maintain code consistency.

**Key Principles:**
- Use **camelCase** for variables and functions
- Use **PascalCase** for components and types
- Use **UPPER_SNAKE_CASE** for constants
- Keep functions small and focused (single responsibility)
- Write descriptive variable and function names
- Add comments for complex logic

```typescript
// Good
const calculateGlobalScore = (categories: CategoryScores): number => {
  // Average of all category scores
  return Object.values(categories).reduce((sum, score) => sum + score, 0) / 4;
};

// Avoid
const calc = (c: any): number => {
  return Object.values(c).reduce((s, sc) => s + sc, 0) / 4;
};
```

### File Organization

- **Components**: Place React components in `pages/` or create `components/` if needed
- **Business Logic**: Keep in `lib/` directory
- **Types**: Define in `lib/types.ts` or co-locate with relevant files
- **Tests**: Mirror source structure in `tests/` directory
- **Utilities**: Create `lib/utils.ts` for shared utilities

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { NextPage } from 'next';

// 2. Internal modules
import { performAudit } from '@/lib/audit';
import { AuditReport } from '@/lib/types';

// 3. Styles
import styles from './Component.module.css';
```

---

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(audit): add Open Graph meta tags check

Add validation for og:title, og:description, and og:image tags
to improve social media sharing score.

Closes #123

---

fix(pdf): resolve timeout on large reports

Increase Puppeteer timeout from 30s to 60s and add better
error handling for PDF generation failures.

Fixes #456

---

docs(readme): update installation instructions

Add troubleshooting section for common Windows installation issues.
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep first line under 72 characters
- Reference issues and PRs when applicable
- Provide context in the body for complex changes

---

## Testing Guidelines

### Writing Tests

- **Test files** should be in the `tests/` directory
- **File naming**: `filename.test.ts`
- **Coverage**: Aim for at least 80% code coverage on new code
- **Test types**: Unit tests required, integration tests encouraged

### Test Structure

```typescript
describe('calculateGlobalScore', () => {
  it('should return average of category scores', () => {
    const categories = {
      performance: 90,
      accessibility: 80,
      bestPractices: 85,
      seo: 95
    };
    
    const result = calculateGlobalScore(categories);
    
    expect(result).toBe(87.5);
  });

  it('should handle empty categories', () => {
    const result = calculateGlobalScore({});
    
    expect(result).toBe(0);
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm run test htmlAnalyzer.test.ts
```

### What to Test

- **Core logic**: Scoring, prioritization, parsing
- **API routes**: Request/response handling
- **Error cases**: Invalid inputs, API failures, timeouts
- **Edge cases**: Empty data, extreme values, malformed input

---

## Documentation

Good documentation is just as important as good code!

### Code Documentation

- Add **JSDoc comments** for public functions
- Explain **why**, not just what
- Document **complex algorithms**
- Include **usage examples** for utilities

```typescript
/**
 * Calculates the global SEO score based on PageSpeed categories
 * and HTML check results.
 * 
 * @param categories - PageSpeed Insights category scores
 * @param checklist - Array of HTML check results
 * @returns Global score between 0-100
 * 
 * @example
 * const score = calculateGlobalScore(
 *   { performance: 90, accessibility: 85, bestPractices: 80, seo: 95 },
 *   [{ id: 'title', passed: true }, { id: 'meta', passed: false }]
 * );
 * // Returns: 85
 */
export const calculateGlobalScore = (
  categories: CategoryScores,
  checklist: ChecklistItem[]
): number => {
  // Implementation...
};
```

### README Updates

When adding features:
- Update the Features section
- Add API documentation if applicable
- Update configuration if new env vars are added
- Add to Roadmap if partially implemented

---

## Community

### Where to Ask Questions

- **GitHub Discussions**: For general questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code-specific questions

### Getting Help

If you're stuck:
1. Check existing documentation
2. Search closed issues
3. Ask in GitHub Discussions
4. Be patient and respectful

### Recognition

Contributors will be recognized in:
- GitHub Contributors page
- Future CONTRIBUTORS.md file
- Release notes for significant contributions

---

## Thank You! 🙏

Your contributions make this project better for everyone. Whether you're fixing a typo, adding a feature, or reporting a bug, every contribution is valuable.

**Happy coding!** 🚀

---

<div align="center">

[Back to README](README.md) • [View Issues](https://github.com/elriso39/saasseo/issues) • [Submit PR](https://github.com/elriso39/saasseo/pulls)

</div>