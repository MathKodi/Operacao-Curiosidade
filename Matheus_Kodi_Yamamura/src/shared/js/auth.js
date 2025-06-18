function getCookie(name) {
    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let [cookieName, cookieValue] = cookie.split("=");

        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function setCookie(name, email) {
    const nameCookie = "userInfo";
    const valueCookie = JSON.stringify({ name: name, logged: true, email: email });
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `${nameCookie}=${valueCookie};${expires};path=/`;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

function updateAvatar() {
    const spanAvatar = document.getElementById('avatar');

    if (spanAvatar && username && username !== "Error") {
        const firstLetter = username.charAt(0).toUpperCase();
        
        spanAvatar.textContent = firstLetter;
    } else if (!spanAvatar) {
        console.warn('Elemento com id="avatar" não foi encontrado na página.');
    }
}

const userInfoCookie = getCookie("userInfo");
let userData = null;
let isLoggedIn = false;
let username = "Error";

if (userInfoCookie) {
    try {
        userData = JSON.parse(userInfoCookie);
        if (userData && typeof userData.logged === 'boolean') {
            isLoggedIn = userData.logged;
        }
        if (userData && typeof userData.name === 'string') {
            username = userData.name;
        }
    } catch (e) {
        console.error("Erro ao ler o cookie de autenticação:", e);
        deleteCookie("userInfo");
    }
}

function restrictPage(){
    if (!isLoggedIn) {
        alert("Você não tem permissão para acessar esta página. Redirecionando para a página inicial.");
        window.location.href = "../login/index.html";
    } else {
        const usernameSpan = document.getElementById('username');

        if (usernameSpan) {
            usernameSpan.textContent = username;
        } else {
            console.error("Erro ao pegar o nome do usuário.");
        }
        updateAvatar(); 
    }
}

function checkIfLoggedIn() {
    if (isLoggedIn) {
        window.location.href = '../dashboard/dashboard.html';
    }
}

function configLogout(){
    const btn_logout = document.getElementById('btn_logout');
    if (btn_logout) {
        btn_logout.addEventListener('click', function() {
            deleteCookie('userInfo');
            window.location.href = '../login/index.html';
        })
    } else {
        console.error("button not found");
    }
}