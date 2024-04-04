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
        .then(response => response.json())
        .then(data => {

            if (data.token && data.userId)  {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId)

                window.location.href = "./index.html"
            }
            
        
        })
        .catch(error => {
            
            console.log(error)

            alert('Erreur de connexion');
            console.error('Erreur lors de la connexion :', error);
        });
    });
});