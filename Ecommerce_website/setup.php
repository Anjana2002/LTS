<?php
$servername = "192.168.29.10";
$username = "admin";
$password = "Lean@1234";
$database = "anjana_db";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$sql = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sql) === TRUE) {
    echo "Database '$database' ready.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

//select db
$conn->select_db($database);

$user_table_sql = "
CREATE TABLE IF NOT EXISTS user (
    user_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255) NOT NULL
)";

if ($conn->query($user_table_sql)===TRUE){
    echo "Table created succesfully.<br>";
}else {
    die("Error creating user table" .$conn->error);
}
// $update_sql = "ALTER TABLE user ADD COLUMN phone_number VARCHAR(10) AFTER email";

// if ($conn->query($update_sql) === TRUE) {
//     echo "Column 'phone_number' added successfully.<br>";
// } else {
//     echo "Error adding column: " . $conn->error;
// }


$product_sql = "
CREATE TABLE IF NOT EXISTS product(
    p_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(100) NOT NULL,
    p_des TEXT,
    p_price DECIMAL(10, 2) NOT NULL,
    p_img VARCHAR(255)
)
";

if($conn->query($product_sql) === TRUE){
    echo "Table product created .<br>";
}else{
    die("Error".$conn->error);
}

$conn->close();         

?>
