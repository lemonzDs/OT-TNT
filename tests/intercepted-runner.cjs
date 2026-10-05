// Executes existing browser tests with real PHP API calls over child-process pipes.
// Browser request interception replaces only network transport, not app/API logic.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const {chromium}=require('C:/Users/Firdaus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const php='C:/laragon/bin/php/php-8.5.11-Win32-vs17-x64/php.exe';
const storage=path.join(root,'test-results','landing-pipe-'+Date.now());
const originalLaunch=chromium.launch.bind(chromium);
chromium.launch=async options=>{
 const browser=await originalLaunch(options),originalPage=browser.newPage.bind(browser);
 browser.newPage=async options=>{
  const page=await originalPage(options);
  await page.route('http://127.0.0.1:8096/**',async route=>{
   const request=route.request(),url=new URL(request.url());let rel=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.php';
   if(rel==='api.php'){
    const result=spawnSync(php,[path.join(__dirname,'api-harness.php'),request.method()],{input:request.postData()||'',encoding:'utf8',env:{...process.env,OT_STORAGE_DIR:storage}});
    if(result.status!==0)throw Error(result.stderr);
    const [body,status]=result.stdout.split('\n__STATUS__');return route.fulfill({status:Number(status),contentType:'application/json',body});
   }
   const file=path.resolve(root,rel);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});
   const types={'.php':'text/html','.css':'text/css','.mjs':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp'};
   const body=rel.endsWith('.php')?spawnSync(php,[file],{encoding:'utf8'}).stdout:fs.readFileSync(file);
   return route.fulfill({status:200,contentType:types[path.extname(rel)]||'application/octet-stream',body});
  });
  return page;
 };
 return browser;
};
const target=process.argv[2];if(!['landing.cjs','browser.cjs'].includes(target))throw Error('Select landing.cjs or browser.cjs');
require(path.join(__dirname,target));
