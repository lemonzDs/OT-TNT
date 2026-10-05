<?php
if(PHP_SAPI!=='cli')exit;
$db=new PDO('sqlite:'.(getenv('OT_STORAGE_DIR') ?: __DIR__.'/../storage').'/claims.sqlite');
$q=$db->prepare('SELECT document FROM claims WHERE month=?');$q->execute(['2099-06']);$raw=$q->fetchColumn();
if($raw){$doc=json_decode($raw,true);foreach($doc['entries'] as $e)if($e['description']!=='Ujian kiraan Excel')exit('Rekod bukan ujian, tidak dipadam.');$db->prepare('DELETE FROM claims WHERE month=?')->execute(['2099-06']);}
echo "Rekod ujian dibersihkan.\n";
