<?php
session_start();

function my_autoloader($class) {
    include $class . '.php';
}

spl_autoload_register('my_autoloader');

$user = new Register_new;
$user->_logout();
echo json_encode(array('success' => true));
?>
