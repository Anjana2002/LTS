$(document).ready(function(){
    //add item
    $(document).on('click', '#add_item', function(){
        $('#itemModal').show();
    });

    //close
    $(document).on('click', '.modal .close', function(){
        $(this).closest('.modal').hide();
        $('#itemForm')[0].reset();
        $('#imagePreview').hide();
        $('.error').remove();
    });

    //preview image
    $(document).on('change', '#image', function(){
        const imageFile = this.files[0];
        const preview = $('#imagePreview');
        if(imageFile){
            const imageURL = URL.createObjectURL(imageFile);
            preview.attr('src', imageURL).show();
        } else{
            preview.hide();
        }
    });

    //delete
    $(document).on('click', '.delete-item', function(){
        const button = $(this);
        const productBox = button.closest('.product-box');
        const productId = productBox.data('p_id');

        if(!confirm('Are you sure you want to delete this item?')) return;
        $.ajax({
            url:'delete_item.php',
            type:'POST',
            data:{ p_id:productId },
            success:function(response){
                if(response.trim() === 'success'){
                    productBox.remove();
                } else {
                    alert('Error deleting item: ' + response);
                }  
            },
            error:function(){
                alert('An error occurred while deleting the item.');
            }
        }) 
    });

    //edit
    $(document).on('click', '.edit-item', function(){
        const button = $(this);
        const productBox = button.closest('.product-box');
        const productId = productBox.data('p_id');
        const productName = productBox.find('h3').text().trim();
        const productDes = productBox.find('.description').text().trim();
        const productPrice = productBox.find('.price').text().trim();
        const productImg = productBox.find('.product-image').attr('src');

        $('#add-item').text('Edit Item');
        $('#itemForm').attr('action', 'edit_item.php');
        $('#p_id').val(productId);
        $('#name').val(productName);
        $('#description').val(productDes);
        $('#price').val(productPrice);

        if (productImg) {
            $('#imagePreview').attr('src', productImg).show();
        } else {
            $('#imagePreview').hide();
        }
        $('#itemModal').show();
    })

    $(document).on('submit', '#itemForm', function(e){
        e.preventDefault();
        const name = $('#name').val().trim();
        const description = $('#description').val().trim()
        const formData = new FormData(this);
        $('.error').remove();
        let valid = true;
        if(name === ''){ 
            $('#name').after('<span class="error">Name cannot be empty</span>');
            valid = false;;
        } else if(!/^[A-Za-z\s]+$/.test(name)){
            $('#name').after('<span class="error">Name should contain only letters</span>');
            valid = false;
        }
        if(description.length>200){
            $('#description').after('<span class="error">Name should contain only letters</span>');
            valid = false;
        }
        if(!valid){
            e.preventDefault();
        }

        $.ajax({
            url:'edit_item.php',
            type:'POST',
            data:formData,
            processData: false,
            contentType: false,
            success:function(response){
                if(response.trim() === 'success'){
                    $('#itemModal').hide();
                } else {
                    alert('Error: ' + response);
                }
            },
            error: function(xhr, status, error) {
            alert('AJAX error: ' + error)
            }
        });
    });
    


    //details
    $(document).on('click', '.product-box', function(e){
        if ($(e.target).is('button') || $(e.target).closest('button').length) return;
        const productBox = $(this);
        const title = productBox.find('h3').text();
        const fullDesc = productBox.find('.description').text();
        const price = productBox.find('.price').text();
        const imageSrc = productBox.find('img').attr('src');                                                
        $('#modalTitle').text(title);
        $('#modalDescription').html(`
            <div class="modal-body">
                <div class="modal-left">
                    <img src="${imageSrc}" alt="${title}" class="product-image">
                </div>
                <div class="modal-right">
                    <p>${fullDesc}</p>
                    <p><strong>${price}</strong></p>
                </div>
            </div>
        `);                                                                                         
        $('#descriptionModal').fadeIn(); 
    });

    $("#profile_link").click(function(e){
        e.preventDefault();
        $('#dropdownMenu').toggle();
    });
    $(document).click(function(e){
        if(!$(e.target).closest('.dropdown-menu').length){
            $('dropdownMenu').hide();
        }
    }); 

    $(document).on('click', '.add-to-cart', function(){
        const cartCount = $('#cart-count');
        let count = parseInt(cartCount.text());
        cartCount.text(count + 1);
        //add to cart
        const productBox = $(this).closest('.product-box')
        const title = productBox.find('h3').text();
        const price = productBox.find('.price').text();
        const imageSrc = productBox.find('.product-image').attr('src');
        
        const product ={title, price, imageSrc};
                                                                                                                                        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    //cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = $('.cart-items');
    const priceNum = $('#total');                               
    
    if(cart.length == 0){
        cartContainer.html('<p>Your Cart is empty</p>');
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const productHTML = `
        <div class="cart-item">
            <img src="${item.imageSrc}" alt="${item.title}" class="cart-image">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            <button class="delete-item">Delete</button>
        </div>`;

        cartContainer.append(productHTML);    
        
        const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
        total += numericPrice;
        
    });
    priceNum.text('Total: $' + total.toFixed(2));
    $('#clear-cart').click(function() {
        localStorage.removeItem('cart'); 
        $('.cart-items').html('<p>Your Cart is empty</p>');
        $('#total').text(''); 
    });
});
