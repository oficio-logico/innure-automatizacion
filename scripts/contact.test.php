<?php
declare(strict_types=1);
require dirname(__DIR__) . '/server/contacto.php';

$server = ['REQUEST_METHOD'=>'POST','HTTP_ORIGIN'=>'https://www.innure.es','CONTENT_LENGTH'=>'900','CONTENT_TYPE'=>'multipart/form-data; boundary=test'];
$post = ['name'=>'Prueba técnica','company'=>'Innure','email'=>'qa@example.invalid','phone'=>'','process'=>'Prueba local aislada sin envíos externos.','privacy'=>'accepted','service'=>'automatizacion-ia','website'=>'','cf-turnstile-response'=>'fixture'];
$config = ['TURNSTILE_SECRET'=>'fixture-secret'];
$verification = ['success'=>true,'hostname'=>'www.innure.es','action'=>'automatizacion'];
$passed = 0;
function check(string $name, bool $condition): void {
    global $passed;
    if (!$condition) { fwrite(STDERR, "FAIL: {$name}\n"); exit(1); }
    $passed++;
}
function scenario(array $serverChanges = [], array $postChanges = [], $verificationChange = false, bool $smtpOk = true, bool $rateOk = true, ?array $configChange = null): array {
    global $server,$post,$config,$verification;
    $deliveries = 0; $body = ''; $reply = '';
    $result = innure_contact(array_replace($server,$serverChanges), array_replace($post,$postChanges), $configChange ?? $config,
        static fn() => $verificationChange === false ? $verification : $verificationChange,
        static function($subject,$content,$replyTo,$settings,$id) use (&$deliveries,&$body,&$reply,$smtpOk) {
            $deliveries++; $body = $content; $reply = $replyTo;
            check('asunto identifica automatización', str_contains($subject,'Automatización'));
            check('referencia segura', preg_match('/^[a-f0-9]{32}$/',$id) === 1);
            return $smtpOk;
        }, static fn() => $rateOk);
    return [$result[0],$result[1],$deliveries,$body,$reply];
}
[$status,$result,$deliveries,$body,$reply] = scenario();
check('éxito JSON sólo tras transporte aceptado', $status === 200 && $result['success'] === true && $deliveries === 1 && preg_match('/^[a-f0-9]{32}$/',$result['submissionId']) === 1);
check('sin PII en respuesta', array_keys($result) === ['success','submissionId']);
check('reply-to válido y servicio en cuerpo', $reply === 'qa@example.invalid' && str_contains($body,'Línea de negocio: Automatización e IA'));
foreach ([
    ['REQUEST_METHOD'=>'GET'], ['HTTP_ORIGIN'=>'https://evil.example'], ['HTTP_ORIGIN'=>''],
    ['HTTP_ORIGIN'=>'https://www.innure.es.evil.example'], ['CONTENT_LENGTH'=>'32769'], ['CONTENT_TYPE'=>'application/json']
] as $change) {
    [$status,$result,$deliveries] = scenario($change);
    check('rechazo HTTP '.json_encode($change), $status >= 400 && $result['success'] === false && !isset($result['submissionId']) && $deliveries === 0);
}
foreach ([
    ['name'=>''],['name'=>str_repeat('a',121)],['name'=>"persona\r\nCc: intruso"],['company'=>str_repeat('a',161)],
    ['email'=>'no-es-email'],['email'=>"qa@example.invalid\nBcc: otro@example.invalid"],['phone'=>str_repeat('1',41)],
    ['process'=>'corto'],['process'=>str_repeat('á',3001)],['process'=>"texto con \0 byte inválido"],
    ['privacy'=>''],['service'=>'rendimiento'],['website'=>'https://spam.example'],['cf-turnstile-response'=>''],
    ['cf-turnstile-response'=>str_repeat('a',2049)],['name'=>['malformado']],['process'=>"\xFF"]
] as $change) {
    [$status,$result,$deliveries] = scenario([], $change);
    check('rechazo campos '.implode(',',array_keys($change)), $status >= 400 && !isset($result['submissionId']) && $deliveries === 0);
}
foreach ([null,[],['success'=>false],['success'=>true,'hostname'=>'evil.example','action'=>'automatizacion'],['success'=>true,'hostname'=>'www.innure.es','action'=>'rendimiento']] as $value) {
    [$status,$result,$deliveries] = scenario([],[],$value);
    check('Turnstile inválido/red nunca abre envío', $status >= 400 && !isset($result['submissionId']) && $deliveries === 0);
}
[$status,$result,$deliveries] = scenario([],[],false,false);
check('fallo de SMTP no genera conversión', $status === 503 && !isset($result['submissionId']) && $deliveries === 1);
[$status,$result,$deliveries] = scenario([],[],false,true,false);
check('límite de frecuencia', $status === 429 && $deliveries === 0);
[$status,$result,$deliveries] = scenario([],[],false,true,true,[]);
check('config ausente cierra envío', $status === 503 && $deliveries === 0);
[$status,$result,$deliveries,$body] = scenario([],['utm_campaign'=>'prueba','gclid'=>'abc_123']);
check('atribución no se conserva sin consentimiento', !str_contains($body,'utm_campaign:') && !str_contains($body,'gclid:'));
[$status,$result,$deliveries,$body] = scenario([],['measurement_consent'=>'accepted','utm_campaign'=>'prueba','utm_source'=>"bad\nheader",'gclid'=>'abc_123']);
check('atribución consentida y acotada', str_contains($body,'utm_campaign: prueba') && str_contains($body,'gclid: abc_123') && !str_contains($body,'utm_source:'));
check('SMTP rechaza transporte sin cifrar antes de conectar', innure_smtp('test','test','qa@example.invalid',['SMTP_SECURE'=>'none'],'fixture') === false);
echo "OK: {$passed} comprobaciones del receptor; sin envíos externos.\n";
