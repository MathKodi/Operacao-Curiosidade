if (!userData || typeof userData.email === 'undefined') {
    alert('Erro de autenticação: email de usuário não encontrado. Retornando para página de login...');
    deleteCookie('userInfo');
    window.location.href = '../login/index.html'; 
}

const loggedUserEmail = userData.email;
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = users.find(user => user.email === loggedUserEmail);

if (!currentUser) {
    alert('Dados do usuário não encontrado.');
    deleteCookie('userInfo');
    window.location.href = '../login/index.html';
}

const profileForm = document.getElementById('profile-form');
const passwordForm = document.getElementById('password-form');
const deleteBtn = document.getElementById('delete-account-btn');
const nameInput = document.getElementById('iname');
const emailInput = document.getElementById('iemail');
const profileError = document.getElementById('profileError');
const passwordError = document.getElementById('passwordError');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

const passwordInput = document.getElementById('ipassword');

nameInput.value = currentUser.name;
emailInput.value = currentUser.email;

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (profileError) profileError.textContent = '';
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent ='';

    const newName = nameInput.value.trim();
    const newEmail = emailInput.value.trim();

    if (validateName(newName) && isEmailValid(newEmail)) {
        const emailInUse = users.some(user => user.email === newEmail && user.email !== loggedUserEmail);
        if (emailInUse) {
            profileError.textContent = 'Email inválido, utilize outro.';
            return;
        }
        const userIndex = users.findIndex(user => user.email === loggedUserEmail);
        if (userIndex === -1) {
            profileError.textContent = "Usuário não encontrado para fazer a atualização.";
            return;
        }
        users[userIndex].name = newName;
        users[userIndex].email = newEmail;
        
        localStorage.setItem('users', JSON.stringify(users));
        
        deleteCookie('userInfo');
        setCookie(newName, newEmail);
        
        alert('Usuário atualizado com sucesso!');
        window.location.reload(); 
    }
});

passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(passwordError) passwordError.textContent = ''

    password = passwordInput.value
    const newPassword = document.getElementById('new-password').value;

    if (password !== currentUser.password) {
        if(passwordError) passwordError.textContent = 'Senha atual incorreta.';
        return;
    }

    if(validatePassword(newPassword)){
        const userIndex = users.findIndex(user => user.email === loggedUserEmail);
        if (userIndex === -1) {
            profileError.textContent = "Usuário não encontrado para fazer a atualização.";
            return;
        }
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Senha atualizada com sucesso!');
        passwordForm.reset();
    }
});

deleteBtn.addEventListener('click', () => {
    if (confirm('Você tem certeza que deseja excluir sua conta? Essa ação é permanente.')) {
        const updatedUsers = users.filter(user => user.email !== loggedUserEmail);
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        alert('Conta deletada com sucesso.');
        deleteCookie('userInfo');
        window.location.href = '../login/index.html';
    }
});