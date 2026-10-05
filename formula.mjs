export const CATEGORIES = [
  {key:'workDay',label:'Hari kerja biasa · Siang',factor:1.125},
  {key:'workNight',label:'Hari kerja biasa · Malam',factor:1.25},
  {key:'restDay',label:'Hari rehat biasa · Siang',factor:1.25},
  {key:'restNight',label:'Hari rehat biasa · Malam',factor:1.5},
  {key:'holidayDay',label:'Hari kelepasan am · Siang',factor:1.75},
  {key:'holidayNight',label:'Hari kelepasan am · Malam',factor:2}
];
export function number(value,label){const n=Number(value);if(value===''||value===null||!Number.isFinite(n)||n<0)throw Error(label+' mesti nombor positif atau sifar.');return n;}
export function calculateEntry(e){
  if(!['time','hours'].includes(e.mode))throw Error('Cara masukkan masa tidak sah.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(e.date)||new Date(e.date+'T00:00:00Z').toISOString().slice(0,10)!==e.date)throw Error('Tarikh tidak sah.');
  if(!['work','rest','holiday'].includes(e.type))throw Error('Pilih jenis hari.');
  let gross;
  if(e.mode==='time'){
    if(!/^\d{2}:\d{2}$/.test(e.start)||!/^\d{2}:\d{2}$/.test(e.end))throw Error('Lengkapkan waktu mula dan tamat.');
    const minutes=t=>{const [h,m]=t.split(':').map(Number);if(h>23||m>59)throw Error('Waktu tidak sah.');return h*60+m;};
    let a=minutes(e.start),b=minutes(e.end);if(e.overnight)b+=1440;
    if(b<=a||b-a>1440)throw Error('Waktu tamat mesti selepas mula. Tandakan lintas tengah malam jika perlu.');
    gross=(b-a)/60;
  }else gross=number(e.hours,'Jumlah jam');
  if(gross<=0||gross>24)throw Error('Jumlah jam mesti melebihi 0 dan tidak melebihi 24.');
  const deduction=number(e.deduction,'Tolak masa');
  if(deduction>gross)throw Error('Tolak masa tidak boleh melebihi jumlah jam.');
  if(!['Day','Night'].includes(e.band))throw Error('Pilih siang atau malam.');
  return {gross,deduction,net:gross-deduction,key:e.type+e.band};
}
export function calculate(claim){
  const rate=claim.rateMode==='salary'?number(claim.salary,'Gaji pokok')*12/(313*8):number(claim.rate,'Kadar sejam');
  if(!Number.isFinite(rate)||rate>1000000)throw Error('Kadar sejam melebihi had input RM1,000,000.');
  const categories=CATEGORIES.map(c=>({...c,hours:0,amount:0}));let gross=0,deduction=0;
  const entries=claim.entries.map(e=>{if(!e.date.startsWith(claim.month+'-'))throw Error('Tarikh rekod mesti dalam bulan tuntutan.');const r=calculateEntry(e);gross+=r.gross;deduction+=r.deduction;categories.find(c=>c.key===r.key).hours+=r.net;return {...e,...r};});
  for(const c of categories)c.amount=c.hours*c.factor*rate;
  return {rate,categories,entries,gross,deduction,hours:gross-deduction,total:categories.reduce((n,c)=>n+c.amount,0)};
}
