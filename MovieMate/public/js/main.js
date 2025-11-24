$(document).ready(function() {
    const $loginLink = $('.login-link');
    const $dropdown = $('.dropdown-menu');
    $loginLink.on('click', function(e) {
        e.preventDefault();
        $dropdown.toggleClass('show');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.login-dropdown').length) {
            $dropdown.removeClass('show');
        }
    });

    $('#theatre-card').click(function(e) {
        e.preventDefault(); 
        $('#theatre-form-container').slideToggle('fast', function() {
            if ($(this).is(':visible')) {
                $('html, body').animate({
                    scrollTop: $(this).offset().top
                }, 500);
            }
        });
    });
});