<?php
    session_start();

    if(!isset($_POST['name']) || trim($_POST['name']) == '') {
        header('Location: ../index.php');
        exit();
    }

    require_once 'connect.php';

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connection -> connect_error != 0) {
        echo "Connection error: " . $connection->connect_error . " Opis ". $connection->connect_error;
    } else {
        $_SESSION['fridge_name'] = $_POST['name'];
        $name = $_POST['name'];

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