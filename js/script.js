function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll(':not(.carousel) > a').forEach(link => {
    link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith("#")) {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                smoothScroll(target, 1000);  // 1000ms = 1 second duration
            }
        }
    });
});

//Validation Form

$(document).ready(function() {
    $('#registrationForm').on('submit', function(event) {
        event.preventDefault();  // Prevent form submission

        var isValid = true;

        // Simple validation example
        $('.form-control[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        });

        if (isValid) {
            // Show the modal
            $('#successModal').show();

            // After 3 seconds, hide the modal
            setTimeout(function() {
                $('#successModal').hide();
                document.getElementById('registrationForm').reset();

                // Remove validation styles
                $('.form-control').removeClass('is-valid is-invalid');
            }, 3000);
        }
    });
});


