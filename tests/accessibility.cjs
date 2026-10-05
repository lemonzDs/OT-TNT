const {chromium}=require('C:/Users/Firdaus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 try{
  await page.goto('http://127.0.0.1:8096/ot.php');await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link');
  await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
  await page.locator('#saved-month').selectOption('2099-06');
  await page.locator('[data-view=profile]').first().click();assert.equal(await page.locator('.nav.active').getAttribute('aria-current'),'page');
  await page.locator('[name=salary]').fill('3000');await page.locator('[name=name]').fill('Pegawai Ujian');
  assert.equal(await page.locator('[name=rate]').inputValue(),'14.38');
  await page.locator('[data-view=records]').first().click();await page.locator('#add').click();
  await page.locator('[name=type]').selectOption('holiday');await page.locator('[name=band]').selectOption('Night');
  await page.locator('[name=hours]').fill('24');await page.locator('textarea[name=description]').fill('Ujian kiraan Excel');await page.locator('#entry-form [type=submit]').click();
  await page.locator('#add').click();await page.locator('[name=type]').selectOption('holiday');await page.locator('[name=band]').selectOption('Night');await page.locator('[name=hours]').fill('24');await page.locator('textarea[name=description]').fill('Ujian kiraan Excel');await page.locator('#entry-form [type=submit]').click();
  await page.locator('[data-view=calculation]').first().click();assert.match(await page.locator('#limit-notice').innerText(),/1\/3/);
  const before=await page.locator('#total').innerText();
  await page.locator('#restore').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});assert.match(await page.locator('#notice').innerText(),/tidak disokong/);assert.equal(await page.locator('#total').innerText(),before);
  const fileChooser=page.waitForEvent('filechooser');await page.locator('#restore-button').focus();await page.keyboard.press('Enter');await fileChooser;
  assert.equal(await page.locator('#save').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  // Use a fresh page for a clean, saved screenshot without discarding user data.
  const preview=await browser.newPage({viewport:{width:1440,height:1000}});await preview.goto('http://127.0.0.1:8096/ot.php');await preview.waitForLoadState('networkidle');await preview.locator('#saved-month').selectOption('2099-06');await preview.evaluate(()=>scrollTo(0,0));await preview.screenshot({path:'test-results/refined-desktop.png',fullPage:true});
  console.log('PASS: keyboard skip link, active navigation, readonly salary rate, 1/3 warning, invalid backup leaves claim intact, keyboard restore, reduced motion.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
