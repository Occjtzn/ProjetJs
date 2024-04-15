document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById('nav-bar');
    const portfolioContainer = document.getElementById('portfolio');
    const list = document.createElement('li');
    const instaLogo = document.createElement('li');
    const logoutLink = document.createElement('a');
    const loginLink = document.createElement('a');
    const imageSocial = document.createElement('img');
    const modifyButton = document.createElement('button');
    const editModeHeader = document.getElementById('edit-mode-header');

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "./index.html";
    });

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "./login.html";
    });

    function checkLoggedIn() {
        const token = localStorage.getItem('token');
        if (token) {
            list.setAttribute("id", "logout-button");
            modifyButton.setAttribute("id", "modify-button")
            modifyButton.textContent += 'Modifier';
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
            list.setAttribute("id", "login-button");
            loginLink.textContent += 'Login';
                if (window.location.pathname === "/FrontEnd/login.html") {
                    loginLink.style.fontWeight = "bold";
                }
            list.appendChild(loginLink);
            headerContainer.append(list);
        }
        imageSocial.setAttribute("src", "./assets/icons/instagram.png");
        imageSocial.setAttribute("alt", "Instagram");
        instaLogo.appendChild(imageSocial);
        headerContainer.appendChild(instaLogo);
    }

    checkLoggedIn();
});