<?php
    session_start();

    //check if input is something
    if(!isset($_POST['name']) || trim($_POST['name']) == '') {
        header('Location: ../index.php');
        exit();
    }

    //get connection data
    require_once 'connect.php';
    $connection = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connection -> connect_error) {
        echo "Connection error: " . $connection->connect_error . " Opis ". $connection->connect_error;
    } else {
        //name is what was in the input
        $_SESSION['fridge_name'] = $_POST['name'];
        $name = $_POST['name'];

        //stmt is querry created if such a fridge doesnt exist(is new)
        $stmt = $connection->prepare("CREATE TABLE IF NOT EXISTS $name(
            id int,
            x int,
            y int,
            content text(262143),
            width int,
            height int,
            totalCount int,
            notesNow int,
            PRIMARY KEY (ID)
        );");
        $stmt->execute();
        header('Location: ../fridge.php');
    }
?>