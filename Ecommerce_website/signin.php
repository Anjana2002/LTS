<?php
session_start();
include('connection.php');

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $username = mysqli_real_escape_string($conn,$_POST['username']);
    $password = $_POST['password'];
    
    $query = "SELECT user_id, username, password FROM user WHERE username='$username'";
    $result = mysqli_query($conn, $query);

    if($result && mysqli_num_rows($result)>0){
        $row = mysqli_fetch_assoc($result);

        if(password_verify($password, trim($row['password']))){
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['name'] = $row['name'];
        
            header("Location: index.php");
            exit();
        }
        else {
            echo "Incorrect username or password";
        }

    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
    <link rel="stylesheet" href="style.css"/>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="main.js"></script>
</head>
<body style="margin: 0; height: 100vh; display: flex; justify-content: center; align-items: center; ">
   
    
    <div class="modal-content">
        <form  id="signinForm" action="signin.php" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">

            <label for="password">Password:</label>
            <input type="password" id="password" name="password">

            <button type="submit">Sign In</button> 

        </form>
        <p>Don't have an account?<a href="register.php">Register here</a>
    </div>
</body>
</html>