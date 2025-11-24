<?php       

include('connection.php');

$imagePath = "";
if(!empty($_FILES["image"]["name"])){
    $targetDir = "uploads/";
    if(!is_dir($targetDir)){
        mkdir($targetDir, 0777, true);
    }
    $fileName = time(). "_".basename($_FILES["image"]["name"]);
    $targetFile = $targetDir. $fileName;
    if(move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)){
        $imagePath = $targetFile;
    }
}

$p_name = $_POST["name"];
$p_des = $_POST["description"];
$p_price = $_POST["price"];
$p_add = $conn->prepare("INSERT INTO product (p_name, p_des, p_price, p_img) VALUES (?, ?, ?, ?)");
$p_add->bind_param("ssds",  $p_name, $p_des, $p_price, $imagePath);

if($p_add->execute()){
    header("Location: index.php?msg=success");
    exit;
} else{
    echo "ERROR:".$p_add->error;
}

$p_add->close();
$conn->close();
?>

