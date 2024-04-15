document.addEventListener("DOMContentLoaded", function() {
    const worksContainer = document.getElementById('gallery');
    const worksModalContainer = document.getElementById('gallery-modal');
    const filterButtons = document.querySelectorAll('.btn-filter');

    // Modal implementation

    var modal = document.getElementById("myModal");
    var modalPhoto = document.getElementById("myModalPhoto");
    var btn = document.getElementById("modify-button");
    var btnAddPhoto = document.getElementById("add-photo");
    var span = document.getElementsByClassName("close")[0];
    var spanPhoto = document.getElementsByClassName("closePhoto")[0];
    
    btn.onclick = function() {
      modal.style.display = "block";
      displayAllWorks(worksModalContainer);
    }
    
    btnAddPhoto.onclick = function() {
        modal.style.display = "none";
        modalPhoto.style.display = "block";
       
      }
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    spanPhoto.onclick = function() {
        modalPhoto.style.display = "none";
      }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Filtres
    
    function displayAllWorks(container) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            container.innerHTML = ''; 
                for(let work of result) {
                    let figure = document.createElement('figure')
                    let image = new Image();
                    let nom = document.createElement('figcaption');
                    nom.textContent = work.title;
                    image.src = work.imageUrl;
                    figure.appendChild(image);
                    figure.appendChild(nom);
                    container.appendChild(figure)
            }
        });
    }

    displayAllWorks(worksContainer);

    function filterWorksByCategory(category) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            worksContainer.innerHTML = ''; 
            for(let work of result) {
                if (work.category.name === category || category === "all") {
                    let figure = document.createElement('figure')
                    let image = new Image();
                    let nom = document.createElement('figcaption');
                    nom.textContent = work.title;
                    image.src = work.imageUrl;
                    figure.appendChild(image);
                    figure.appendChild(nom);
                    worksContainer.appendChild(figure)
                }
            }
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(oldButton => {
                oldButton.classList.remove('active')
            });
            button.classList.add('active')
            const category = button.dataset.category;
            filterWorksByCategory(category);
        });
    });
});
