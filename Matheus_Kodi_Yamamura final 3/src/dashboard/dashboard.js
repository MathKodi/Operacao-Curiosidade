function dashboard(){
    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    const totalSpan = document.getElementById('total_database');
    const monthSpan = document.getElementById('month_database');
    const pendingSpan = document.getElementById('pending_database');

    let totalclients = clients.length;
    if(!totalclients){
        totalclients = '0';
    }
    totalSpan.textContent = totalclients;

    const pendingclients = clients.filter(client => client.active === false).length;
    pendingSpan.textContent = pendingclients;

    const today = new Date();
    const yearNow = today.getFullYear();
    const monthNow = today.getMonth();
    const monthClients = clients.filter(client => {
        const date = new Date(client.date);
        return date.getFullYear() === yearNow && date.getMonth() === monthNow;
    }).length;
    monthSpan.textContent = monthClients;
}

dashboard();