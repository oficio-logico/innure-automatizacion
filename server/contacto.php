<?php
declare(strict_types=1);

/* Receptor exclusivo de /automatizacion/. No ejecuta ni modifica el de rendimiento. */
function innure_response(int $status, string $message, ?string $id = null): array {
    return [$status, $id === null
        ? ['success' => false, 'message' => $message]
        : ['success' => true, 'submissionId' => $id]];
}

function innure_contact(array $server, array $post, array $config, callable $verify, callable $send, callable $rate): array {
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') return innure_response(405, 'Método no permitido.');
    if (($server['HTTP_ORIGIN'] ?? '') !== 'https://www.innure.es') return innure_response(403, 'Envía la consulta desde la web de Innure.');
    if (!preg_match('/^[0-9]{1,8}$/', (string) ($server['CONTENT_LENGTH'] ?? ''))) return innure_response(411, 'No se ha podido validar el tamaño del envío.');
    if ((int) $server['CONTENT_LENGTH'] > 32768) return innure_response(413, 'La consulta es demasiado larga.');
    if (!preg_match('~^(multipart/form-data;|application/x-www-form-urlencoded(?:;|$))~i', $server['CONTENT_TYPE'] ?? '')) {
        return innure_response(415, 'Formato de envío no admitido.');
    }
    foreach ($post as $value) if (!is_string($value)) return innure_response(400, 'Revisa los campos del formulario.');
    $values = [];
    foreach (['name' => [1,120], 'company' => [1,160], 'email' => [3,254], 'phone' => [0,40], 'process' => [20,3000]] as $key => $limits) {
        $value = trim($post[$key] ?? '');
        if (preg_match('//u', $value) !== 1) return innure_response(400, 'Revisa los caracteres del formulario.');
        $length = preg_match_all('/./us', $value);
        if ($length < $limits[0] || $length > $limits[1] || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)
            || ($key !== 'process' && preg_match('/[\r\n]/', $value))) {
            return innure_response(400, 'Revisa la longitud y el contenido de los campos.');
        }
        $values[$key] = $value;
    }
    if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL) || ($post['privacy'] ?? '') !== 'accepted'
        || ($post['service'] ?? '') !== 'automatizacion-ia' || trim($post['website'] ?? '') !== '') {
        return innure_response(400, 'Revisa el formulario y la aceptación de privacidad.');
    }
    $token = $post['cf-turnstile-response'] ?? '';
    if ($token === '' || strlen($token) > 2048) return innure_response(400, 'Completa la comprobación de seguridad.');
    if (empty($config['TURNSTILE_SECRET'])) return innure_response(503, 'El formulario no está disponible. Escríbenos a info@innure.es.');
    $verification = $verify($token, $config['TURNSTILE_SECRET']);
    if (!is_array($verification)) return innure_response(503, 'No hemos podido comprobar la seguridad. Inténtalo de nuevo.');
    if (($verification['success'] ?? false) !== true || ($verification['hostname'] ?? '') !== 'www.innure.es'
        || ($verification['action'] ?? '') !== 'automatizacion') {
        return innure_response(400, 'La comprobación de seguridad ha caducado. Inténtalo de nuevo.');
    }
    if (!$rate($server, $values['email'], $config['TURNSTILE_SECRET'])) return innure_response(429, 'Espera unos minutos antes de volver a enviar.');
    // Preparar una referencia no la convierte en lead: solo se devuelve tras DATA/250.
    $id = bin2hex(random_bytes(16));
    $body = "Línea de negocio: Automatización e IA\nReferencia: {$id}\n\n"
        . "Nombre: {$values['name']}\nEmpresa: {$values['company']}\nCorreo: {$values['email']}\n"
        . "Teléfono: " . ($values['phone'] ?: 'No facilitado') . "\n\nQué quiere resolver:\n{$values['process']}\n\n"
        . "Privacidad: aceptada\nOrigen: https://www.innure.es/automatizacion/\n";
    if (($post['measurement_consent'] ?? '') === 'accepted') {
        foreach (['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid'] as $key) {
            $value = $post[$key] ?? '';
            if ($value !== '' && strlen($value) <= 200 && preg_match('/^[a-zA-Z0-9_.~+ -]+$/', $value)) $body .= "{$key}: {$value}\n";
        }
    }
    if (!$send('[Innure · Automatización] Nueva consulta', $body, $values['email'], $config, $id)) {
        return innure_response(503, 'No hemos podido enviar tu consulta. Inténtalo más tarde o escríbenos a info@innure.es.');
    }
    return innure_response(200, '', $id);
}

