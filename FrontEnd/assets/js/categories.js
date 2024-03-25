document.addEventListener("DOMContentLoaded", function() {
    const worksContainer = document.getElementById('gallery');
    const filterButtons = document.querySelectorAll('.btn-filter');

    function displayAllWorks() {
        fetch('http://localhost:5678/api/works', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            worksContainer.innerHTML = ''; 
            for(let work of result) {
                let image = new Image();
                let nom = document.createElement('figcaption');
                nom.textContent = work.title;
                image.src = work.imageUrl;
                worksContainer.appendChild(image);
                worksContainer.appendChild(nom);
            }
        });
    }

    displayAllWorks();

    function filterWorksByCategory(category) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            worksContainer.innerHTML = ''; 
            for(let work of result) {
                if (work.category.name === category || category === "all") {
                    let image = new Image();
                    let nom = document.createElement('figcaption');
                    nom.textContent = work.title;
                    image.src = work.imageUrl;
                    worksContainer.appendChild(image);
                    worksContainer.appendChild(nom);
                }
            }
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = button.dataset.category;
            filterWorksByCategory(category);
        });
    });
});
