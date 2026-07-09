<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método inválido.']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Nenhum arquivo enviado ou erro no upload.']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Tipo de arquivo não suportado. Envie JPG, PNG, GIF ou WEBP.']);
    exit;
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
if (empty($ext)) {
    // Attempt fallback from mime type
    $mimeToExt = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp'
    ];
    $ext = isset($mimeToExt[$file['type']]) ? $mimeToExt[$file['type']] : 'jpg';
}

$destDir = 'img/';
if (!is_dir($destDir)) {
    mkdir($destDir, 0755, true);
}

// Determine filename: unique or static site assets
$target = isset($_GET['target']) ? trim($_GET['target']) : '';

if ($target === 'logo') {
    $newFilename = 'logo.png';
} elseif ($target === 'about') {
    $newFilename = 'about.jpg';
} elseif ($target === 'bg') {
    $newFilename = 'background.png';
} else {
    $newFilename = 'upload_' . uniqid() . '.' . $ext;
}

$destPath = $destDir . $newFilename;

if (move_uploaded_file($file['tmp_name'], $destPath)) {
    echo json_encode(['success' => true, 'filePath' => $destPath]);
} else {
    echo json_encode(['success' => false, 'message' => 'Falha ao salvar o arquivo no servidor.']);
}
?>
