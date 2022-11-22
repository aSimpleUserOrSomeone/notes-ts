<?php
    session_start();
    require_once "connect.php";

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);
    if($connection -> connect_error)
    {
        echo "Error: ".$connection->connect_errno. " Desc: ". $connection->connect_error;
        exit();
    }

    $totalCount = htmlentities($_POST['totalCount'], ENT_QUOTES, "UTF-8");
    $notesNow = htmlentities($_POST['notesNow'], ENT_QUOTES, "UTF-8");

    $table_name = $_SESSION['fridge_name'];
    
    $sql = sprintf("UPDATE $table_name SET
        totalCount = '%s',
        notesNow = '%s'", 
        mysqli_real_escape_string($connection, $totalCount),
        mysqli_real_escape_string($connection, $notesNow),
    );
        

    $logfile = fopen('../../text.txt', 'w') or die('Unable to open file');
    fwrite($logfile, $sql);

    $stmt = $connection->prepare($sql);
    if($connection->query($sql) === true) {
        echo "Counter Updated";
    } else {
        echo $connection->error;
    }

?>
