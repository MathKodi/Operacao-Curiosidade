(function initializeData() {
    'use strict';
    const mockUsers = [
        {
            name: 'Kodi',
            email: 'kodi@email.com',
            password: 'kodikodi'
        },
        {
            name: 'Matheus',
            email: 'matheus@email.com',
            password: 'matheus'
        }
    ];

    const mockClients = [
        { id: 1, name: 'Ana Carolina Souza', email: 'ana.souza@email.com', active: true, age: '28', address: 'Rua das Flores, 123, São Paulo, SP', info: 'Desenvolvedora de Software na TechCorp.', interests: 'Inteligência Artificial, computação em nuvem, fotografia.', feelings: 'Motivada com novos projetos, buscando inovação.', values: 'Aprendizado contínuo, colaboração.', date: new Date('2025-06-15T10:00:00Z').toISOString() },
        { id: 2, name: 'Bruno Lima', email: 'bruno.lima@email.com', active: true, age: '35', address: 'Avenida Copacabana, 456, Rio de Janeiro, RJ', info: 'Designer Gráfico e Diretor de Arte.', interests: 'Tipografia, branding, cinema independente.', feelings: 'Criativamente realizado, mas em busca de equilíbrio.', values: 'Originalidade, estética e impacto visual.', date: new Date('2025-06-12T14:30:00Z').toISOString() },
        { id: 3, name: 'Carla Martins', email: 'carla.m@email.com', active: false, age: '42', address: 'Praça da Liberdade, 789, Belo Horizonte, MG', info: 'Gerente de projetos aposentada.', interests: 'Jardinagem, viagens, voluntariado.', feelings: 'Tranquila, aproveitando a nova fase.', values: 'Família, tranquilidade, natureza.', date: new Date('2025-05-20T09:15:00Z').toISOString() },
        { id: 4, name: 'Diego Fernandes', email: 'diego.f@email.com', active: true, age: '21', address: 'Rua dos Estudantes, 101, Curitiba, PR', info: 'Estudante de Engenharia da Computação.', interests: 'Desenvolvimento de jogos, robótica, competições de programação.', feelings: 'Ansioso com os exames finais, mas animado com o estágio.', values: 'Conhecimento, superação de desafios.', date: new Date('2025-06-17T08:00:00Z').toISOString() },
        { id: 5, name: 'Elena Ribeiro', email: 'elena.r@email.com', active: true, age: '55', address: 'Quadra 102, Bloco C, Brasília, DF', info: 'Servidora Pública Federal.', interests: '', feelings: '', values: 'Serviço público, ética, estabilidade.', date: new Date('2025-04-10T11:00:00Z').toISOString() },
        { id: 6, name: 'Fábio Costa', email: 'fabio.costa@email.com', active: false, age: '31', address: 'Rua da Moeda, 321, Recife, PE', info: 'Músico e produtor cultural.', interests: 'Música popular brasileira, produção de áudio, história da arte.', feelings: 'Inspirado para compor novo material.', values: 'Arte, expressão cultural, originalidade.', date: new Date('2025-06-01T18:45:00Z').toISOString() },
        { id: 7, name: 'Gabriela Pereira', email: 'gabriela.p@email.com', active: true, age: '29', address: 'Avenida Paulista, 1500, São Paulo, SP', info: 'Consultora de TI especializada em cibersegurança.', interests: 'Segurança da informação, hacking ético.', feelings: 'Focada em obter uma nova certificação profissional.', values: 'Integridade, precisão.', date: new Date('2025-06-16T11:20:00Z').toISOString() },
        { id: 8, name: 'Heitor Almeida', email: 'heitor.a@email.com', active: true, age: '68', address: 'Rua da Consolação, 2000, São Paulo, SP', info: 'Engenheiro civil aposentado, agora investidor.', interests: 'Mercado de ações, leitura de biografias.', feelings: 'Satisfeito com as escolhas de vida.', values: 'Disciplina, planejamento.', date: new Date('2025-03-22T15:00:00Z').toISOString() },
        { id: 9, name: 'Isabela Rocha', email: 'isabela.r@email.com', active: false, age: '20', address: 'Alameda Santos, 50, Salvador, BA', info: 'Estudante de Marketing.', interests: 'Mídias sociais, marketing de influência.', feelings: 'Explorando novas oportunidades de carreira.', values: 'Criatividade, comunicação.', date: new Date('2025-06-10T13:10:00Z').toISOString() },
        { id: 10, name: 'João Vitor Santos', email: 'joao.vitor@email.com', active: true, age: '45', address: 'Rodovia Anhanguera, km 30, Campinas, SP', info: 'Mecânico de automóveis, dono de oficina.', interests: 'Carros antigos, corridas de arrancada.', feelings: 'Orgulhoso do negócio que construiu.', values: 'Trabalho duro, honestidade.', date: new Date('2025-02-18T09:40:00Z').toISOString() },
        { id: 11, name: 'Karina Andrade', email: 'karina.a@email.com', active: true, age: '33', address: 'Rua Augusta, 900, São Paulo, SP', info: 'Advogada na área de direito empresarial.', interests: 'Debates, política, direito internacional.', feelings: 'Desafiada por um caso complexo.', values: 'Justiça, argumentação lógica.', date: new Date('2025-05-30T16:55:00Z').toISOString() },
        { id: 12, name: 'Lucas Moreira', email: 'lucas.m@email.com', active: true, age: '39', address: 'Rua Oscar Freire, 1100, São Paulo, SP', info: 'Arquiteto com foco em design sustentável.', interests: 'Arquitetura moderna, sustentabilidade, urbanismo.', feelings: 'Inspirado por um projeto premiado.', values: 'Inovação, responsabilidade ambiental.', date: new Date('2025-06-05T12:00:00Z').toISOString() },
        { id: 13, name: 'Mariana Gomes', email: 'mariana.g@email.com', active: false, age: '48', address: 'Avenida Boa Viagem, 3400, Recife, PE', info: 'Médica pediatra.', interests: 'Literatura infantil, yoga, meditação.', feelings: 'Buscando mais tempo para a família.', values: 'Cuidado, empatia.', date: new Date('2025-01-15T20:00:00Z').toISOString() },
        { id: 14, name: 'Nícolas Azevedo', email: 'nicolas.a@email.com', active: true, age: '26', address: 'Largo do Machado, 10, Rio de Janeiro, RJ', info: 'Jornalista investigativo.', interests: 'Política, documentários, podcasts.', feelings: 'Perto de descobrir uma grande história.', values: 'Verdade, imparcialidade.', date: new Date('2025-06-14T22:15:00Z').toISOString() },
        { id: 15, name: 'Olívia Dias', email: 'olivia.d@email.com', active: true, age: '30', address: 'Rua do Mucugê, 250, Arraial d\'Ajuda, BA', info: 'Chef de cozinha e proprietária de restaurante.', interests: 'Culinária regional, ingredientes orgânicos.', feelings: 'Feliz com o sucesso do novo prato do menu.', values: 'Sabor, qualidade, hospitalidade.', date: new Date('2025-04-25T19:30:00Z').toISOString() },
        { id: 16, name: 'Pedro Barbosa', email: 'pedro.b@email.com', active: true, age: '24', address: 'Vila Madalena, São Paulo, SP', info: 'Fotógrafo freelancer.', interests: 'Fotografia de rua, retratos, viagens.', feelings: 'Animado com uma exposição futura.', values: 'Perspectiva, momento.', date: new Date('2025-06-03T14:00:00Z').toISOString() },
        { id: 17, name: 'Rafaela Nogueira', email: 'rafaela.n@email.com', active: false, age: '27', address: 'Avenida Atlântica, 1700, Balneário Camboriú, SC', info: 'Personal trainer.', interests: 'Musculação, nutrição esportiva, maratonas.', feelings: 'Recuperando-se de uma lesão, mas otimista.', values: 'Disciplina, saúde, superação.', date: new Date('2025-03-01T07:00:00Z').toISOString() },
        { id: 18, name: 'Thiago Ferreira', email: 'thiago.f@email.com', active: true, age: '32', address: 'Rua da Lapa, 42, Rio de Janeiro, RJ', info: 'Músico, violonista de choro e samba.', interests: 'História da música brasileira, luthieria.', feelings: 'Compondo para o próximo álbum.', values: 'Tradição, melodia.', date: new Date('2025-05-05T23:50:00Z').toISOString() }
    ];

    function initializeUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.length === 0) {
            localStorage.setItem('users', JSON.stringify(mockUsers));
        }
    }

    function initializeClients() {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        if (clients.length === 0) {
            localStorage.setItem('clients', JSON.stringify(mockClients));
        }
    }

    function initializeAuditLogs() {
    const logs = JSON.parse(localStorage.getItem('auditLogs')) || [];

    if (logs.length === 0) {
        const mockLogs = [];
        
        const actionTypes = ['Registrou novo cliente', 'Atualizou o cliente'];
        const performingUsers = mockUsers.map(u => u.name);
        
        const logCount = mockClients.length * 2; 

        for (let i = 0; i < logCount; i++) {
            const randomClient = mockClients[Math.floor(Math.random() * mockClients.length)];
            const randomUser = performingUsers[Math.floor(Math.random() * performingUsers.length)];
            const randomAction = actionTypes[Math.floor(Math.random() * actionTypes.length)];

            const actionString = `${randomAction} ${randomClient.name} (email: ${randomClient.email})`;
            
            const logTimestamp = new Date();
            logTimestamp.setHours(logTimestamp.getHours() - (i * 3));

            mockLogs.push({
                name: randomUser,
                action: actionString,
                timestamp: logTimestamp.toISOString()
            });
        }

        localStorage.setItem('auditLogs', JSON.stringify(mockLogs));
    }
}
    initializeUsers();
    initializeClients();
    initializeAuditLogs();

})();