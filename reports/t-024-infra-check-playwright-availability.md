# T-024: Check Playwright Availability

## Task

- [x] **(S)** T-024 [infra] Check playwright availability: npx playwright --version, verify Chromium installation -- full spec: docs/plans/00-infrastructure.md @ T-024

## Summary

Verified that Playwright CLI is installed and functional (version 1.60.0). Confirmed Chromium browser binaries are present on the system: an older Playwright-managed Chromium (chromium-1208) is fully installed in the Playwright cache, and a system-installed Chromium (147.0.7727.137, Arch Linux package) is available at `/usr/bin/chromium`. Headless mode was verified working with the system Chromium — it successfully launched and rendered HTML content. The matching Chromium for Playwright 1.60.0 (chromium-1223) is not yet installed but would be downloaded on first use.

## Files changed

- `research/indexes/tools-reference.md` — appended Playwright section with availability status, Chromium details, and headless verification results
- `reports/t-024-infra-check-playwright-availability.md` — this report file

## Commands run

```
$ npx playwright --version
Version 1.60.0

$ npx playwright install --dry-run chromium
Chrome for Testing 148.0.7778.96 (playwright chromium v1223)
  Install location:    /home/kitty/.cache/ms-playwright/chromium-1223
  Download url:        https://cdn.playwright.dev/builds/cft/148.0.7778.96/linux64/chrome-linux64.zip

$ ls /home/kitty/.cache/ms-playwright/
chromium-1208  chromium_headless_shell-1208  ffmpeg-1011  mcp-chrome

$ ls /home/kitty/.cache/ms-playwright/chromium-1208/chrome-linux64/
chrome  chrome_100_percent.pak  chrome_200_percent.pak  chrome_sandbox  libEGL.so  libGLESv2.so  ...

$ /usr/bin/chromium --version
Chromium 147.0.7727.137 Arch Linux

$ /usr/bin/chromium --headless --no-sandbox --disable-gpu --dump-dom /tmp/test.html
<html><head></head><body><h1>Headless Test</h1></body></html>
```

## Manual verification

**Playwright CLI:** `npx playwright --version` returned `Version 1.60.0` successfully.

**Chromium binary check:** The Playwright cache at `/home/kitty/.cache/ms-playwright/` contains:
- `chromium-1208/` — fully installed with `chrome-linux64/chrome` binary (INSTALLATION_COMPLETE present)
- `chromium_headless_shell-1208/` — exists
- `ffmpeg-1011/` — installed (ffmpeg-linux binary present)
- `mcp-chrome/` — directory exists

**System Chromium:** `/usr/bin/chromium` reports version 147.0.7727.137 (Arch Linux package).

**Headless mode:** System Chromium launched in headless mode successfully:
```
$ echo '<html><body><h1>Headless Test</h1></body></html>' > /tmp/test.html
$ /usr/bin/chromium --headless --no-sandbox --disable-gpu --dump-dom /tmp/test.html
<html><head></head><body><h1>Headless Test</h1></body></html>
```
(Note: DBus UPower warning appeared but did not affect functionality.)

**Note:** The newer Chromium matching Playwright 1.60.0 (chromium-1223, Chrome for Testing 148.0.7778.96) is NOT pre-installed. It would be downloaded automatically on first Playwright browser launch. The existing chromium-1208 may or may not be compatible with Playwright 1.60.0 without explicit configuration.

## Coverage delta

n/a — no code changes, infrastructure verification only.

## Follow-ups discovered

- T-025: Check if playwright is configured in ~/.pi/mcp.json or ~/.pi/agent/extensions/
- Consider installing chromium-1223 for Playwright 1.60.0 compatibility (`npx playwright install chromium`)
- Note the version mismatch between Playwright 1.60.0 (expects chromium-1223) and installed chromium-1208

## Commit SHA(s)

TBD (after commit)

## DoD checklist

From STATE.md Definition of Done:

1. **Researched** — ✓ Information gathered from system inspection (npx, ls, which, binary checks)
2. **Written** — ✓ Findings saved to `reports/t-024-infra-check-playwright-availability.md`
3. **Indexed** — ✓ Updated `research/indexes/tools-reference.md` with Playwright section
4. **Verified** — ✓ Cross-checked Playwright CLI, Playwright cache, and system Chromium independently
5. **No swallowed errors** — ✓ N/A (no code changes)
6. **Documentation in sync** — ✓ README/CLAUDE.md unchanged (no behavior change); tools-reference.md updated
7. **STATE.md updated** — ✓ Task moved to Done with commit SHA + date (pending commit)
8. **CI green** — ✓ N/A (no TypeScript code; typecheck/lint/test/format not applicable)
9. **No regressions** — ✓ No code changes
10. **Reviewable diff** — ✓ Single-purpose commit; conventional prefix `docs:`
