const registerform = document.getElementById('register_form');
if(!registerform){
    console.error("formulario de registro não encontrado");
}

const nameInput = document.getElementById('iname');
const emailInput = document.getElementById('iemail');
const passwordInput = document.getElementById('ipassword');
const confirmPasswordInput = document.getElementById('iconfirmpassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const successMessage = document.getElementById('successMessage');

function register (email, password, name){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!isEmailNotInUse(email)) {
        return;
    }
    users.push({name: name, email: email, password: password});
    localStorage.setItem('users', JSON.stringify(users));
    if(successMessage) {
        successMessage.style.color = '#5fb35f';
        successMessage.textContent = 'Usuário registrado com sucesso!';
    }
    setTimeout(() => {
        window.location.href = '../login/index.html';
    }, 1500);
}

registerform.addEventListener('submit', function(e) {
    e.preventDefault();
    if(nameError) nameError.textContent = '';
    if(emailError) emailError.textContent = '';
    if(passwordError) passwordError.textContent = '';
    if(confirmPasswordError) confirmPasswordError.textContent = '';
    if(successMessage) successMessage.textContent = '';

    let ok = true;

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const name = nameInput.value;

    if(!confirmPassword){
        if(confirmPasswordError) confirmPasswordError.textContent = 'O campo de confirmar senha é obrigatório!';
        ok = false;
    }

    if(isNameFilled(name) && isEmailFilled(email) && isEmailValid(email) && isPasswordFilled(password) && doPasswordsMatch(password, confirmPassword)) {
        try {
            register(email, password, name);
            
        }
        catch(e) {
            console.error('erro ao register usuário: ', e);
            if(successMessage) {
                successMessage.textContent = 'Erro ao salvar os dados. Verifique o console.';
                successMessage.style.color = 'red';
            }
        }
    }
});