<?php

include('connection.php');

$message = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $name = trim($_POST['name']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $phone_number = trim($_POST['phone_number']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    if(empty($name) || empty($username) || empty($email) || empty($password)){
        $message = "All fields are required";
    } elseif($password != $confirm_password){
        $message = "Passwords do not match";
    } else{
         if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
            $message = "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
        } else{
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $user_add = $conn->prepare("INSERT INTO user (name, username, email, phone_number, password) VALUES (?, ?, ?, ?, ?)");
            $user_add->bind_param("sssss", $name, $username, $email, $phone_number, $hashed_password);


            if ($user_add->execute()) {
                header("Location: index.php?register=success");
                exit();
            } else {
                if ($conn->errno === 1062) {
                    $message = "Username or Email already exists.";
                } else {
                    $message = " Error: " . $user_add->error;
                }
            }

            $user_add->close();
        }

    }
}
$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="main.js"></script>
</head>
<body>
    
    <div class="register-container">
        <h2>Register</h2>

         <?php if (!empty($message)): ?>
            <p style="color: <?= (strpos($message, 'successful') !== false) ? 'green' : 'red' ?>;">

                <?= htmlspecialchars($message) ?>
            </p>
        <?php endif; ?>

        
        <form  id="registerForm" method="POST" action="register.php">
            <label for="name">Name</label>
            <input type="text" name="name" placeholder="Enter your name" required>

            <label for="username">Username</label>
            <input type="text" name="username" placeholder="Enter your username" required>

            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your email" required>

            <label for="phone_number">Phone Number</label>
            <input type="tel" name="phone_number" id="phone_number" placeholder="Enter phone number" pattern="[0-9]{10}" required>

            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required>

            <label for="confirm_password">Confirm Password</label>
            <input type="password" name="confirm_password" id="confirm_password" placeholder="Re-enter password" required>
            
             <p id="password-error" style="color:red; display:none; font-size:14px;"></p>

            <button type="submit">Register</button>
        </form>
    </div>
    
</body>
</html>