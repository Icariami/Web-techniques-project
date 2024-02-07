<?php

class Register_base
{
    protected $data = array() ; //nie jest widoczna na zewnątrz klasy i może być dziedziczona
    function __construct () { }
    
    function _read () 
    {
        $this->data['username'] = $_POST['username'];
        $this->data['password'] = $_POST['password'];
    }
    
    function _write () 
    {
        echo "Wprowadzone dane: <br/>" ;
        echo "Nazwa uzytkownika: ". $this->data['username'] ." <br/>" ;
        echo "Hasło: ". $this->data['password'] ." <br/>" ;
    }
}

?>

