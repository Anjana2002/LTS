<?php
session_start();
include("connection.php");
$query = "SELECT * FROM product";
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <link rel="icon"  href="images/leaf.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=New+Rocker&family=Revalia&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="main.js"></script>
    <title>GreenCart</title>
</head>
<body>
    <div class="header">
        <h1 id="greencart">
            <img src="images/leaf.png" alt="Leaf Logo" class="logo">
            GreenCart
        </h1> 
        <div>
            <a href="home.html" >Home</a>
            <a href="about_us.html" >About Us</a>
            <a href="contact.html">Contact</a>
            <a href="search.html">
                <img src="images/search.png" alt="Search" id="search">
            </a>
            <a href="cart.html">
                <img src="images/trolley.png" alt="trolley" id="trolley"><span id="cart-count">0</span>                                                        
            </a>
            <div class="dropdown">
                <a href="#" id="profile_link">
                    <img src="images/avatar.png" alt="profile" id="profile">
                </a>
                <div class="dropdown-menu" id="dropdownMenu">
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <p>Hello, <?php echo htmlspecialchars($_SESSION['name']); ?></p>
                        <a href="logout.php">Logout</a>
                    <?php else: ?>
                    <a href="register.php">Register</a>
                    <a href="signin.php">Sign In</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>        
    </div>
    
     <div class="welcome-section">
        <div class="text-overlay">
            <h2 id="welcome">Welcome to GreenCart</h2>
            <p>Discover eco-friendly products that bring nature closer to your home while promoting a sustainable lifestyle.</p>
        </div>
    </div>

    <div class="product-section">
        <!-- From Database -->
        <?php while($row = $result->fetch_assoc()): ?> 
            <div class="product-box" data-p_id="<?php echo $row['p_id']; ?>">
                <img src = "<?php echo htmlspecialchars($row['p_img']);  ?>"
                     alt = "<?php echo htmlspecialchars($row['p_name']); ?>"
                     class="product-image">
                <h3> <?php echo htmlspecialchars($row['p_name']); ?></h3>
                <p class="description"> <?php echo htmlspecialchars($row['p_des']); ?></p>
                <p class="price"> <?php echo htmlspecialchars($row['p_price'])?></p>
                <button class="add-to-cart">Add to Cart </button>
                <button class="delete-item">Delete</button>
                <button class="edit-item">Edit</button>
            </div>
        <?php endwhile; ?>   
    </div>
    
    <div class="modal" id="descriptionModal">
        <div class="modal-content">
           <span class="close">&times;</span>
            <h2 id="modalTitle"></h2>
            <div id="modalDescription"></div>
        </div>
    </div>

    <div class="button-area">
        <button id="add_item" type="button" class="btn">Add Item</button>
    </div>                                                                                                                                                                                                                                  
    
    <div class="modal" id="itemModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="add-item">Add Items</h2>
            <form id="itemForm" action="save_item.php" method="POST" enctype="multipart/form-data" >
                <input type="hidden" id="p_id" name="p_id">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" >

                <label for="description">Description:</label>
                <textarea name="description" id="description"></textarea>

                <label for="image">Image:</label>
                <input type="file" id="image" name="image" accept="image/*">
                <img id="imagePreview" alt="image preview">
                
                <label for="price">Price:</label>
                <input type="number" id="price" name="price">

                <button type="submit">Save Item</button>
            </form>
        </div>
    </div>

    <div class="discount">
        <img src="images/sales.jpg"/>                                                                               
    </div>
                    
    <div class="footer">
        <div class="footer-logo">
            <h3>GreenCart</h3>
            <p>GreenCart is your one-stop online store for sustainable, eco-friendly, and organic products.</p>
            <p>We believe in greener living - where every purchase makes a positive impact on our planet.</p>
    </div>
    <div class="footer-contact">
        <h4>Contact Us</h4>
        <p id="mail">Email: <a href="mailto:info@greencart.com"  >info@greencart.com</a></p>
        <p>Phone: +91 0999038880</p>
        <p>Address: 23, Green Avenue, Bengaluru, India</p>
    </div>
</body>
</html>

