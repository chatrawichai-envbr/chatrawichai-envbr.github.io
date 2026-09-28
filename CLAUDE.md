# CLAUDE.md

## Project

GitHub Pages user site of chatrawichai-tech (https://chatrawichai-tech.github.io/), published from `main` as is
(`.nojekyll`). It hosts the public build of the web apps whose code lives in the private repo `chatrawichai-tech/claude`.

- `doc-scanner-pdf/` — **generated** by claude's `tools/publish-site.sh` (git archive of claude's `doc-scanner-pdf/` at a
  commit + `tools/stamp-build.sh`; `version.json` = that claude commit). Never edit it here: change claude, test, publish.
- `doc-scanner-pdf-android/` — **generated** by the release job of `chatrawichai-tech/claude4app` (`tools/site/build-page.js`):
  the latest signed APK (only one, checked to be signed with the permanent key), `index.html` download page and
  `version.json` (version, SHA-256, signing certificate). Pushed with the write deploy key `SITE_DEPLOY_KEY` (claude4app
  secret); never edit it here — change claude4app's page builder and release again.
- `index.html`, `site.css` — home page listing the apps. `claude/index.html` — the app's old address
  (`/claude/`, the former project site of the claude repo) redirecting to `/doc-scanner-pdf/`.
  Hand-written, no scripts, strict CSP (`default-src 'none'; style-src 'self'`).
- `.github/workflows/live.yml` — after every push and daily: the app folder is a stamped build, the APK folder is
  consistent (one APK, matching SHA-256, linked), Pages serves this commit and every published file byte for byte, home
  page and redirect work.

## Required workflow

The owner's rules for claude apply (verify for real, review for bugs and vulnerabilities, fix, commit/push `main`).
Publish only a claude commit that is pushed and whose tests pass:

1. In claude: `tools/publish-site.sh` (writes `../chatrawichai-tech.github.io/doc-scanner-pdf/`).
2. Review `git status`/`git diff --stat` here (only `doc-scanner-pdf/` should change), serve this folder locally and
   check the app opens and works at `/doc-scanner-pdf/` (claude's harness `startServer({ root })` works).
3. Commit "Publish doc-scanner-pdf from claude@<sha12>: <summary>" and push `main`.
4. Confirm the `Live site` workflow is green and https://chatrawichai-tech.github.io/doc-scanner-pdf/version.json reports
   the commit. claude's daily `published-site.yml` checks the folder against `publish-site.sh` output.

## Conventions

- Adding another app: publish it into its own folder named after its claude folder, link it from `index.html`,
  add it to `live.yml` and README.
- UI text is Thai. Actions pinned to full commit SHAs. Commit messages: imperative summary, body with what and why.
