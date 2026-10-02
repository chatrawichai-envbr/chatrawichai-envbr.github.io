# CLAUDE.md

## Project

`chatrawichai-envbr/doc-scanner-pdf` — the GitHub Pages **project** site https://chatrawichai-envbr.github.io/doc-scanner-pdf/, published
from `main` as is (`.nojekyll`). It hosts the public build of the apps whose code lives in `chatrawichai-envbr/doc-scanner-pdf-code`
(web), `chatrawichai-envbr/doc-scanner-pdf-android` (Android) and `chatrawichai-envbr/doc-scanner-pdf-gas` (Apps Script). Restored on
2026-10-01 from `chatrawichai-tech/chatrawichai-tech.github.io` (a user site; that account's repositories are gone —
claude4code → doc-scanner-pdf-code, claude4app → doc-scanner-pdf-android, claude4gas → doc-scanner-pdf-gas). The owner
chose to keep this repository's name, so the site lives under `/doc-scanner-pdf/`: **every link must be relative**
(never `href="/…"`; `live.yml` checks the home page and the Android pages).

- `doc-scanner-pdf/` — **generated** by doc-scanner-pdf-code's `tools/publish-site.sh` (git archive of its
  `doc-scanner-pdf/` at a commit + `tools/stamp-build.sh`; `version.json` = that commit) →
  https://chatrawichai-envbr.github.io/doc-scanner-pdf/doc-scanner-pdf/. Never edit it here: change doc-scanner-pdf-code, test, publish.
- `doc-scanner-pdf-android/` — **generated** by the release job of `chatrawichai-envbr/doc-scanner-pdf-android`
  (`tools/site/build-page.js`): the latest signed APK (only one, checked to be signed with the permanent key),
  `index.html` download page, `privacy.html` (the app's privacy policy, Thai + English — its URL is given to Google Play)
  and `version.json` (version, SHA-256, signing certificate). Pushed with the write deploy key `SITE_DEPLOY_KEY` (secret of
  that repo); never edit it here — change its page builder and release (or run the builder with the released APK).
- `index.html`, `site.css` — home page listing the apps. Hand-written, no scripts, strict CSP
  (`default-src 'none'; style-src 'self'`).
- `.github/workflows/live.yml` — after every push and daily: the app folder is a stamped build, the APK folder is
  consistent (one APK, matching SHA-256, linked), Pages serves this commit and every published file byte for byte, the
  home page and the Android pages use relative links.

## Required workflow

The owner's rules for doc-scanner-pdf-code apply (verify for real, review for bugs and vulnerabilities, fix, commit/push
`main`). Publish only a doc-scanner-pdf-code commit that is pushed and whose tests pass:

1. In doc-scanner-pdf-code: `tools/publish-site.sh` (writes `../doc-scanner-pdf/doc-scanner-pdf/`).
2. Review `git status`/`git diff --stat` here (only `doc-scanner-pdf/` should change), serve this folder locally and
   check the app opens and works at `/doc-scanner-pdf/doc-scanner-pdf/` (the code repo's harness `startServer({ root })` works).
3. Commit "Publish doc-scanner-pdf from doc-scanner-pdf-code@<sha12>: <summary>" and push `main`.
4. Confirm the `Live site` workflow is green and https://chatrawichai-envbr.github.io/doc-scanner-pdf/doc-scanner-pdf/version.json
   reports the commit. The code repo's daily `published-site.yml` checks the folder against `publish-site.sh` output.

GitHub Pages must be on (Settings → Pages → Deploy from a branch → `main` / `(root)`) — only the owner can turn it on.

## Conventions

- Adding another app: publish it into its own folder named after its source folder, link it relatively from
  `index.html`, add it to `live.yml` and README.
- UI text is Thai. Reply to the owner in Thai only (owner, 2026-10-01: *"ขอข้อความภาษาไทยเท่านั้น"*). Actions pinned to
  full commit SHAs. Commit messages: imperative summary, body with what and why.
