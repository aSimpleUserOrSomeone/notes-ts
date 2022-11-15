<?php
    session_start();
    require_once 'connect.php';

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connection -> connect_error!=0)
    {
        echo "Connection error: ".$connection->connect_errno. " Opis ". $connection->connect_error;
    }
    else
    {
        
        if(isset($_POST['x']))
        {
            $table_name = $_SESSION['fridge_name'];
            $id = htmlentities($_POST['id'], ENT_QUOTES, "UTF-8");
            $x = htmlentities($_POST['x'], ENT_QUOTES, "UTF-8");
            $y = htmlentities($_POST['y'], ENT_QUOTES, "UTF-8");
            $content = htmlentities($_POST['content'], ENT_QUOTES, "UTF-8");
            $width = htmlentities($_POST['width'], ENT_QUOTES, "UTF-8");
            $height = htmlentities($_POST['height'], ENT_QUOTES, "UTF-8");
        
            $sql = sprintf("INSERT INTO $table_name(id, x, y, content, width, height) VALUES(%s, %s, %s, '%s', %s, %s)", 
            mysqli_real_escape_string($connection, $id),
            mysqli_real_escape_string($connection, $x),
            mysqli_real_escape_string($connection, $y),
            mysqli_real_escape_string($connection, $content),
            mysqli_real_escape_string($connection, $width),
            mysqli_real_escape_string($connection, $height));
            $stmt = $connection->prepare($sql);
            echo $sql;

            if($connection->query($sql) === true) {
                echo "git";
            } else {
                echo $connection->error;
            }
        }   
    }
?>