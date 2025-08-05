// Initialize EmailJS with  public key
(function() {
    emailjs.init("0r4QMctW837iGstPa"); 
})();


        // Mobile menu toggle functionality
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(event.target);
    const templateParams = {
        from_name: formData.get('from_name'),
        reply_to: formData.get('reply_to'),
        message: formData.get('message')
    };

    // Send email using EmailJS
    emailjs.send('gmail_service1', 'template_ljligkk', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            event.target.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Function to show notifications
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background-color: #4CAF50;' : 'background-color: #f44336;'}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}


function handleFormSubmitSimple(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', event.target)
        .then(function(response) {
            alert('Thank you! Your message has been sent successfully.');
            event.target.reset();
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('Sorry, there was an error. Please try again.');
        })
        .finally(function() {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        });
}
 // Certificate view functionality
        document.querySelectorAll('.view-cert-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const pdfPath = this.getAttribute('data-pdf');
                if (pdfPath) {
                    window.open(pdfPath, '_blank');
                } else {
                    showNotification('Certificate not available at the moment.', 'error');
                }
            });
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });