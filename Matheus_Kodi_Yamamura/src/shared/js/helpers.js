function isEmailValid(email){
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if(!emailRegex.test(email)){
        if(emailError) emailError.textContent = 'insira um email válido!';
        if(emailInput) emailInput.focus();
        return false;
    }
    return true;
}

function generateNewId(clients) {
    if (clients.length === 0) {
        return 1;
    }
    const highestId = Math.max(...clients.map(client => client.id));
    return highestId + 1;
}

function validateAge(age){
    if(age){
        if((age < 18) || (age > 100)){
            if (ageError) ageError.textContent = 'Insira uma idade válida!';
            ageInput.focus();
            return false;
        }
    }
    return true
}

function isEmailNotInUse(email){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        if(emailError) emailError.textContent = 'email já está sendo utilizado!';
        if(emailInput) emailInput.focus();
        return false;
    }
    return true
}
function isClientEmailAvailable(options){
    const { email, edit} = options;
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    if(edit){
        if(clients.find(client => client.email === email && client.id !== editId)){
            emailError.textContent = 'E-MAIL INVÁLIDO, INSIRA OUTRO';
            emailInput.focus();
            return false; 
        }
        return true
    } else{
        if(clients.find(client => client.email === email)){
            emailError.textContent = 'E-MAIL INVÁLIDO, INSIRA OUTRO';
            emailInput.focus();
            return false; 
        }
        return true
    }
}

function isEmailFilled(email) {
    if(!email){
        if (emailError) emailError.textContent = 'O campo de email é obrigatório!';
        emailInput.focus();
        return false;
    }
    return true
}

function isNameFilled(name){
    if(!name){
        if(nameError) nameError.textContent = 'O campo de nome é obrigatório!';
        nameInput.focus();
        return false;
    }
    return true;
}

function isPasswordFilled(password){
    if(!password){
        if(passwordError) passwordError.textContent = 'O campo de senha é obrigatório!';
        passwordInput.focus();
        return false;
    }
    return true;
}

function doPasswordsMatch(password, confirmPassword){
    if(password !== confirmPassword){
        if(confirmPasswordError) confirmPasswordError.textContent = 'As senhas não coincidem!';
        return false;
    }
    return true;
}