function innure_verify(string $token, string $secret): ?array {
    $context = stream_context_create(['ssl' => ['verify_peer'=>true,'verify_peer_name'=>true,'SNI_enabled'=>true], 'http' => [
        'method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query(['secret' => $secret, 'response' => $token]),
        'timeout' => 8, 'ignore_errors' => false,
    ]]);
    $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    if ($response === false) return null; // Nunca aceptar ante un fallo de red.
    $decoded = json_decode($response, true);
    return is_array($decoded) ? $decoded : null;
}

function innure_rate(array $server, string $email, string $secret): bool {
    // Solo contadores y hashes temporales; no se guarda el contenido de la consulta.
    $filename = sys_get_temp_dir() . '/innure-auto-' . hash_hmac('sha256', 'rate-limit', $secret);
    $file = @fopen($filename, 'c+');
    if (!$file || !flock($file, LOCK_EX)) { if ($file) fclose($file); return false; }
    @chmod($filename, 0600);
    try {
        $state = json_decode(stream_get_contents($file, 524288) ?: '{}', true);
        if (!is_array($state)) $state = [];
        $state = array_filter($state, static fn($entry) => is_array($entry) && ($entry['until'] ?? 0) >= time());
        if (count($state) > 2046) return false;
        // Se aplica DESPUÉS de Turnstile. No confiar en cabeceras IP ni agrupar
        // visitantes por la IP de un proxy: límite global y por correo verificado.
        $keys = ['global' => 120, 'email:' . strtolower($email) => 5];
        $allowed = true;
        foreach ($keys as $identity => $maximum) {
            $key = hash_hmac('sha256', $identity, $secret);
            $entry = $state[$key] ?? ['until' => time() + 600, 'count' => 0];
            if ($entry['count'] >= $maximum) $allowed = false;
            $entry['count'] = min($maximum, $entry['count'] + 1);
            $state[$key] = $entry;
        }
        rewind($file); ftruncate($file, 0);
        if (fwrite($file, json_encode($state)) === false || !fflush($file)) return false;
        return $allowed;
    } finally { flock($file, LOCK_UN); fclose($file); }
}

