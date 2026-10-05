const {chromium}=require('C:/Users/Firdaus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8096/');await page.waitForLoadState('networkidle');
  assert.equal(await page.locator('.module').count(),2);
  assert.ok(await page.locator('.hero-art img').evaluate(e=>e.complete&&e.naturalWidth===1536));
  await page.screenshot({path:'test-results/landing-desktop.png',fullPage:true});
  await page.locator('#open-ot').click();await page.waitForLoadState('networkidle');assert.match(page.url(),/ot\.php$/);
  assert.equal(await page.locator('#add').isVisible(),true);
  await page.locator('.home-link').click();await page.locator('#open-tnt').click();await page.waitForLoadState('networkidle');
  assert.match(page.url(),/tnt\.php$/);assert.match(await page.locator('.tnt-state').innerText(),/belum tersedia/);
  await page.locator('.back-link').click();await page.keyboard.press('Tab');
  for(const width of [375,768,1024,1440]){
   await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Landing overflow '+width);
  }
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/landing-mobile.png',fullPage:true});
  await page.locator('#open-tnt').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.back-link').click();assert.equal(await page.locator('#open-ot').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  assert.deepEqual(errors,[]);console.log('PASS: landing graphic, two choices, OT/TNT and home navigation, mobile/tablet/desktop, reduced motion, no browser errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
