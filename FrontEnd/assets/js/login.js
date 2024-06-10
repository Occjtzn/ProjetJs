// Ajout d'un écouteur d'événement pour exécuter le script lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    const loginUrl = 'http://localhost:5678/api/users/login';

    // Sélection du formulaire de connexion
    const loginForm = document.getElementById('login');

    // Ajout d'un écouteur d'événement pour le formulaire de connexion lors de la soumission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

        // Récupération des valeurs des champs de saisie
        const email = document.getElementById('email').value;
        const password = document.getElementById('motDePasse').value;

        // Envoi d'une requête POST à l'API pour tenter de se connecter
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Définition du type de contenu comme JSON
            },
            body: JSON.stringify({ email: email, password: password }) // Conversion des données en JSON
        })
        .then(response => {
            if (!response.ok) {
                // Gestion des erreurs de réponse
                if (response.status === 404) {
                    alert("L'utilisateur n'existe pas");
                }
            }
            return response.json(); // Conversion de la réponse en JSON
        })
        .then(data => {
            // Vérification si le token et l'userId sont présents dans la réponse
            if (data.token && data.userId) {
                // Stockage du token et de l'userId dans le localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);

                // Redirection vers la page d'accueil
                window.location.href = "./index.html";
            }
        })
        .catch(error => {
            // Gestion des erreurs lors de la requête
            alert('Erreur de connexion');
            console.error('Erreur lors de la connexion :', error);
        });
    });
});