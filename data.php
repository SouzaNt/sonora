<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = 'dados.json';
$usersFile = 'usuarios.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(['error' => 'Data file not found.']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input) {
        // Save to dados.json
        file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        // Sync teachers list to users list
        $teachers = isset($input['teachers']) ? $input['teachers'] : [];
        syncTeachersToUsers($teachers, $usersFile);
        
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data.']);
    }
    exit;
}

function syncTeachersToUsers($teachers, $usersFile) {
    $users = [];
    if (file_exists($usersFile)) {
        $users = json_decode(file_get_contents($usersFile), true);
    }
    if (!is_array($users)) {
        $users = [];
    }

    $activeTeacherUsernames = [];

    foreach ($teachers as $teacher) {
        $username = strtolower(trim($teacher['id']));
        $activeTeacherUsernames[] = $username;

        // Find if user already exists
        $found = false;
        foreach ($users as &$user) {
            if (strtolower($user['username']) === $username) {
                // Update name and role
                $user['name'] = $teacher['name'];
                $user['role'] = 'professor';
                if (!isset($user['password']) || empty($user['password'])) {
                    $user['password'] = '123';
                }
                $found = true;
                break;
            }
        }
        unset($user);

        if (!$found) {
            // Add new user of type professor with default details
            $users[] = [
                'username' => $username,
                'name' => $teacher['name'],
                'cpf' => '000.000.000-00',
                'birthdate' => '2000-01-01',
                'password' => '123',
                'role' => 'professor'
            ];
        }
    }

    // Clean up old professor accounts that are no longer in the teachers list
    $finalUsers = [];
    foreach ($users as $user) {
        if ($user['role'] === 'professor') {
            if (in_array(strtolower($user['username']), $activeTeacherUsernames)) {
                $finalUsers[] = $user;
            }
        } else {
            $finalUsers[] = $user;
        }
    }

    file_put_contents($usersFile, json_encode($finalUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
?>
