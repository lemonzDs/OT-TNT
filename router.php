<?php
$path=rawurldecode(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH));
if (preg_match('#^/(storage|node_modules|\.npm-cache|tests|docs)(/|$)#',$path) || str_contains($path,'..') || str_ends_with($path,'.json') || str_ends_with($path,'.md')) {http_response_code(403);exit;}
return false;
