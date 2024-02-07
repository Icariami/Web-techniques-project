<?php
  
function my_autoloader($class) {
    include $class . '.php';
}
  
spl_autoload_register('my_autoloader');
  
$user = new Register_new;
  
$loginResult = $user->_login();

header('Content-Type: application/json');

if ($loginResult == "ok") {
    echo json_encode(array('success' => "ok"));
} else if ($loginResult == "invalid_password"){
    echo json_encode(array('success' => "invalid_password"));
}else {
    echo json_encode(array('success' => "nope"));
}
?>