const loginForm = document.getElementById('login_form');
if(!loginForm){
    alert("formulario de registro não encontrado");
}

const emailInput = document.getElementById('iemail');
const passwordInput = document.getElementById('ipassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

function login (email, password){
    try {
        let users = JSON.parse(localStorage.getItem('users'));
        const userFound = users.find(user => user.email === email && user.password === password);
        if (userFound){
            if (successMessage) {
                successMessage.style.color = '#5fb35f';
                successMessage.textContent = 'Login efetuado com sucesso!';
            }
            setCookie(userFound.name, userFound.email);
            setTimeout(() => {
                window.location.href = '../dashboard/dashboard.html';
            }, 1500);
        }
        else{
            if(successMessage) {
                successMessage.style.color = '#fa3c3c';
                successMessage.textContent = 'Email ou senha inválidos.';
            }
        }
    } catch (error) {
        if(successMessage) {
            successMessage.style.color = '#fa3c3c';
            successMessage.textContent = 'Nenhum usuario registrado!';
        }
    }
    
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if(emailError) emailError.textContent = '';
    if(passwordError) passwordError.textContent = '';
    const email = emailInput.value;
    const password = passwordInput.value;
    let ok = false;
    ok = isEmailValid(email);
    ok = validatePassword(password);
    if(ok) {
        login(email,password);
    }
});