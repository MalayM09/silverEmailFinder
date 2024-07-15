document.addEventListener('DOMContentLoaded', function() {
    const findEmailForm = document.getElementById('findEmailForm');

    findEmailForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const companyInput = document.getElementById('companyInput');
        const companyName = companyInput.value.trim();

        if (!companyName) {
            alert('Please enter a valid company domain.');
            return;
        }

        // Update this URL to your backend's URL
        const backendUrl = 'https://your-backend-url.com/scrape';

        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: companyName })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Emails extracted:', data); // Handle response from backend
            // Display or process extracted emails as needed
        })
        .catch(error => {
            console.error('Error extracting emails:', error);
            // Handle errors gracefully
        });
    });
});
