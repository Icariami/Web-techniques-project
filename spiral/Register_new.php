<?php

class Register_new extends Register_base
{
   private $dbh;
   private $dbfile = "files/data.db" ;
  
    function __construct () 
    {
        parent::__construct() ;  
        session_set_cookie_params([
                'lifetime' => 360,
                'path' => '/~1makiela/',                 // konto na ktorym dziala serwis 
                'domain' => $_SERVER['HTTP-HOST'],
                'secure' => false,                   // serwer Pascal - tylko http
                'httponly' => false,
                'samesite' => 'LAX'
            ]);       
        session_start() ;
    }

    function _read_and_save_animation_data() 
    {
        $this->animation_data['username'] = $_SESSION['user'];
        $this->animation_data['iterations'] = $_POST['iterations'];
        $this->animation_data['angle'] = $_POST['angle'];
        $this->animation_data['add'] = $_POST['add'];

        $timestamp = time(); 
        $key = $this->animation_data['username'] . '_' . $timestamp;

        $this->dbh = dba_open("../files/animation.db", "c");
        if (!$this->dbh) {
            die("Nie udało się otworzyć bazy danych.");
        }
        $serialized_data = serialize($this->animation_data);
        if (dba_insert($key, $serialized_data, $this->dbh)) {
            $text = $_SESSION['user'];
            $result = true;
        } else {
            $text = 'Błąd podczas zapisywania danych.';
            $result = false;
        }
        dba_close($this->dbh);
        return $result;
    }

    
    function _save()
    {
        $this->dbh = dba_open($this->dbfile, "c");
    
        if (!$this->dbh) {
            die("Nie udało się otworzyć bazy danych.");
        }
    
        if (!dba_exists($this->data['username'], $this->dbh)) {
            $serialized_data = serialize($this->data);
            if (dba_insert($this->data['username'], $serialized_data, $this->dbh)) {
                $text = 'Dane zostały zapisane';
                $result = true;
            } else {
                $text = 'Błąd podczas zapisywania danych.';
                $result = false;
            }
        } else {
            $text = 'Dane dla podanej nazwy użytkownika są już w bazie danych';
            $result = false;
        }
    
        dba_close($this->dbh);
        return $result;
    }
    
    function _login() 
    {
        $username = $_POST['username'] ;
        $password = $_POST['password'] ;
        $access = false ;
        $this->dbh = dba_open( $this->dbfile, "r");
        $result = "";
        if ( dba_exists( $username, $this->dbh ) ) 
        {
            $serialized_data = dba_fetch($username, $this->dbh) ;
            $this->data = unserialize($serialized_data);

            if ($this->data ['password'] == $password ) 
            {
                $_SESSION['auth'] = 'OK' ;
                $_SESSION['user'] = $username ;
                $access = true ;
                $result = "ok";
            }
            else {
                $result = "zlehaslo";
            }
        }
        else {
            $result = "brak";
        }
        dba_close($this->dbh) ;
        return $result;
    }
    
    function _is_logged() 
    {
        if ( isset ( $_SESSION['auth'] ) ) 
            $ret = $_SESSION['auth'] == 'OK' ? true : false;
        else 
            $ret = false; 
    
        return $ret;
    }

    function _logout() 
    {
        unset($_SESSION);
        session_destroy();
    }

    function _read_user() 
    {
        $username = $_SESSION['user'] ;
        $this->dbh = dba_open( $this->dbfile, "r");

        if ( dba_exists( $username, $this->dbh ) ) 
        {
            $serialized_data = dba_fetch($username, $this->dbh) ;
            $this->data = unserialize($serialized_data);
        }
        dba_close($this->dbh);
    }
           
    function _read_all() 
    {
        $table = array();
        $this->dbh = dba_open( $this->dbfile, "r");
        $key = dba_firstkey($this->dbh);

        while ($key) 
        {
            $serialized_data = dba_fetch($key, $this->dbh) ;
            $this->data = unserialize($serialized_data);
            $table[$key]['username'] = $this->data['username'];
            $key = dba_nextkey($this->dbh);
        }

        dba_close($this->dbh) ;
        return $table;
    }

}

?>

