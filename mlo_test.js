const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // --- MLOps hero ---
  await page.goto("http://localhost:4321/ai-engineering/mlops", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_hero.png", fullPage: false });

  // --- MLOps full page ---
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_full.png", fullPage: true });

  // --- DDB hero (reference) ---
  await page.goto("http://localhost:4321/ai-engineering/data-databases", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/ddb_hero.png", fullPage: false });

  // --- MLOps: scroll to first stage, click first accordion ---
  await page.goto("http://localhost:4321/ai-engineering/mlops", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const firstRow = page.locator(".mlo-spec-row").first();
  await firstRow.scrollIntoViewIfNeeded();
  await firstRow.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_accordion_open.png", fullPage: false });

  // --- click Code tab ---
  const codeTab = page.locator(".mlo-det-tab").nth(1);
  await codeTab.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_code_tab.png", fullPage: false });

  // --- click In Production tab ---
  const prodTab = page.locator(".mlo-det-tab").nth(2);
  await prodTab.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_pitfall_tab.png", fullPage: false });

  // --- click Q&A tab ---
  const qaTab = page.locator(".mlo-det-tab").nth(3);
  await qaTab.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_qa_tab.png", fullPage: false });

  // --- open a Q&A item ---
  const firstQA = page.locator(".mlo-qa-q").first();
  await firstQA.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_qa_open.png", fullPage: false });

  // --- scroll to insight blockquote ---
  const insight = page.locator(".mlo-insight").first();
  await insight.scrollIntoViewIfNeeded();
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_insight.png", fullPage: false });

  // --- mobile 375px ---
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://localhost:4321/ai-engineering/mlops", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_mobile.png", fullPage: false });

  await browser.close();
  console.log("DONE");
})().catch(e => { console.error(e.message); process.exit(1); });
