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
    <form action="./php/create_fridge.php" method="POST" class="enter-form">
        <h1>The Fridge!</h1>
        <div class="container">
            <label for="user">User:</label><input type="text" title="Tylko znaki alfanumeryczne" pattern="[A-Za-z0-9]{3,15}" name="name" id="name">
        </div>
        <button type="submit">To Fridge</button>
    </form>
</body>
</html>