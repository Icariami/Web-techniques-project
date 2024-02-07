<?php
session_start();

function my_autoloader($class) {
    include $class . '.php';
}

spl_autoload_register('my_autoloader');

$user = new Register_new;

if ($user->_is_logged()) {
    $response = array('success' => true, 'username' => $_SESSION['user']);
    $username = $_SESSION['user'];

    $filename = "../files/animation.db";
    $file_content = file_get_contents($filename);

    // Szukanie linii zawierającej dane dla danego użytkownika
    $pattern = "/{$username}_(\d+)\n(.*?)(?=(\d+\n|$))/s";
    preg_match_all($pattern, $file_content, $matches, PREG_SET_ORDER);

    $animationData = array();

    if (!empty($matches)) {
        foreach ($matches as $match) {
            $timestamp = $match[1];
            $animation_data = unserialize($match[2]);

            // Dodaj dane animacji do tablicy
            $animationData[] = array(
                'timestamp' => $timestamp,
                'iterations' => $animation_data['iterations'],
                'angle' => $animation_data['angle'],
                'add' => $animation_data['add']
            );
        }
    }

    // Dodaj dane animacji do odpowiedzi
    $response['animationData'] = $animationData;

    // Wyślij odpowiedź w formie JSON
    echo json_encode($response);
} else {
    echo json_encode(array('success' => false));
}
?>
