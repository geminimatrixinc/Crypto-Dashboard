# Check-In 1: Base CI Workflow + Tests/Linting Setup

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a GitHub Actions CI workflow that runs test, lint, and build commands on all PRs (including dependabot PRs). Add simple Jest tests and ESLint rules so CI will fail on existing dependabot PRs, giving us real failures to work with in Check-In 2.

**Architecture:** 
- Generic `.github/workflows/ci.yml` that detects which stages have package.json files and runs `npm test`, `npm run lint`, `npm run build` for each
- ESLint configs for back-end and front-end with rules that may break on future dependency bumps
- Simple Jest tests that pass initially (so we can add breaking rules later)
- Root-level `.github/dependabot.yml` configured to bump npm/yarn dependencies

**Tech Stack:** 
- Jest (testing)
- ESLint (linting)
- GitHub Actions
- Node.js

## Global Constraints

- Back-end: Node.js 16+ compatible (Express, Mongoose, CORS)
- Front-end: React 18 (already set up with react-scripts)
- All npm scripts must be idempotent and work in CI environment
- Workflows must be generic enough to snap into multiple repos later

---

## File Structure

**New files:**
- `.github/workflows/ci.yml` — Main CI workflow (runs tests, lint, build)
- `.github/dependabot.yml` — Dependabot configuration at repo root
- `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/.eslintrc.json` — ESLint config
- `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/__tests__/sample.test.js` — Sample Jest test
- `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/__tests__/sample.test.js` — Sample Jest test (front-end specific)

**Modified files:**
- `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/package.json` — Add jest, eslint devDeps; update scripts
- `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/package.json` — Add eslint devDep; add lint script

---

## Tasks

### Task 1: Set Up Back-End Testing & Linting

**Files:**
- Modify: `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/package.json`
- Create: `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/.eslintrc.json`
- Create: `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/__tests__/sample.test.js`
- Create: `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/jest.config.js`

**Interfaces:**
- Produces: 
  - NPM scripts: `npm test` (runs jest), `npm run lint` (runs eslint), `npm run build` (placeholder that passes)
  - Jest configuration at `jest.config.js`
  - ESLint configuration at `.eslintrc.json`

- [ ] **Step 1: Update back-end package.json with dev dependencies**

Replace the scripts section and add devDependencies:

```json
{
  "name": "back-end",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js",
    "test": "jest",
    "lint": "eslint .",
    "build": "echo 'No build required for Express backend'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.1"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "nodemon": "^3.0.2"
  }
}
```

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\back-end" && npm install`
Expected: All dependencies install successfully

- [ ] **Step 2: Create jest.config.js for back-end**

Create file `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    '**/*.js',
    '!node_modules/**',
    '!__tests__/**',
    '!jest.config.js',
  ],
};
```

- [ ] **Step 3: Create .eslintrc.json for back-end**

Create file `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/.eslintrc.json`:

```json
{
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2]
  }
}
```

- [ ] **Step 4: Create simple Jest test for back-end**

Create directory `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/__tests__`

Create file `fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/__tests__/sample.test.js`:

```javascript
describe('Sample Back-End Test', () => {
  test('should pass basic assertion', () => {
    expect(true).toBe(true);
  });

  test('should validate app module exists', () => {
    // Simple check that app.js can be required
    const appPath = '../app.js';
    expect(() => require(appPath)).not.toThrow();
  });
});
```

- [ ] **Step 5: Run Jest to verify test passes**

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\back-end" && npm test`
Expected: PASS - "2 passed"

- [ ] **Step 6: Run ESLint to verify it passes**

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\back-end" && npm run lint`
Expected: No errors or warnings (or only warnings for existing code)

- [ ] **Step 7: Commit back-end test setup**

```bash
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/package.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/package-lock.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/jest.config.js
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/.eslintrc.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/__tests__/
git commit -m "test: add jest and eslint configuration for back-end"
```

---

### Task 2: Set Up Front-End ESLint & Test

**Files:**
- Modify: `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/package.json`
- Create: `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/.eslintrc.json`
- Create: `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/src/__tests__/sample.test.js`

**Interfaces:**
- Produces:
  - NPM scripts: `npm test` (already exists via react-scripts), `npm run lint` (new), `npm run build` (already exists)
  - ESLint configuration at `.eslintrc.json`
  - Jest test at `src/__tests__/sample.test.js`

- [ ] **Step 1: Add ESLint to front-end package.json**

Update `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/package.json`:
- Add `"lint": "eslint src"` to scripts
- Add `"eslint": "^8.56.0"` to devDependencies

The scripts section should look like:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --watchAll=false",
  "eject": "react-scripts eject",
  "lint": "eslint src"
}
```

The devDependencies should include (among existing):
```json
"devDependencies": {
  "eslint": "^8.56.0"
}
```

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\front-end-ui" && npm install`
Expected: Dependencies install successfully

- [ ] **Step 2: Create .eslintrc.json for front-end**

Create file `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-console": "warn"
  }
}
```

- [ ] **Step 3: Create simple Jest test for front-end**

Create directory `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/src/__tests__`

Create file `fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/src/__tests__/sample.test.js`:

```javascript
describe('Sample Front-End Test', () => {
  test('should pass basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  test('should verify React is available', () => {
    const React = require('react');
    expect(React).toBeDefined();
  });
});
```

- [ ] **Step 4: Run front-end tests**

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\front-end-ui" && npm test -- --testPathPattern=sample.test.js`
Expected: PASS - "2 passed"

- [ ] **Step 5: Run front-end ESLint**