function innure_smtp(string $subject, string $body, string $reply, array $config, string $id): bool {
    $deadline = microtime(true) + 25;
    $host = (string) ($config['SMTP_HOST'] ?? 'smtp.gmail.com');
    $port = (int) ($config['SMTP_PORT'] ?? 465);
    $secure = (string) ($config['SMTP_SECURE'] ?? 'ssl');
    $user = (string) ($config['SMTP_USER'] ?? '');
    $password = (string) ($config['SMTP_PASS'] ?? '');
    $from = (string) ($config['MAIL_FROM'] ?? $user);
    if (!in_array($secure, ['ssl','tls'], true) || !preg_match('/^[a-zA-Z0-9.-]+$/', $host) || $port < 1 || $port > 65535
        || !$user || !$password || !filter_var($from, FILTER_VALIDATE_EMAIL) || !filter_var($reply, FILTER_VALIDATE_EMAIL)) return false;
    $recipients = [];
    foreach (['MAIL_TO','MAIL_CC'] as $key) foreach ((array) ($config[$key] ?? []) as $email) {
        if (!is_string($email)) continue;
        $email = trim($email);
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) $recipients[strtolower($email)] = $email;
    }
    if (!$recipients) return false;
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]]);
    $socket = @stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, 8, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) return false;
    stream_set_timeout($socket, 8);
    $read = static function () use ($socket, $deadline): string {
        for ($i = 0; $i < 100; $i++) {
            $remaining = $deadline - microtime(true);
            if ($remaining <= 0) return '';
            stream_set_timeout($socket, max(1, min(8, (int) ceil($remaining))));
            $line = fgets($socket, 515);
            if ($line === false) return '';
            if (strlen($line) >= 4 && $line[3] === ' ') return substr($line, 0, 3);
        }
        return '';
    };
    $write = static function (string $data) use ($socket, $deadline): bool {
        while ($data !== '') {
            $remaining = $deadline - microtime(true);
            if ($remaining <= 0) return false;
            stream_set_timeout($socket, max(1, min(8, (int) ceil($remaining))));
            $written = fwrite($socket, $data); if ($written === false || $written === 0) return false; $data = substr($data, $written);
        }
        return true;
    };
    $command = static function (string $value, array $codes) use ($write, $read): bool { return $write($value . "\r\n") && in_array($read(), $codes, true); };
    try {
        if ($read() !== '220' || !$command('EHLO innure.es', ['250'])) return false;
        if ($secure === 'tls') {
            if (!$command('STARTTLS', ['220']) || @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) return false;
            if (!$command('EHLO innure.es', ['250'])) return false;
        }
        if (!$command('AUTH LOGIN', ['334']) || !$command(base64_encode($user), ['334']) || !$command(base64_encode($password), ['235'])
            || !$command('MAIL FROM:<' . $from . '>', ['250'])) return false;
        $accepted = [];
        foreach ($recipients as $recipient) if ($command('RCPT TO:<' . $recipient . '>', ['250','251','252'])) $accepted[] = $recipient;
        if (!$accepted || !$command('DATA', ['354'])) return false;
        $mime = static fn(string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';
        $headers = 'From: ' . $mime('Innure · Automatización') . ' <' . $from . ">\r\nTo: <" . array_shift($accepted) . ">\r\n";
        if ($accepted) $headers .= 'Cc: <' . implode('>, <', $accepted) . ">\r\n";
        $headers .= 'Reply-To: <' . $reply . ">\r\nSubject: " . $mime($subject) . "\r\nDate: " . date('r')
            . "\r\nMessage-ID: <automatizacion-{$id}@innure.es>\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n";
        if (!$write($headers . "\r\n" . rtrim(chunk_split(base64_encode($body))) . "\r\n.\r\n") || $read() !== '250') return false;
        $write("QUIT\r\n");
        return true;
    } finally { fclose($socket); }
}

if (PHP_SAPI !== 'cli') {
    ini_set('display_errors', '0');
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    try {
        // Ruta fija, solo lectura; la configuración de correo no se duplica en el repositorio público.
        $root = dirname(__DIR__);
        if (!is_file($root . '/config.php')) throw new RuntimeException('Configuration unavailable');
        require $root . '/config.php';
        $overrides = is_file($root . '/mail-config.php') ? require $root . '/mail-config.php' : [];
        $config = [];
        foreach (['SMTP_HOST','SMTP_PORT','SMTP_SECURE','SMTP_USER','SMTP_PASS','MAIL_FROM','MAIL_TO','MAIL_CC','TURNSTILE_SECRET'] as $key) {
            if ($key !== 'TURNSTILE_SECRET' && is_array($overrides) && array_key_exists($key, $overrides)) $config[$key] = $overrides[$key];
            elseif (defined($key)) $config[$key] = constant($key);
        }
        [$status, $result] = innure_contact($_SERVER, $_POST, $config, 'innure_verify', 'innure_smtp', 'innure_rate');
    } catch (Throwable $error) { [$status, $result] = innure_response(503, 'El formulario no está disponible. Escríbenos a info@innure.es.'); }
    if ($status === 405) header('Allow: POST');
    http_response_code($status);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
