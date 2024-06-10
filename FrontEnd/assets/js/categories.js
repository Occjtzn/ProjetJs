// Ajout d'un écouteur d'événement pour exécuter le script lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    const worksUrl = 'http://localhost:5678/api/works';

    // Sélection de l'élément conteneur de la galerie d'œuvres
    const worksContainer = document.getElementById('gallery');

    // Sélection de tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.btn-filter');

    // Fonction pour afficher toutes les œuvres dans le conteneur
    function displayAllWorks(container) {
        // Envoi d'une requête GET à l'API pour récupérer toutes les œuvres
        fetch(worksUrl, { method: 'GET' })
            .then(response => response.json()) // Conversion de la réponse en JSON
            .then(result => {
                container.innerHTML = ''; // Effacement du contenu actuel du conteneur
                result.forEach(work => {
                    // Création des éléments HTML pour chaque œuvre
                    const figure = document.createElement('figure');
                    figure.className = "all-figure";

                    const image = new Image();
                    image.src = work.imageUrl; // Définition de la source de l'image

                    const nom = document.createElement('figcaption');
                    nom.className = "all-figcaption";
                    nom.textContent = work.title; // Définition du texte de la légende avec le titre de l'œuvre

                    // Ajout des éléments à la figure
                    figure.appendChild(image);
                    figure.appendChild(nom);

                    // Ajout de la figure au conteneur
                    container.appendChild(figure);
                });
            });
    }

    // Fonction pour filtrer les œuvres par catégorie
    function filterWorksByCategory(category) {
        // Envoi d'une requête GET à l'API pour récupérer toutes les œuvres
        fetch(worksUrl, { method: 'GET' })
            .then(response => response.json()) // Conversion de la réponse en JSON
            .then(result => {
                worksContainer.innerHTML = ''; // Effacement du contenu actuel du conteneur
                result.forEach(work => {
                    // Vérification si l'œuvre appartient à la catégorie spécifiée ou si toutes les catégories doivent être affichées
                    if (work.category.name === category || category === "all") {
                        // Création des éléments HTML pour chaque œuvre
                        const figure = document.createElement('figure');

                        const image = new Image();
                        image.src = work.imageUrl; // Définition de la source de l'image

                        const nom = document.createElement('figcaption');
                        nom.textContent = work.title; // Définition du texte de la légende avec le titre de l'œuvre

                        // Ajout des éléments à la figure
                        figure.appendChild(image);
                        figure.appendChild(nom);

                        // Ajout de la figure au conteneur
                        worksContainer.appendChild(figure);
                    }
                });
            });
    }

    // Appel de la fonction pour afficher toutes les œuvres initialement
    displayAllWorks(worksContainer);

    // Ajout d'un écouteur d'événement pour chaque bouton de filtre
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Suppression de la classe active de tous les boutons de filtre
            filterButtons.forEach(oldButton => oldButton.classList.remove('active'));

            // Ajout de la classe active au bouton cliqué
            button.classList.add('active');

            // Récupération de la catégorie à partir de l'attribut data-category du bouton
            const category = button.dataset.category;

            // Filtrage des œuvres par la catégorie sélectionnée
            filterWorksByCategory(category);
        });
    });
});