Run: `cd "C:\_GIT\Crypto-Dashboard\fs-crypto-coin-tracker\stage-2-node-express-mongo\front-end-ui" && npm run lint`
Expected: No errors or only warnings for existing code

- [ ] **Step 6: Commit front-end test setup**

```bash
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/package.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/package-lock.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/.eslintrc.json
git add fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/src/__tests__/
git commit -m "test: add eslint configuration and sample test for front-end"
```

---

### Task 3: Create Base CI Workflow

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: 
  - `package.json` files in any stage with `test`, `lint`, `build` scripts
  - Dependabot PR detection via GitHub Actions `github.actor == 'dependabot[bot]'`
- Produces:
  - CI status checks on all PRs
  - Workflow logs visible in GitHub Actions tab

- [ ] **Step 1: Create .github directory structure**

Run:
```bash
mkdir -p "C:\_GIT\Crypto-Dashboard\.github\workflows"
```

- [ ] **Step 2: Create CI workflow**

Create file `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      back-end: ${{ steps.changes.outputs.back-end }}
      front-end: ${{ steps.changes.outputs.front-end }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Detect changed paths
        id: changes
        run: |
          # Get list of changed files
          if [ "${{ github.event_name }}" == "pull_request" ]; then
            CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)
          else
            CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD)
          fi
          
          # Check which stages have changes
          if echo "$CHANGED_FILES" | grep -q "fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end/"; then
            echo "back-end=true" >> $GITHUB_OUTPUT
          else
            echo "back-end=false" >> $GITHUB_OUTPUT
          fi
          
          if echo "$CHANGED_FILES" | grep -q "fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui/"; then
            echo "front-end=true" >> $GITHUB_OUTPUT
          else
            echo "front-end=false" >> $GITHUB_OUTPUT
          fi
          
          echo "Changed files: $CHANGED_FILES"

  test-back-end:
    needs: detect-changes
    if: needs.detect-changes.outputs.back-end == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end

      - name: Run tests
        run: npm test
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end

      - name: Run linter
        run: npm run lint
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end

      - name: Run build
        run: npm run build
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end

  test-front-end:
    needs: detect-changes
    if: needs.detect-changes.outputs.front-end == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui

      - name: Run tests
        run: npm test -- --watchAll=false
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui

      - name: Run linter
        run: npm run lint
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui

      - name: Run build
        run: npm run build
        working-directory: fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui
```

- [ ] **Step 2: Commit CI workflow**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add github actions workflow for test, lint, build"
```

---

### Task 4: Create Root-Level Dependabot Config

**Files:**
- Create: `.github/dependabot.yml`

**Interfaces:**
- Produces:
  - Dependabot will automatically open PRs for npm/yarn updates
  - Grouped by ecosystem and directory
  - Runs on Mondays (or as configured)

- [ ] **Step 1: Create dependabot.yml**

Create file `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Back-end dependencies
  - package-ecosystem: npm
    directory: "fs-crypto-coin-tracker/stage-2-node-express-mongo/back-end"
    schedule:
      interval: weekly
      day: monday
      time: "03:00"
    open-pull-requests-limit: 10
    pull-request-branch-name:
      separator: "/"
    groups:
      all-deps:
        patterns:
          - "*"

  # Front-end dependencies
  - package-ecosystem: npm
    directory: "fs-crypto-coin-tracker/stage-2-node-express-mongo/front-end-ui"
    schedule:
      interval: weekly
      day: monday
      time: "03:00"
    open-pull-requests-limit: 10
    pull-request-branch-name:
      separator: "/"
    groups:
      all-deps:
        patterns:
          - "*"
```

- [ ] **Step 2: Commit dependabot config**

```bash
git add .github/dependabot.yml
git commit -m "ci: configure dependabot for weekly npm updates"
```

---

### Task 5: Push and Verify CI on Existing Dependabot PRs

**Files:** None

**Interfaces:**
- Consumes: All previous tasks' outputs
- Produces: CI workflow runs on all dependabot PRs

- [ ] **Step 1: Push all commits to main**

```bash
git push origin main
```

- [ ] **Step 2: Check GitHub Actions**

Navigate to: `https://github.com/geminimatrixinc/Crypto-Dashboard/actions`

Look for recent workflow runs. If CI is active, you should see:
- `CI` workflow runs triggered
- Jobs for `detect-changes`, `test-back-end`, `test-front-end`

- [ ] **Step 3: Wait for CI to run on existing dependabot PRs**

The workflow should automatically trigger on the 5-7 open dependabot PRs. Check:
`https://github.com/geminimatrixinc/Crypto-Dashboard/pulls?q=is%3Apr+is%3Aopen+author%3Adependabot`

You should see CI results (green checkmarks ✓ or red X) on each PR.

- [ ] **Step 4: Review failed CI checks**

Click on any failed dependabot PR → click "Details" on the failed check
This will show the error logs (test failures, lint errors, build errors)

**Expected outcome:** At least one dependabot PR should fail CI with an error we can see in the logs.

This completes Check-In 1. The CI workflow is running, tests are configured, and we have real CI failures to work with in Check-In 2.

---

## Self-Review Checklist

✅ **Spec Coverage:**
- `.github/workflows/ci.yml` created (detects changes, runs test/lint/build)
- ESLint configs for back-end and front-end
- Jest tests for both back-end and front-end
- Root-level `.github/dependabot.yml` configured
- Package.json scripts updated with test, lint, build

✅ **No Placeholders:** All code blocks are complete and runnable

✅ **Type/Interface Consistency:** All npm scripts are named consistently (test, lint, build)

✅ **Testability:** Each task can be independently tested

---
