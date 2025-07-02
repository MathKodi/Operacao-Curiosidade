const btnPrint = document.getElementById('btn_print')

if(btnPrint){
    btnPrint.addEventListener('click', function() {
            if (pathHTML.includes('log-report.html')){
                
                logCurrentPage = 1;
                logItemsPerPage = 50000000;
                renderTableLog()
            }
            if (pathHTML.includes('client-report.html')){
                currentPage = 1;
                itemsPerPage = 50000000;
                renderTable({withActions: false})
            }
            window.print();
            if (pathHTML.includes('log-report.html')){
                logItemsPerPage = 25;
                renderTableLog()
            }
            if (pathHTML.includes('client-report.html')){
                itemsPerPage = 8;
                renderTable({withActions: false})
            }
    });

}