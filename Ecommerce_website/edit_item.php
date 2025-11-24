<?php 
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $p_id = $_POST['p_id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $imagePath = null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $imageName = basename($_FILES['image']['name']);
        $targetFile = $uploadDir . time() . '_' . $imageName;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $imagePath = $targetFile;
        }
    }

    if ($imagePath) {
        $sql = "UPDATE product 
                SET p_name='$name', p_des='$description', p_price='$price', p_img='$imagePath' 
                WHERE p_id='$p_id'";
    } else {
        $sql = "UPDATE product 
                SET p_name='$name', p_des='$description', p_price='$price' 
                WHERE p_id='$p_id'";
    }
    if (mysqli_query($conn, $sql)) {
        echo "success";     
    } else {
        echo "error: " . mysqli_error($conn);
    }
    mysqli_close($conn);
} else {
    echo "Invalid request.";
}
?>
