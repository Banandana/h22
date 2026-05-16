import { chromium } from "playwright";

const url = "https://honda-tech.com/forums/";
const outputDir = "/home/node/output";
const screenshotPath = `${outputDir}/honda-tech-homepage.png`;

console.log(`Navigating to ${url}...`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  const title = await page.title();
  console.log(`Page title: ${title}`);

  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot saved to ${screenshotPath}`);

  // Extract some text content for verification
  const heading = await page.locator("h1, h2").first().textContent();
  console.log(`First heading: ${heading?.trim() || "(none)"}`);

  const linkCount = await page.locator("a").count();
  console.log(`Total links on page: ${linkCount}`);
} catch (err) {
  console.error(`Error: ${err.message}`);
  // Take a fallback screenshot even on error
  try {
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Fallback screenshot saved to ${screenshotPath}`);
  } catch {}
} finally {
  await browser.close();
}
