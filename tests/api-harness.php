<?php
// CLI-only transport for browser tests when loopback networking is unavailable.
if (PHP_SAPI !== 'cli') { http_response_code(403); exit; }
$input=file_get_contents('php://stdin');
class ClaimTestInput {
    public $context;
    private int $offset=0;
    public function stream_open($path,$mode,$options,&$opened_path): bool { return $path==='php://input'; }
    public function stream_read($count): string { global $input; $s=substr($input,$this->offset,$count);$this->offset+=strlen($s);return $s; }
    public function stream_eof(): bool { global $input; return $this->offset>=strlen($input); }
    public function stream_stat(): array { return []; }
}
stream_wrapper_unregister('php');stream_wrapper_register('php',ClaimTestInput::class);
$_SERVER['REMOTE_ADDR']='127.0.0.1';$_SERVER['REQUEST_METHOD']=$argv[1] ?? 'GET';$_SERVER['CONTENT_TYPE']='application/json';
register_shutdown_function(function(){echo "\n__STATUS__".(http_response_code() ?: 200);});
require __DIR__.'/../api.php';
