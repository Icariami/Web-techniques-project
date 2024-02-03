<?php
  
function my_autoloader($class) {
    include $class . '.php';
}
  
spl_autoload_register('my_autoloader');

header('Content-Type: application/json');

$reg = new Register_new ;
if($reg->_is_logged()){ 
    $animation_result = $reg->_read_and_save_animation_data();
    if ($animation_result) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
} else {
    echo json_encode(array('success' => "niezalogowany"));
}




?>