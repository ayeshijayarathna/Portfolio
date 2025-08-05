// Initialize EmailJS with your public key
(function() {
    emailjs.init("0r4QMctW837iGstPa"); // Replace with your actual public key
})();

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

// Alternative: Simple alert-based version (if you prefer)
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