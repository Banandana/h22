import { chromium } from "playwright";

const url = "https://honda-tech.com/forums/";
const outputDir = "/home/kitty/.pi/playwright-output";
const screenshotPath = `${outputDir}/honda-tech-homepage.png`;

console.log(`Starting Honda forum screenshot test...`);
console.log(`URL: ${url}`);
console.log(`Output: ${screenshotPath}`);

try {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
    ],
  });
  console.log("Browser launched");

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();
  console.log("Page created");

  // Intercept and block slow resources to speed up loading
  await page.route('**/*', (route) => {
    const type = route.request().resourceType();
    if (['image', 'font', 'stylesheet', 'media'].includes(type)) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  console.log("Page DOM loaded");

  const title = await page.title();
  console.log(`Page title: ${title}`);

  // Get visible text content length as verification
  const bodyText = await page.locator('body').textContent();
  console.log(`Body text length: ${bodyText?.length || 0} chars`);

  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot saved to ${screenshotPath}`);

  await browser.close();
  console.log("Test completed successfully");
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  // Take a fallback screenshot even on error
  try {
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Fallback screenshot saved to ${screenshotPath}`);
  } catch {}
  process.exit(1);
}
