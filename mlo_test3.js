const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'mlo_screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function safe(name) { return path.join(OUT, name + '.png'); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:4321/ai-engineering/mlops', { waitUntil: 'networkidle' });

  // 1. Full page above-fold
  await page.screenshot({ path: safe('01-hero'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
  console.log('✓ 01-hero');

  // 2. Hero left side — badge, title, desc, tool pills
  const heroLeft = await page.$('.mlo-hero-left');
  if (heroLeft) {
    const box = await heroLeft.boundingBox();
    await page.screenshot({ path: safe('02-hero-left'), clip: { x: Math.max(0,box.x-8), y: Math.max(0,box.y-8), width: Math.min(box.width+16,1280), height: Math.min(box.height+16,900) } });
    console.log('✓ 02-hero-left box:', box);
  } else { console.log('✗ .mlo-hero-left NOT FOUND'); }

  // 3. Hero right side — stage index nav
  const heroIdx = await page.$('.mlo-hero-index');
  if (heroIdx) {
    const box = await heroIdx.boundingBox();
    await page.screenshot({ path: safe('03-hero-index'), clip: { x: Math.max(0,box.x-8), y: Math.max(0,box.y-8), width: Math.min(box.width+16,1280), height: Math.min(box.height+16,900) } });
    console.log('✓ 03-hero-index box:', box);
  } else { console.log('✗ .mlo-hero-index NOT FOUND'); }

  // 4. Tool pills detail
  const pills = await page.$$('.mlo-tool-pill');
  console.log('Tool pills count:', pills.length);
  if (pills.length > 0) {
    const first = await pills[0].boundingBox();
    const last = await pills[pills.length-1].boundingBox();
    const pillArea = { x: Math.max(0,first.x-8), y: Math.max(0,first.y-8), width: Math.min(last.x+last.width-first.x+16,1280), height: Math.min(last.y+last.height-first.y+24,900) };
    await page.screenshot({ path: safe('04-tool-pills'), clip: pillArea });
    console.log('✓ 04-tool-pills');
  }

  // 5. Scroll to body content and screenshot layer 1 header
  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 50));
  await page.waitForTimeout(600);
  await page.screenshot({ path: safe('05-body-scroll1'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
  console.log('✓ 05-body-scroll1 (after 1 viewport scroll)');

  // 6. Navigate to stage-01 via hash and wait for scroll-reveal
  await page.evaluate(() => {
    const el = document.getElementById('stage-01');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: safe('06-stage01-revealed'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
  console.log('✓ 06-stage01-revealed');

  // 7. Gutter area close-up (dot + number)
  const gutter = await page.$('.mlo-stage-gutter');
  if (gutter) {
    const box = await gutter.boundingBox();
    const clipY = Math.max(0, box.y);
    await page.screenshot({ path: safe('07-gutter-closeup'), clip: { x: Math.max(0,box.x-8), y: clipY, width: 80, height: Math.min(box.height+16, 900-clipY) } });
    console.log('✓ 07-gutter-closeup box:', box);
  } else { console.log('✗ .mlo-stage-gutter NOT FOUND'); }

  // 8. Computed styles — key CSS values
  const styles = await page.evaluate(() => {
    const stage = document.querySelector('.mlo-stage');
    const dot = document.querySelector('.mlo-stage-dot');
    const num = document.querySelector('.mlo-stage-num');
    const gutter = document.querySelector('.mlo-stage-gutter');
    const insight = document.querySelector('.mlo-insight');
    const layerHead = document.querySelector('.mlo-layer-head');
    const lhLabel = document.querySelector('.mlo-lh-label');
    const track = document.querySelector('.mlo-track');
    const heroInner = document.querySelector('.mlo-hero-inner');
    const heroLeft = document.querySelector('.mlo-hero-left');
    const heroIdx = document.querySelector('.mlo-hero-index');
    const pill = document.querySelector('.mlo-tool-pill');
    const body = document.querySelector('.mlo-body');

    function cs(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        display: s.display,
        opacity: s.opacity,
        visibility: s.visibility,
        color: s.color,
        backgroundColor: s.backgroundColor,
        borderColor: s.borderColor,
        width: s.width,
        height: s.height,
        paddingLeft: s.paddingLeft,
        marginLeft: s.marginLeft,
        position: s.position,
        transform: s.transform,
        overflow: s.overflow
      };
    }
    return {
      stage: cs(stage),
      dot: cs(dot),
      num: cs(num),
      gutter: cs(gutter),
      insight: cs(insight),
      layerHead: cs(layerHead),
      lhLabel: cs(lhLabel),
      track: cs(track),
      heroInner: cs(heroInner),
      heroLeft: cs(heroLeft),
      heroIdx: cs(heroIdx),
      pill: cs(pill),
      body: cs(body),
    };
  });
  console.log('\n=== COMPUTED STYLES ===');
  for (const [k, v] of Object.entries(styles)) {
    if (v) console.log(`\n[${k}]`, JSON.stringify(v, null, 2));
    else console.log(`\n[${k}] NOT FOUND`);
  }

  // 9. Click first accordion item and screenshot
  const firstRow = await page.$('.mlo-spec-row');
  if (firstRow) {
    await firstRow.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: safe('09-accordion-open'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
    console.log('✓ 09-accordion-open');

    // Check det panel visibility
    const det = await page.$('.mlo-det');
    if (det) {
      const detBox = await det.boundingBox();
      const detStyle = await page.evaluate(el => {
        const s = window.getComputedStyle(el);
        return { maxHeight: s.maxHeight, overflow: s.overflow, height: s.height };
      }, det);
      console.log('mlo-det style after open:', detStyle, 'bbox:', detBox);
    }

    // 10. Tab switching — click Code tab
    const codeTabs = await page.$$('.mlo-det-tab');
    console.log('Tab buttons found:', codeTabs.length);
    if (codeTabs.length >= 2) {
      await codeTabs[1].click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: safe('10-tab-code'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
      console.log('✓ 10-tab-code');
    }

    // 11. In Production tab
    if (codeTabs.length >= 3) {
      await codeTabs[2].click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: safe('11-tab-production'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
      console.log('✓ 11-tab-production');
    }

    // 12. Interview Q&A tab
    if (codeTabs.length >= 4) {
      await codeTabs[3].click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: safe('12-tab-qa'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
      console.log('✓ 12-tab-qa');

      // Open first QA item
      const qaBtn = await page.$('.mlo-qa-q');
      if (qaBtn) {
        await qaBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: safe('13-qa-expanded'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
        console.log('✓ 13-qa-expanded');
      }
    }
  } else { console.log('✗ .mlo-spec-row NOT FOUND'); }

  // 14. Layer header — check layer 2 header
  await page.evaluate(() => {
    const layers = document.querySelectorAll('.mlo-layer-head');
    if (layers[1]) layers[1].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: safe('14-layer-header'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
  console.log('✓ 14-layer-header');

  // 15. Insight blockquote
  await page.evaluate(() => {
    const insights = document.querySelectorAll('.mlo-insight');
    if (insights[0]) insights[0].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);
  const insightEl = await page.$('.mlo-insight');
  if (insightEl) {
    const box = await insightEl.boundingBox();
    const clipY = Math.max(0, box.y - 20);
    await page.screenshot({ path: safe('15-insight'), clip: { x: 0, y: clipY, width: 1280, height: Math.min(box.height + 40, 900 - clipY) } });
    const insightStyle = await page.evaluate(el => {
      const s = window.getComputedStyle(el);
      return { borderLeft: s.borderLeft, borderLeftColor: s.borderLeftColor, fontStyle: s.fontStyle, color: s.color, paddingLeft: s.paddingLeft };
    }, insightEl);
    console.log('✓ 15-insight box:', box, 'style:', insightStyle);
  } else { console.log('✗ .mlo-insight NOT FOUND'); }

  // 16. Full page screenshot after scroll-reveal (scroll to bottom then screenshot full page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  // Scroll through entire page to trigger reveal
  let scrollY = 0;
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  while (scrollY < pageHeight) {
    scrollY += 600;
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(800);
  // Full page
  await page.screenshot({ path: safe('16-fullpage'), fullPage: true });
  console.log('✓ 16-fullpage (full page after reveal scroll)');

  // 17. Tablet breakpoint (768px)
  await ctx.close();
  const ctx2 = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page2 = await ctx2.newPage();
  await page2.goto('http://localhost:4321/ai-engineering/mlops', { waitUntil: 'networkidle' });
  await page2.screenshot({ path: safe('17-tablet-768'), clip: { x: 0, y: 0, width: 768, height: 1024 } });
  console.log('✓ 17-tablet-768');

  // 18. Mobile breakpoint (375px)
  await ctx2.close();
  const ctx3 = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page3 = await ctx3.newPage();
  await page3.goto('http://localhost:4321/ai-engineering/mlops', { waitUntil: 'networkidle' });
  await page3.screenshot({ path: safe('18-mobile-375'), clip: { x: 0, y: 0, width: 375, height: 812 } });
  console.log('✓ 18-mobile-375');
  await ctx3.close();

  await browser.close();
  console.log('\n✅ All tests done. Screenshots in:', OUT);
})();
