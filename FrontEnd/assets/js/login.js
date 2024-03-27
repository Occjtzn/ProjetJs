document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.querySelector('.email').value;
        const password = document.querySelector('.motDePasse').value;

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de la connexion.');
            }
        })
        .then(data => {
            window.location.href = './logout.html';
        })
        .catch(error => {
            alert('Erreur de connexion');
            console.error('Erreur lors de la connexion :', error);
        });
    });
});