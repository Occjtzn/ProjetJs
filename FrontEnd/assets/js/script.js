// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {
    // Récupération des éléments du DOM
    const headerContainer = document.getElementById('nav-bar');
    const portfolioContainer = document.getElementById('portfolio-title');
    const list = document.createElement('li');
    const instaLogo = document.createElement('li');
    const logoutLink = document.createElement('a');
    const loginLink = document.createElement('a');
    const imageSocial = document.createElement('img');
    const modifyButton = document.createElement('button');
    const editModeHeader = document.getElementById('edit-mode-header');
    const worksModalContainer = document.getElementById('gallery-modal');
    const uploadImage = document.createElement('img');
    const affichagePhoto = document.getElementById('affichage-photo');
    const submitPhoto = document.getElementById('validation-photo');

    // Définition de la fonction de déconnexion
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "./index.html";
    });

    // Définition de la fonction de connexion
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "./login.html";
    });
    // Fonction pour vérifier si l'utilisateur est connecté
    function checkLoggedIn() {
        const token = localStorage.getItem('token');
        if (token) {
            // Si l'utilisateur est connecté
            list.setAttribute("id", "logout-button");
            modifyButton.setAttribute("id", "modify-button");
            modifyButton.textContent += 'modifier';
            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgIcon.setAttribute("width", "16");
            svgIcon.setAttribute("height", "16");
            svgIcon.setAttribute("viewBox", "0 0 16 16");
            svgIcon.setAttribute("fill", "none");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z");
            path.setAttribute("fill", "black");
            svgIcon.appendChild(path);
            modifyButton.prepend(svgIcon);
            portfolioContainer.appendChild(modifyButton);
            logoutLink.setAttribute("id", "logout-link");
            logoutLink.textContent += 'Logout';
            list.appendChild(logoutLink);
            editModeHeader.style.display = 'flex';
            headerContainer.appendChild(list);
            const filters = document.getElementById('filters');
            if (filters) {
                filters.remove();
            }
        } else {
            // Si l'utilisateur n'est pas connecté
            list.setAttribute("id", "login-button");
            loginLink.textContent += 'Login';
            if (window.location.pathname === "/FrontEnd/login.html") {
                loginLink.style.fontWeight = "bold";
            }
            list.appendChild(loginLink);
            headerContainer.append(list);
        }
        instaLogo.setAttribute("id", "insta-logo");
        imageSocial.setAttribute("src", "./assets/icons/instagram.png");
        imageSocial.setAttribute("alt", "Instagram");
        instaLogo.appendChild(imageSocial);
        headerContainer.appendChild(instaLogo);
    }

    // Appel de la fonction pour vérifier si l'utilisateur est connecté
    checkLoggedIn();

    // Récupération des éléments de la modal
    var modal = document.getElementById("myModal");
    var modalPhoto = document.getElementById("myModalPhoto");
    var btn = document.getElementById("modify-button");
    var btnAddPhoto = document.getElementById("add-photo");
    var closeButtons = document.querySelectorAll('.modal .close');
    var backArrow = document.querySelector('.back-arrow');
    var uploadPhoto = document.getElementById("upload-photo");

    // Ajout des écouteurs pour les boutons de fermeture de la modal
    closeButtons.forEach(function(button) {
        button.onclick = function() {
            this.parentElement.parentElement.style.display = "none";
        };
    });

    // Fonction pour afficher les photos dans la modal
    function displayModal(worksModalContainer) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            worksModalContainer.innerHTML = ''; 
            for(let work of result) {
                let figure = document.createElement('figure');
                figure.className = "modal-figure";

                // Création de l'image
                let image = new Image();
                image.src = work.imageUrl;

                // Création du bouton de suppression avec le SVG uniquement
                const deleteButton = document.createElement('button');
                deleteButton.setAttribute("id", "delete-button");
                deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none" class="svg-image-button">
                    <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
                </svg>`;
                deleteButton.className = 'delete-image-button';
                deleteButton.dataset.imageId = work.id;

                // Ajout des éléments à la figure
                figure.appendChild(image);
                figure.appendChild(deleteButton);

                // Ajout de la figure à la modal
                worksModalContainer.appendChild(figure);
            }
        })
        .then(() => {
            // Ajout d'un écouteur pour le clic sur les boutons de suppression
            worksModalContainer.addEventListener('click', function(event) {
                console.log(event.target)
                if (event.target.closest('.delete-image-button')) {
                    const imageId = event.target.closest('.delete-image-button').dataset.imageId;
                    deleteImage(imageId);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    }

    // Fonction pour supprimer une image
    function deleteImage(imageId) {
        console.log(imageId)
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                // Si la suppression est réussie, rafraîchissez la modal pour refléter les changements
                displayModal(worksModalContainer);
            } else {
                throw new Error('Failed to delete image');
            }
        })
        .catch(error => {
            console.error('Error deleting image:', error);
        });
    }


    // Ajout d'un écouteur pour le clic sur la flèche de retour
    backArrow.addEventListener('click', function() {
        modal.style.display = "block";
        modalPhoto.style.display = "none";
    });

    // Ajout d'un écouteur pour le clic sur le bouton de modification
    btn.onclick = function() {
        modal.style.display = "block";
        displayModal(worksModalContainer);
    }
    
    // Ajout d'un écouteur pour le clic sur le bouton d'ajout de photo
    btnAddPhoto.onclick = function() {
        modal.style.display = "none";
        modalPhoto.style.display = "block";  

        // Récupération des catégories depuis l'API
        fetch('http://localhost:5678/api/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('categorySelect');
            categorySelect.innerHTML = '';
            var defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Choisissez une catégorie";
            categorySelect.appendChild(defaultOption);
            categories.forEach(category => {
                var option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories :', error);
        });
    }

    // Ajout de l'image pour l'affichage de la photo
    affichagePhoto.appendChild(uploadImage)
    uploadImage.display = "none"

    // Ajout d'un écouteur pour le clic sur le bouton d'upload de photo
    uploadPhoto.onclick = function(event) {
        var photoInput = document.getElementById("photo-input");
        photoInput.onchange = function(event) {            
            // Affiche l'image
            uploadImage.src = URL.createObjectURL(event.target.files[0]);
            uploadImage.style.display = "block"; // Modifie le style pour afficher l'image
        };
        photoInput.click();
    }

    submitPhoto.onclick = function(event) {
        const file = document.getElementById("photo-input").files[0];
        const category = document.getElementById("categorySelect").value;
        const title = document.getElementById("imageName").value;

        // Une fois que le fichier est chargé avec succès, envoyer la photo
        var token = localStorage.getItem("token");
        const formData = new FormData();
        console.log(file.name);
        formData.append('image', file);
        formData.append('title', title); 
        formData.append('category', category); 
        // Maintenant vous pouvez effectuer votre appel fetch pour envoyer la photo
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            body: formData
        })
        .then(response => {
            // Gérer la réponse de l'API
            if (response.ok) {
                displayModal(worksModalContainer);
                // La requête a réussi, vous pouvez traiter la réponse ici
            } else {
                // La requête a échoué, gérer l'erreur ici
                throw new Error('Échec de la requête POST');
            }
        })
        .catch(error => {
            // Gérer les erreurs
            console.error('Erreur lors de l\'envoi de la photo:', error);
        });
    }

    // Ajout d'un écouteur pour le clic en dehors de la modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == modalPhoto) {
            modalPhoto.style.display = "none";
        }
    }
});
