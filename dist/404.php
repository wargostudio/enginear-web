<?php
// Página 404 propia con el código HTTP correcto. La usa el .htaccess de la
// raíz en el despliegue Git, porque el servidor de Hostinger no aplica
// ErrorDocument a las rutas reescritas hacia dist/.
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
readfile(__DIR__ . '/404.html');
