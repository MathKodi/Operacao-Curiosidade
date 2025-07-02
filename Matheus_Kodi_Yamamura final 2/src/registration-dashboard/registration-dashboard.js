let editId = null;

function completeForms(id) { 
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients.find(u => u.id === id);

    if (client) {
        checkboxInput.checked = client.active;
        nameInput.value = client.name;
        ageInput.value = client.age || '';
        emailInput.value = client.email; 
        addressInput.value = client.address || '';
        infoInput.value = client.info || '';
        interestsInput.value = client.interests || '';
        feelingsInput.value = client.feelings || '';
        valuesInput.value = client.values || '';

        document.querySelector('#modal-register .modal_title').textContent = 'Editar Cadastro';
        document.getElementById('btn_save').textContent = 'ATUALIZAR';
        
        editId = id;
        
        modalRegister.showModal();
    }
}

function updateClient(id, updateData) { 
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    const updatedClients = clients.map(client => {
        if (client.id === id) {
            return { ...client, ...updateData }; 
        }
        return client;
    });
    const updatedClient = clients.find(client => client.id === id);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    registerLog(`Atualizou o cliente ${updatedClient.name} (email: ${updatedClient.email})`)
}

function deleteClient(id) { 
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    const deletedClient = clients.find(client => client.id === id);
    if (confirm(`Tem certeza que deseja apagar o usuário ${deletedClient.name}?`)) {
        const updatedClients = clients.filter(client => client.id !== id);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
        renderTable({withActions: true})
    }
    registerLog(`Deletou o cliente ${deletedClient.name} (email: ${deletedClient.email})`)
}

//forms
const registerClientForm = document.getElementById('registerClient_form')
if(!registerClientForm){
    alert('formulario do cliente não encontrado')
}
const checkboxInput = document.getElementById('iactive');
const nameInput = document.getElementById('iname')
const ageInput = document.getElementById('iage')
const emailInput = document.getElementById('iemail')
const addressInput = document.getElementById('iaddress')
const infoInput = document.getElementById('iinfo')
const interestsInput = document.getElementById('iinterests')
const feelingsInput = document.getElementById('ifeelings')
const valuesInput = document.getElementById('ivalues')

const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const ageError = document.getElementById('ageError')

registerClientForm.addEventListener('submit', function(e) {
    e.preventDefault()
    if(nameError) nameError.textContent = '';
    if(emailError) emailError.textContent = '';
    if(ageError) ageError.textContent = '';

    const name = nameInput.value;
    const email = emailInput.value;
    const address = addressInput.value; 
    const info = infoInput.value;
    const age = ageInput.value;
    const values = valuesInput.value;
    const interests = interestsInput.value;
    const feelings = feelingsInput.value;
    const active = checkboxInput.checked;

    if(validateName(name) && isEmailValid(email) && validateAge(age)){
        try {
            const formsData = { name, email, active, age, address, info, interests, feelings, values };
            if(editId){
                if(!isClientEmailAvailable({email, edit: true})){
                    return; 
                }
                updateClient(editId, formsData)
            } else{
                //registrar
                let clients = JSON.parse(localStorage.getItem('clients')) || [];
                if(!isClientEmailAvailable({email, edit: false})){
                    return
                }
                const newId = generateNewId(clients);
                clients.unshift({ id: newId, ...formsData, date: new Date() });
                localStorage.setItem('clients', JSON.stringify(clients));
                registerLog(`Registrou novo cliente ${formsData.name}`)
            }
            
            registerClientForm.reset()
            modalRegister.close();
            renderTable({withActions: true});

        } catch (error) {
            alert('erro no registro: ', error)
        }
    }
})
