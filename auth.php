<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$jsonFile = 'usuarios.json';

// Initialize file if not exists
if (!file_exists($jsonFile)) {
    $defaultUsers = [
        [
            "username" => "admin",
            "name" => "Administrador Sonora",
            "cpf" => "000.000.000-00",
            "birthdate" => "2000-01-01",
            "password" => "admin",
            "role" => "adm"
        ],
        [
            "username" => "gedeon",
            "name" => "Gedeon",
            "cpf" => "111.111.111-11",
            "birthdate" => "1980-01-01",
            "password" => "123",
            "role" => "professor"
        ],
        [
            "username" => "beatriz",
            "name" => "Beatriz",
            "cpf" => "222.222.222-22",
            "birthdate" => "1985-02-02",
            "password" => "123",
            "role" => "professor"
        ],
        [
            "username" => "lucas",
            "name" => "Lucas",
            "cpf" => "333.333.333-33",
            "birthdate" => "1990-03-03",
            "password" => "123",
            "role" => "professor"
        ],
        [
            "username" => "sara",
            "name" => "Sara",
            "cpf" => "444.444.444-44",
            "birthdate" => "1995-04-04",
            "password" => "123",
            "role" => "professor"
        ]
    ];
    file_put_contents($jsonFile, json_encode($defaultUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$input = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : '';

$users = json_decode(file_get_contents($jsonFile), true);
if (!is_array($users)) {
    $users = [];
}

if ($action === 'register') {
    $name = isset($input['name']) ? trim($input['name']) : '';
    $username = isset($input['username']) ? trim($input['username']) : '';
    $cpf = isset($input['cpf']) ? trim($input['cpf']) : '';
    $birthdate = isset($input['birthdate']) ? trim($input['birthdate']) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $role = 'cliente'; // Force 'cliente' to prevent adm creation or unauthorized roles

    if (empty($name) || empty($username) || empty($cpf) || empty($birthdate) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    // Check if username or CPF already exists
    foreach ($users as $u) {
        if (strtolower($u['username']) === strtolower($username)) {
            echo json_encode(['success' => false, 'message' => 'Nome de usuário já cadastrado.']);
            exit;
        }
        if ($u['cpf'] === $cpf) {
            echo json_encode(['success' => false, 'message' => 'CPF já cadastrado.']);
            exit;
        }
    }

    $newUser = [
        'name' => $name,
        'username' => $username,
        'cpf' => $cpf,
        'birthdate' => $birthdate,
        'password' => $password,
        'role' => $role
    ];

    $users[] = $newUser;
    file_put_contents($jsonFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(['success' => true, 'message' => 'Conta criada com sucesso!']);
    exit;
} 

if ($action === 'login') {
    $username = isset($input['username']) ? trim($input['username']) : '';
    $password = isset($input['password']) ? $input['password'] : '';

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Usuário e senha são obrigatórios.']);
        exit;
    }

    foreach ($users as $u) {
        if (strtolower($u['username']) === strtolower($username) && $u['password'] === $password) {
            echo json_encode([
                'success' => true,
                'user' => [
                    'name' => $u['name'],
                    'username' => $u['username'],
                    'role' => $u['role'],
                    'cpf' => $u['cpf'],
                    'birthdate' => $u['birthdate']
                ]
            ]);
            exit;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos.']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Ação inválida.']);
?>
