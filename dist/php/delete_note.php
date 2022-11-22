<?php
    session_start();
    require_once "connect.php";

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);
    if($connection -> connect_error)
    {
        echo "Error: ".$connection->connect_errno. " Desc: ". $connection->connect_error;
        exit();
    }

    $id = $_POST['id'];

    $table_name = $_SESSION['fridge_name'];
    $sql = sprintf("DELETE FROM $table_name
        WHERE id = %s;",
        mysqli_real_escape_string($connection, $id)
    );

    $logfile = fopen('../../text.txt', 'w') or die('Unable to open file');
    fwrite($logfile, $sql);

    $stmt = $connection->prepare($sql);
    if($connection->query($sql) === true) {
        echo "Done";
    } else {
        echo $connection->error;
    }

?>
