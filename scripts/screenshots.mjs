/**
 * Take screenshots of every page at desktop and mobile widths.
 *
 * Two outputs per page per viewport:
 *   • `-hero.png`  — just the above-the-fold hero
 *   • `-full.png`  — the entire scroll length
 *
 * Unlike the earlier "kill all animations" version, this script waits
 * for Framer Motion / IntersectionObserver-driven reveals to finish
 * naturally so the captured pages actually look like the site's real
 * design (kinetic type, orbs, particles, glass, etc).
 */
import { chromium } from "../_legacy/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "screenshots");

const ROUTES = [
  { name: "01-home", path: "/" },
  { name: "02-about", path: "/about" },
  { name: "03-program", path: "/program" },
  { name: "04-students", path: "/students" },
  { name: "05-schools", path: "/schools" },
  { name: "06-mentors", path: "/mentors" },
  { name: "07-competition", path: "/competition" },
  { name: "08-cohorts", path: "/cohorts" },
  { name: "09-blog-index", path: "/blog" },
  { name: "10-blog-post", path: "/blog/why-entrepreneurship-belongs-in-high-school" },
  { name: "11-city-birmingham", path: "/schools/birmingham-mi" },
  { name: "12-faq", path: "/faq" },
  { name: "13-contact", path: "/contact" },
  { name: "14-notfound", path: "/this-route-does-not-exist" },
];

const VIEWPORTS = [
  { label: "1440", width: 1440, height: 900, deviceScaleFactor: 1 },
  { label: "390", width: 390, height: 844, deviceScaleFactor: 2 },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    reducedMotion: "no-preference",
    userAgent:
      vp.width <= 500
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    process.stdout.write(`[${vp.label}] ${url} ... `);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    } catch (err) {
      console.log(`navigation soft-fail: ${err.message}`);
    }

    // Force every image to load eagerly and set fetchpriority=high so
    // the Next.js Image optimizer starts serving them immediately (dev
    // mode is otherwise slow to optimize below-the-fold assets).
    try {
      await page.evaluate(() => {
        for (const img of document.querySelectorAll("img")) {
          img.loading = "eager";
          img.setAttribute("fetchpriority", "high");
        }
      });
    } catch {}

    // Hide dev-only overlays (Next.js dev tools button, custom cursor)
    // so screenshots look like production. Safe if selectors don't
    // exist — CSS just no-ops. The z-index selectors nuke the two
    // fixed-position spring-lagged cursor dots emitted by <CustomCursor/>.
    try {
      await page.addStyleTag({
        content: `
          [data-nextjs-dev-tools-button],
          nextjs-portal { display: none !important; }
          [style*="z-index: 9999"],
          [style*="z-index: 10000"],
          [style*="z-index:9999"],
          [style*="z-index:10000"] { display: none !important; }
        `,
      });
    } catch {}

    // Wait for kinetic-text + reveals to complete (max ~2s of animations).
    await page.waitForTimeout(2200);

    // Nudge the cursor near the center so particle canvas has activity,
    // then move it off-screen so the custom cursor overlay doesn't
    // appear in the final capture.
    await page.mouse.move(vp.width / 2, vp.height / 2);
    await page.waitForTimeout(300);
    await page.mouse.move(-100, -100);
    await page.waitForTimeout(200);

    // Hero shot (just the fold).
    const heroFile = path.join(OUT_DIR, `${route.name}-${vp.label}-hero.png`);
    await page.screenshot({ path: heroFile, fullPage: false });

    // Slowly scroll to trigger all IntersectionObserver-driven reveals,
    // then wait for anything still animating. Some routes (404) can
    // navigate mid-eval and destroy the context — soft-fail those.
    try {
      await page.evaluate(async () => {
        const step = 240;
        const total = document.documentElement.scrollHeight;
        for (let y = 0; y < total; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      });
    } catch (err) {
      console.log(`  scroll soft-fail: ${err.message}`);
    }

    // Now that reveals have all triggered, force any last stragglers on
    // by neutralising Framer Motion's "hidden" opacity/transform state.
    // (Only targets inline styles created by variants.)
    try {
      await page.addStyleTag({
        content: `
          [style*="opacity: 0"]:not(.animate-ping) {
            opacity: 1 !important;
          }
        `,
      });
    } catch (err) {
      console.log(`  style soft-fail: ${err.message}`);
    }
    // Wait for any lazily-loaded images (Next.js optimizer) to finish.
    try {
      await page.waitForLoadState("networkidle", { timeout: 8000 });
    } catch {}
    // Explicitly wait for every <img> to be complete before full-page snap.
    try {
      await page.evaluate(async () => {
        await Promise.all(
          [...document.querySelectorAll("img")].map((img) =>
            img.complete && img.naturalWidth > 0
              ? Promise.resolve()
              : new Promise((res) => {
                  img.addEventListener("load", res, { once: true });
                  img.addEventListener("error", res, { once: true });
                  setTimeout(res, 4000);
                })
          )
        );
      });
    } catch {}
    await page.waitForTimeout(600);

    const fullFile = path.join(OUT_DIR, `${route.name}-${vp.label}-full.png`);
    await page.screenshot({ path: fullFile, fullPage: true });
    console.log(`saved ${path.basename(heroFile)} + ${path.basename(fullFile)}`);
  }

  await context.close();
}

await browser.close();
console.log(`\nDone. Screenshots in ${OUT_DIR}`);
