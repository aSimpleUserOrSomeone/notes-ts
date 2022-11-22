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
        $table_name = $_POST['name'];

        //stmt is querry created if such a fridge doesnt exist(is new)
        $stmt = $connection->prepare("CREATE TABLE IF NOT EXISTS $table_name(
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


        //create base note if empty
        $sql = sprintf("SELECT * FROM $table_name");
        $result = @$connection->query($sql);
        $rows = mysqli_fetch_assoc($result);
        if($rows === false)
        { //is empty
            $sql = sprintf("INSERT INTO $table_name VALUES(0, 0, 0, '' , 100, 100, 0, 0)");
            
            $logfile = fopen('../../text.txt', 'w') or die('Unable to open file');
            fwrite($logfile, $sql);
    
            $stmt = $connection->prepare($sql);
            if($connection->query($sql) === true) {
                echo "Done";
            } else {
                echo $connection->error;
            }
        }

        

        header('Location: ../fridge.php');
    }
?>