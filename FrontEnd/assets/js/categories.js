document.addEventListener("DOMContentLoaded", function() {
    const worksContainer = document.getElementById('gallery');
    const filterButtons = document.querySelectorAll('.btn-filter');

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
                    figure.className = "all-figure"
                    let image = new Image();
                    let nom = document.createElement('figcaption');
                    nom.className = "all-figcaption";
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
