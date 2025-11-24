<?php
    include('connection.php');

    if(isset($_POST['p_id'])){
        $p_id = $_POST['p_id'];
        $query = "DELETE FROM product WHERE p_id='$p_id'";
        
        if (mysqli_query($conn, $query)) {
            echo "success";
        } else {
            echo "error" . mysqli_error($conn);
        }
        mysqli_close($conn);
    }else {
        echo "no_id_received";
    }
?>