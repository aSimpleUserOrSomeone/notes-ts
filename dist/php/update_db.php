<?php
    session_start();
    require_once "connect.php";

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);
    if($connection -> connect_error)
    {
        echo "Error: ".$connection->connect_errno. " Desc: ". $connection->connect_error;
        exit();
    }

    $id = htmlentities($_POST['id'], ENT_QUOTES, "UTF-8");
    $x = htmlentities($_POST['x'], ENT_QUOTES, "UTF-8");
    $y = htmlentities($_POST['y'], ENT_QUOTES, "UTF-8");
    $content = htmlentities($_POST['content'], ENT_QUOTES, "UTF-8");
    $width = htmlentities($_POST['width'], ENT_QUOTES, "UTF-8");
    $height = htmlentities($_POST['height'], ENT_QUOTES, "UTF-8");
    $totalCount = htmlentities($_POST['totalCount'], ENT_QUOTES, "UTF-8");
    $notesNow = htmlentities($_POST['notesNow'], ENT_QUOTES, "UTF-8");

    $table_name = $_SESSION['fridge_name'];

    //check if record exists
    $sql = sprintf("SELECT * FROM $table_name WHERE id = '%s'",
        mysqli_real_escape_string($connection, $id));
    $result = @$connection->query($sql);
    $rows = mysqli_fetch_assoc($result);
    if($rows)
    { //it exists
        $sql = sprintf("UPDATE $table_name SET
            id = '%s',
            x = '%s',
            y = '%s',
            content = '%s',
            width = '%s',
            height = '%s',
            totalCount = '%s',
            notesNow = '%s'
            WHERE id = '%s';", 
            mysqli_real_escape_string($connection, $id),
            mysqli_real_escape_string($connection, $x),
            mysqli_real_escape_string($connection, $y),
            mysqli_real_escape_string($connection, $content),
            mysqli_real_escape_string($connection, $width),
            mysqli_real_escape_string($connection, $height),
            mysqli_real_escape_string($connection, $totalCount),
            mysqli_real_escape_string($connection, $notesNow),
            mysqli_real_escape_string($connection, $id)
        );
    } else {
        $sql = sprintf("INSERT INTO $table_name VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($connection, $id),
            mysqli_real_escape_string($connection, $x),
            mysqli_real_escape_string($connection, $y),
            mysqli_real_escape_string($connection, $content),
            mysqli_real_escape_string($connection, $width),
            mysqli_real_escape_string($connection, $height),
            mysqli_real_escape_string($connection, $totalCount),
            mysqli_real_escape_string($connection, $notesNow)
        );
    }

    $logfile = fopen('../../text.txt', 'w') or die('Unable to open file');
    fwrite($logfile, $sql);

    $stmt = $connection->prepare($sql);
    if($connection->query($sql) === true) {
        echo "DataBase Updated";
    } else {
        echo $connection->error;
    }

?>
