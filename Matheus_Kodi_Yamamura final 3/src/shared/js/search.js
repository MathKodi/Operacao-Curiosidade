const searchInput = document.getElementById('search');
const pathHTML = window.location.pathname;
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const word = searchInput.value.toLowerCase();
        
        currentPage = 1;
        if (pathHTML.includes('registration-dashboard.html')) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const filterClients = clients.filter(client => {
                return client.name.toLowerCase().includes(word) || 
                        client.email.toLowerCase().includes(word);
            });
            renderTable({ filter: filterClients, withActions: true });

        } else if (pathHTML.includes('log-report.html')) { 
            const logs = JSON.parse(localStorage.getItem('auditLogs')) || [];
            const filteredLogs = logs.filter(log => {
                return log.name.toLowerCase().includes(word) ||
                       log.action.toLowerCase().includes(word) ||
                       log.timestamp.toLowerCase().includes(word);
            });
            renderTableLog(filteredLogs);
        } else {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const filterClients = clients.filter(client => {
                return client.name.toLowerCase().includes(word) || 
                        client.email.toLowerCase().includes(word);
            });
            renderTable({ filter: filterClients, withActions: false });
        }
    });
}
