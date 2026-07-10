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
    echo json_encode(['success' => false, 'message' => 'O cadastro de novos usuários está desativado. Apenas o administrador pode acessar.']);
    exit;
} 

if ($action === 'save_user') {
    $username = isset($input['username']) ? trim($input['username']) : '';
    $name = isset($input['name']) ? trim($input['name']) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $role = isset($input['role']) ? trim($input['role']) : 'cliente';
    $cpf = isset($input['cpf']) ? trim($input['cpf']) : '';
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $birthdate = isset($input['birthdate']) ? trim($input['birthdate']) : '';
    
    if (empty($username) || empty($name) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Nome, Usuário e Senha são obrigatórios.']);
        exit;
    }
    
    $found = false;
    foreach ($users as &$u) {
        if (strtolower($u['username']) === strtolower($username)) {
            $u['name'] = $name;
            $u['password'] = $password;
            $u['role'] = $role;
            $u['cpf'] = $cpf;
            $u['phone'] = $phone;
            $u['birthdate'] = $birthdate;
            $found = true;
            break;
        }
    }
    unset($u);
    
    if (!$found) {
        $users[] = [
            'username' => $username,
            'name' => $name,
            'password' => $password,
            'role' => $role,
            'cpf' => $cpf,
            'phone' => $phone,
            'birthdate' => $birthdate
        ];
    }
    
    file_put_contents($jsonFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true, 'message' => 'Usuário salvo com sucesso.']);
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
                    'birthdate' => $u['birthdate'],
                    'phone' => isset($u['phone']) ? $u['phone'] : '',
                    'profilePic' => isset($u['profilePic']) ? $u['profilePic'] : ''
                ]
            ]);
            exit;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos.']);
    exit;
}

if ($action === 'update_profile') {
    $username = isset($input['username']) ? trim($input['username']) : '';
    $name = isset($input['name']) ? trim($input['name']) : '';
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $birthdate = isset($input['birthdate']) ? trim($input['birthdate']) : '';
    $profilePic = isset($input['profilePic']) ? trim($input['profilePic']) : '';

    if (empty($username) || empty($name)) {
        echo json_encode(['success' => false, 'message' => 'Nome e usuário são obrigatórios.']);
        exit;
    }

    $found = false;
    foreach ($users as &$u) {
        if (strtolower($u['username']) === strtolower($username)) {
            $u['name'] = $name;
            $u['phone'] = $phone;
            $u['birthdate'] = $birthdate;
            $u['profilePic'] = $profilePic;
            $found = true;
            break;
        }
    }
    unset($u);

    if ($found) {
        file_put_contents($jsonFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'message' => 'Perfil atualizado com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
    }
    exit;
}

if ($action === 'list_users') {
    // Return all users for the administrative panel management
    echo json_encode(['success' => true, 'users' => $users]);
    exit;
}

if ($action === 'delete_user') {
    $usernameToDelete = isset($_GET['username']) ? trim($_GET['username']) : '';
    if ($usernameToDelete === 'admin') {
        echo json_encode(['success' => false, 'message' => 'Não é possível remover o administrador principal.']);
        exit;
    }
    
    $found = false;
    foreach ($users as $index => $u) {
        if (strtolower($u['username']) === strtolower($usernameToDelete)) {
            unset($users[$index]);
            $found = true;
            break;
        }
    }
    
    if ($found) {
        $users = array_values($users); // Reindex
        file_put_contents($jsonFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'message' => 'Usuário removido com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
    }
    exit;
}

echo json_encode(['success' => false, 'message' => 'Ação inválida.']);
?>
