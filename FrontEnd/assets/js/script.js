document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const logoutLink = document.getElementById('logout-link');
    const filtersSection = document.getElementById('filters');
    const modifyButton = document.getElementById('modify-button');
    const editModeHeader = document.getElementById('edit-mode-header');

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "./index.html";
    });

    modifyButton.addEventListener('click', function(event) {
        window.location.href = "./modify_projects.html";
    });

    function checkLoggedIn() {
        const token = localStorage.getItem('token');
        if (token) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
            filtersSection.style.display = 'none';
            modifyButton.style.display = 'block';
            editModeHeader.style.display = 'flex';
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            filtersSection.style.display = 'block';
            modifyButton.style.display = 'none';
            editModeHeader.style.display = 'none';
        }
    }

    checkLoggedIn();
});