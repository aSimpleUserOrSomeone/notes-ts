<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="./build/bundle.css">
    <script src="./build/bundle.js" defer></script>
    <script src="https://cdn.tiny.cloud/1/ngq719t9qs7liuu5cgxe5lj3l375ul28z3fsxznzmq41r0wn/tinymce/6/tinymce.min.js"
        referrerpolicy="origin"></script>
        <link rel="shortcut icon" href="./build/fridge.svg" type="image/x-icon">
    <title>Fridge</title>
</head>

<body>
    <header>
        <button class="new-note-btn"></button>
        <form action="./index.php">
            <button type="submit" class="back-btn">Go Back</button>
        </form>
        <div class="counters-div">
            <p class="counter-all-p">Total count: 0</p>
            <p class="counter-now-p">Notes now: 0</p>
        </div>
    </header>
    <main>
        <div id="overlay" class="overlay-hidden"></div>
        <!-- <div class="note">
				<button class="edit-btn"></button>
				<button class="close-btn"></button>
				<p class="textfield-p">Note</p>
			</div> -->
    </main>
</body>
</html>

<?php
    session_start();

    if(!isset($_SESSION['fridge'])) {
        header('Location: ../index.php');
        exit();
    }

    require_once "./php/connect.php";

    $connection = @new mysqli($host, $db_user, $db_password, $db_name);
    $table_name = $_SESSION['fridge_name'];
    $sql = "SELECT * FROM $table_name;";
    $result = @$connection->query($sql);
    $rows = [];

    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    if($rows) {
        echo $rows[0]['content'];
        echo $rows[1]['content'];
        echo json_encode($rows);
        file_put_contents("rows.json", json_encode($rows));
    }
?>