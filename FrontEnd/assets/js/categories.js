const boutonObjetFiltre = document.querySelector(".btn-objet");
const boutonAppatementsFiltre = document.querySelector(".btn-appartements");
const boutonHotelsFiltre = document.querySelector(".btn-hotels");
const boutonAllFiltre = document.querySelector(".btn-all");
const worksContainer = document.getElementById('gallery')

boutonObjetFiltre.addEventListener("click", function () {
  
fetch('http://localhost:5678/api/works', {
    method: 'GET'
})
  .then((response) => response.json())
  .then((result) => {
    for(let work of result) {
      if (work.category.name === "Objets") {
          let image = new Image()
          let nom = document.createElement('figcaption')
          nom.textContent = work.title
          image.src = work.imageUrl
          worksContainer.appendChild(image)
          worksContainer.appendChild(nom)
      }
    }
  })
});

boutonAppatementsFiltre.addEventListener("click", function () {
  
  fetch('http://localhost:5678/api/works', {
      method: 'GET'
  })
    .then((response) => response.json())
    .then((result) => {
      for(let work of result) {
        if (work.category.name === "Appartements") {
            let image = new Image()
            let nom = document.createElement('figcaption')
            nom.textContent = work.title
            image.src = work.imageUrl
            worksContainer.appendChild(image)
            worksContainer.appendChild(nom)
        }
      }
    console.log(result)
    })
  });

  boutonHotelsFiltre.addEventListener("click", function () {
  
    fetch('http://localhost:5678/api/works', {
        method: 'GET'
    })
      .then((response) => response.json())
      .then((result) => {
        for(let work of result) {
          if (work.category.name === "Hotels & restaurants") {
              let image = new Image()
              let nom = document.createElement('figcaption')
              nom.textContent = work.title
              image.src = work.imageUrl
              worksContainer.appendChild(image)
              worksContainer.appendChild(nom)
          }
        }
      })
    });

    boutonAllFiltre.addEventListener("click", function () {
  
      fetch('http://localhost:5678/api/works', {
          method: 'GET'
      })
        .then((response) => response.json())
        .then((result) => {
          for(let work of result) {
                let image = new Image()
                let nom = document.createElement('figcaption')
                nom.textContent = work.title
                image.src = work.imageUrl
                worksContainer.appendChild(image)
                worksContainer.appendChild(nom)
          }
        })
      });
    
