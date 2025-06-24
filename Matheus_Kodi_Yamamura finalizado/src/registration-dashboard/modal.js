const openButtons = document.querySelectorAll('.open_modal')
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal')
        const modal = document.getElementById(modalId)
        
        modal.showModal();

    })
})
const closeButtons = document.querySelectorAll('.close_modal')
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal')
        const modal = document.getElementById(modalId)
        modal.close();

    })
})
const modalRegister = document.getElementById('modal-register'); 
modalRegister.addEventListener('close', () => {
    document.querySelector('#modal-register .modal_title').textContent = 'Novo Cadastro';
    document.getElementById('btn_save').textContent = 'GRAVAR';
    registerClientForm.reset();
    if(nameError) nameError.textContent = '';
    if(emailError) emailError.textContent = '';
    if(ageError) ageError.textContent = '';
    editId = null; 
});