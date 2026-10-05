<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function reply(int $code,array $data): never {http_response_code($code);echo json_encode($data,JSON_UNESCAPED_UNICODE);exit;}
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1','::1'],true)) reply(403,['error'=>'Sistem ini untuk penggunaan pada komputer ini sahaja.']);
if ($_SERVER['REQUEST_METHOD']==='POST' && (!str_starts_with($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') || (isset($_SERVER['HTTP_SEC_FETCH_SITE']) && $_SERVER['HTTP_SEC_FETCH_SITE']==='cross-site'))) reply(403,['error'=>'Permintaan tidak dibenarkan.']);
try {
  $dir=getenv('OT_STORAGE_DIR') ?: __DIR__.'/storage';if(!is_dir($dir))mkdir($dir,0700,true);
  $db=new PDO('sqlite:'.$dir.'/claims.sqlite');$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  $db->exec('CREATE TABLE IF NOT EXISTS claims (month TEXT PRIMARY KEY, document TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1)');
  if($_SERVER['REQUEST_METHOD']==='GET'){
    $rows=$db->query('SELECT month, document, revision FROM claims ORDER BY month DESC')->fetchAll(PDO::FETCH_ASSOC);
    reply(200,['claims'=>array_map(fn($r)=>['month'=>$r['month'],'document'=>json_decode($r['document'],true),'revision'=>(int)$r['revision']],$rows)]);
  }
  if($_SERVER['REQUEST_METHOD']!=='POST')reply(405,['error'=>'Kaedah tidak dibenarkan.']);
  $raw=file_get_contents('php://input');if(strlen($raw)>2000000)reply(413,['error'=>'Data terlalu besar.']);
  $payload=json_decode($raw,true,512,JSON_THROW_ON_ERROR);$c=$payload['document'] ?? [];
  if(!preg_match('/^\d{4}-(0[1-9]|1[0-2])$/',$c['month'] ?? '')||!is_array($c['entries'] ?? null)||count($c['entries'])>1000)reply(422,['error'=>'Data tuntutan tidak sah.']);
  $db->exec('BEGIN IMMEDIATE');
  $q=$db->prepare('SELECT revision FROM claims WHERE month=?');$q->execute([$c['month']]);$old=$q->fetchColumn();
  if(($old===false?0:(int)$old)!==($payload['revision']??0)){$db->exec('ROLLBACK');reply(409,['error'=>'Bulan ini telah diubah dalam tab lain. Muat semula sebelum menyimpan.']);}
  $revision=($old===false?0:(int)$old)+1;
  $q=$db->prepare('INSERT INTO claims(month,document,revision) VALUES(?,?,?) ON CONFLICT(month) DO UPDATE SET document=excluded.document,revision=excluded.revision');
  $q->execute([$c['month'],json_encode($c,JSON_THROW_ON_ERROR),$revision]);$db->exec('COMMIT');reply(200,['revision'=>$revision]);
}catch(Throwable $e){reply(500,['error'=>'Data tidak dapat disimpan atau dibaca. Cuba lagi dan pastikan folder simpanan boleh ditulis.']);}
