const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("http://localhost:4321/ai-engineering/mlops", { waitUntil: "networkidle" });

  // Scroll through entire page slowly to trigger all IntersectionObservers
  const pageH = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < pageH; y += 400) {
    await page.evaluate(pos => window.scrollTo(0, pos), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // Full page after all stages revealed
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_revealed.png", fullPage: true });

  // --- Check gutter area: scroll to stage 01, zoom screenshot ---
  await page.evaluate(() => document.querySelector("#stage-01").scrollIntoView());
  await page.waitForTimeout(500);
  const gutterBox = await page.locator(".mlo-stage-gutter").first().boundingBox();
  const stageBox  = await page.locator("#stage-01").boundingBox();
  console.log("GUTTER boundingBox:", JSON.stringify(gutterBox));
  console.log("STAGE-01 boundingBox:", JSON.stringify(stageBox));
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_stage01_detail.png", clip: { x: 0, y: stageBox.y - 40, width: 1280, height: 420 } });

  // --- Layer header close-up ---
  const layerHead = await page.locator(".mlo-layer-head").first().boundingBox();
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_layerhead.png", clip: { x: 0, y: layerHead.y - 10, width: 1280, height: 80 } });

  // --- Check insight blockquote ---
  const insight = await page.locator(".mlo-insight").first();
  const insightBox = await insight.boundingBox();
  const insightVisible = await insight.isVisible();
  console.log("INSIGHT visible:", insightVisible, "box:", JSON.stringify(insightBox));
  if (insightBox) {
    await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_insight_zoom.png", clip: { x: 0, y: insightBox.y - 20, width: 1280, height: insightBox.height + 60 } });
  }

  // --- Check stage-gutter dot computed style ---
  const dotColor = await page.evaluate(() => {
    const dot = document.querySelector(".mlo-stage-dot");
    const cs = window.getComputedStyle(dot);
    return { bg: cs.background, border: cs.borderColor, w: cs.width, h: cs.height };
  });
  console.log("DOT style:", JSON.stringify(dotColor));

  // --- Check active tab color ---
  const tabColor = await page.evaluate(() => {
    const tab = document.querySelector(".mlo-det-tab--active");
    return tab ? window.getComputedStyle(tab).color : "NO TAB";
  });
  console.log("ACTIVE TAB color:", tabColor);

  // --- Check layer head name color (should be sage for tracking) ---
  const lhColor = await page.evaluate(() => {
    const lh = document.querySelector(".mlo-lh-name");
    return lh ? window.getComputedStyle(lh).color : "NONE";
  });
  console.log("LAYER HEAD NAME color:", lhColor);

  // --- Hero index label color ---
  const idxColor = await page.evaluate(() => {
    const el = document.querySelector(".mlo-idx-layer-label");
    return el ? window.getComputedStyle(el).color : "NONE";
  });
  console.log("IDX LABEL color:", idxColor);

  // --- spec-row grid layout check ---
  const specRowGrid = await page.evaluate(() => {
    const row = document.querySelector(".mlo-spec-row");
    return row ? window.getComputedStyle(row).gridTemplateColumns : "NONE";
  });
  console.log("SPEC ROW grid-template-columns:", specRowGrid);

  // --- Accordion open, check det max-height ---
  await page.locator(".mlo-spec-row").first().click();
  await page.waitForTimeout(500);
  const detHeight = await page.evaluate(() => {
    const det = document.querySelector(".mlo-det");
    const cs = window.getComputedStyle(det);
    return { maxH: cs.maxHeight, overflow: cs.overflow, display: cs.display };
  });
  console.log("DET (open) style:", JSON.stringify(detHeight));

  // --- Screenshot at stage 01 with accordion open ---
  await page.evaluate(() => document.querySelector("#stage-01").scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_stage01_open.png", clip: { x: 0, y: stageBox.y - 20, width: 1280, height: 700 } });

  // --- 860px breakpoint (tablet) ---
  await page.setViewportSize({ width: 860, height: 900 });
  await page.evaluate(() => window.scrollTo(0,0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "C:/Users/DELL/AppData/Local/Temp/mlo_tablet.png", fullPage: false });

  await browser.close();
  console.log("DONE");
})().catch(e => { console.error(e); process.exit(1); });
