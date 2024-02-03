<?php
  
function my_autoloader($class) {
    include $class . '.php';
}
  
spl_autoload_register('my_autoloader');
  
$reg = new Register_new ;
$reg->_read();
$registrationResult = $reg->_save();

header('Content-Type: application/json');

if ($registrationResult) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}

?>