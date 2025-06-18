function registerLog(action) {
    const name = username;
    const dateISO = new Date().toISOString(); 
    const newLog = {
        name: name,
        action: action,
        timestamp: dateISO
    };
    const currentLogs = JSON.parse(localStorage.getItem('auditLogs')) || [];
    currentLogs.unshift(newLog);
    localStorage.setItem('auditLogs', JSON.stringify(currentLogs));
    console.log("Log registrado:", newLog); 
}

let logCurrentPage = 1;
let logItemsPerPage = 25;

let logSortKey = 'date';      
let logSortDirection = 'desc';

function renderTableLog(filter){
    const logs = filter || JSON.parse(localStorage.getItem('auditLogs')) || [];
    console.log(logs.length)
    if (logSortKey) {
        logs.sort((a, b) => {
            const comparator = String(a[logSortKey]).localeCompare(String(b[logSortKey]));

            return logSortDirection === 'asc' ? comparator : -comparator;
        });
    }
    const totalPages = Math.ceil(logs.length / logItemsPerPage);
    const initialIndex = (logCurrentPage - 1) * logItemsPerPage;
    const finalIndex = initialIndex + logItemsPerPage;
    const pageLogs = logs.slice(initialIndex, finalIndex);

    logLenght = logs.length;

    const tbody = document.getElementById('log_table_body');
    tbody.innerHTML = '';
    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Nenhum log encontrado.</td></tr>`;
        return;
    }
    pageLogs.forEach(log => {
        const dataFormatada = new Date(log.timestamp).toLocaleString('pt-BR', {
            dateStyle: 'short', 
            timeStyle: 'medium'
        });
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>${log.name}</td>
            <td>${log.action}</td>
            <td>${dataFormatada}</td>
        `;
        
        tbody.appendChild(linha);
    });
    renderControlPage(totalPages, filter);
}
function renderControlPage(totalPages, filter) {
    const container = document.getElementById('log_page_control');
    if (!container) return;
    container.innerHTML = '';
    if (totalPages <= 1) return; 
    for (let i = 1; i <= totalPages; i++) {
        const btnPage = document.createElement('button');
        btnPage.innerText = i;
        btnPage.className = (i === logCurrentPage) ? 'active' : ''; // Marca o botão da página ativa
        btnPage.addEventListener('click', () => {
            mudarPaginaLog(i, filter);
        });
        container.appendChild(btnPage);
    }
}
function mudarPaginaLog(novaPagina, filter) {
    logCurrentPage = novaPagina;
    renderTableLog(filter);
}
if (pathHTML.includes('log-report')){
    const logThead = document.querySelector('#log_table_body').parentElement.querySelector('thead');
    if (logThead) {
        logThead.addEventListener('click', (e) => {
            const th = e.target.closest('th');
            if (!th || !th.dataset.sortKey) return;

            const key = th.dataset.sortKey;

            if (logSortKey === key) {
                logSortDirection = logSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                logSortKey = key;
                logSortDirection = 'desc'; 
            }
            logCurrentPage = 1;
            logThead.querySelectorAll('th').forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });
            th.classList.add(`sorted-${logSortDirection}`);
            renderTableLog();
        });
    }
}