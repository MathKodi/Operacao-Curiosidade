let currentPage = 1;
let itemsPerPage = 8;
let sortKey = null;   
let sortDirection = 'asc';

function renderTable(options = {}) {
    const { filter, withActions } = options;
    const clients =  filter || JSON.parse(localStorage.getItem('clients')) || [];

    if (sortKey) {
        clients.sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            
            if (typeof valA === 'undefined' || typeof valB === 'undefined') {
                alert(`Erro de ordenação: a propriedade '${sortKey}' não foi encontrada.`);
                return 0;
            }

            let comparator = 0;
            if (typeof valA === 'string') {
                comparator = valA.localeCompare(valB, 'pt-BR', { sensitivity: 'base' });
            } else {
                comparator = (valA || 0) > (valB || 0) ? 1 : -1;
            }
            return sortDirection === 'asc' ? comparator : -comparator;
        });
    }

    const totalPages = Math.ceil(clients.length / itemsPerPage);
    const initialIndex = (currentPage - 1) * itemsPerPage;
    const finalIndex = initialIndex + itemsPerPage;
    const clientPage = clients.slice(initialIndex, finalIndex);
    const tbody = document.getElementById('table_body');
    
    if (!tbody) {
        alert("Elemento 'table_body' não encontrado no DOM.");
        return;
    }
    tbody.innerHTML = '';

    renderControlPage(totalPages, options);

    if (clientPage.length === 0) {
        const columns = withActions ? 4 : 3;
        const emptyLine = document.createElement('tr');
        emptyLine.innerHTML = `<td colspan="${columns}" style="text-align: center;">Nenhum cliente encontrado.</td>`;
        tbody.appendChild(emptyLine);
        return;
    }

    clientPage.forEach(client => {
        const line = document.createElement('tr');
        const textStatus = client.active ? 'Ativo' : 'Inativo';
        const classStatus = client.active ? 'status-active' : 'status-inactive';
        line.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td class="${classStatus}">${textStatus}</td>
        `;
        if(withActions){
            line.innerHTML += `
                <td class="actions">
                    <button class="btn_action btn_edit" data-id="${client.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn_action btn_delete" data-id="${client.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
        }
        tbody.appendChild(line);
    });
}

function renderControlPage(totalPages, options) {
    const container = document.getElementById('page_control');
    if (!container) return;
    container.innerHTML = '';

    if (totalPages <= 1) {
        return; 
    }

    for (let i = 1; i <= totalPages; i++) {
        const btnPage = document.createElement('button');
        btnPage.innerText = i;
        btnPage.className = (i === currentPage) ? 'active' : '';
        btnPage.addEventListener('click', () => {
            changePage(i, options);
        });
        container.appendChild(btnPage);
    }
}

function changePage(newPage, options) {
    currentPage = newPage;
    renderTable(options);
}

const thead = document.querySelector('table thead');
if (thead) {
    thead.addEventListener('click', (e) => {
        const th = e.target.closest('th');
        if (!th || !th.dataset.sortKey) return; 
        const key = th.dataset.sortKey;
        if (sortKey === key) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey = key;
            sortDirection = 'asc';
        }

        currentPage = 1;
        
        document.querySelectorAll('table thead th').forEach(h => {
            h.classList.remove('sorted-asc', 'sorted-desc');
        });
        th.classList.add(`sorted-${sortDirection}`);
        const withActions = !!document.querySelector('.actions_column');
        renderTable({ withActions: withActions });
    });
}
// function p botão da tabela
const tbody = document.getElementById('table_body');
tbody.addEventListener('click', function(e) {
    const target = e.target;
    const actionButton = target.closest('.btn_action');
    if (actionButton) {
        const id = parseInt(actionButton.getAttribute('data-id'));
        if (actionButton.classList.contains('btn_edit')){
            completeForms(id)
        }
        if (actionButton.classList.contains('btn_delete')) {
            deleteClient(id)
        }
    }
});