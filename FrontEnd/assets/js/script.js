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
                let image = new Image();
                let nom = document.createElement('figcaption');
                nom.className = "modal-figcaption";
                nom.textContent = work.title;
                image.src = work.imageUrl;
                figure.appendChild(image);
                worksModalContainer.appendChild(figure);
            }
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
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                // Une fois que le fichier est chargé avec succès, envoyer la photo
                const photoData = event.target.result;
                console.log(photoData)
                var token = localStorage.getItem("token")
                // Maintenant vous pouvez effectuer votre appel fetch pour envoyer la photo
                fetch('http://localhost:5678/api/works', {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token,
                      },
                    body: `image=${photoData}&title=test&category=1`
                })
                .then(response => {
                    // Gérer la réponse de l'API
                    if (response.ok) {
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
            };

            // Lit le contenu du fichier en tant qu'ArrayBuffer
            reader.readAsText(file);
            
            // Affiche l'image
            uploadImage.src = URL.createObjectURL(file);
            uploadImage.style.display = "block"; // Modifie le style pour afficher l'image
        };
        photoInput.click();
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