document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Dark/Light Mode Toggle
    const themeSwitch = document.querySelector('.theme-switch input');
    const toggleIcon = document.getElementById('toggle-icon');
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    themeSwitch.addEventListener('change', switchTheme, false);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
   // In your script.js file
// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Account for fixed navbar height
            const offset = 70;
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});


    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Typewriter effect for hero subtitle
const typewriterText = "A Passionate Developer & Tech Enthusiast";
const typewriterElement = document.querySelector('.typewriter h2');

function typeWriter(text, i, element) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i, element), 100);
    }
}

// Start typewriter after 0.5s delay
setTimeout(() => {
    if (typewriterElement) {
        typewriterElement.innerHTML = '';
        typeWriter(typewriterText, 0, typewriterElement);
    }
}, 500);

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow');
            bar.style.width = width + '%';
        });
    }
    
    // Run once on page load
    animateProgressBars();
    
    // Also run when scrolling (in case they're not in view initially)
    window.addEventListener('scroll', function() {
        if (isElementInViewport(document.querySelector('.skill-item'))) {
            animateProgressBars();
        }
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#6c63ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#6c63ff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true }
    }
});
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successElement = document.getElementById('form-success');
    
    // Show loading
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    successElement.style.display = 'none';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            // Show success message instead of redirecting
            successElement.style.display = 'block';
            form.reset();
            
            // Optional: Hide after 5 seconds
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }
});
});