import { chromium } from "playwright";

const url = "https://example.com";
const outputDir = "/home/kitty/.pi/playwright-output";
const screenshotPath = `${outputDir}/example-com-test.png`;

console.log(`Starting playwright test...`);
console.log(`URL: ${url}`);
console.log(`Output: ${screenshotPath}`);

try {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  console.log("Browser launched successfully");
  
  const page = await browser.newPage();
  console.log("Page created");
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  console.log("Page loaded");
  
  const title = await page.title();
  console.log(`Page title: ${title}`);
  
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot saved to ${screenshotPath}`);
  
  await browser.close();
  console.log("Test completed successfully");
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  process.exit(1);
}
