// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle form submission
const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();

        if (!name || !email || !msg) {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate AJAX request
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message: msg })
        })
        .then(response => response.json())
        .then(data => {
            showMessage('Your message has been sent successfully!', 'success');
            form.reset();
        })
        .catch(error => {
            showMessage('Failed to send message. Please try again later.', 'error');
        });
    });
}

function showMessage(msg, type) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = msg;
    messageDiv.className = '';
    messageDiv.classList.add(type);
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 4000);
}