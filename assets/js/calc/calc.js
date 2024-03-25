document.addEventListener('DOMContentLoaded', function () {
    // Verificar se o usuário está logado
    const userDataJSON = localStorage.getItem('userData');
    if (!userDataJSON) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'pagina_de_login.html'; // Redirecionar para a página de login
    }

    const userData = JSON.parse(userDataJSON);
    let transacoes = localStorage.getItem('transacoes');
    transacoes = transacoes ? JSON.parse(transacoes) : [];

    const saldoElement = document.getElementById('saldo');
    const historicoElement = document.getElementById('historico');
    const operacoesForm = document.getElementById('operacoes');
    const valorInput = document.getElementById('valor');
    const descricaoInput = document.getElementById('descricao'); // Novo campo de descrição
    const inserirButton = document.getElementById('inserir'); // Botão de inserir
    const limparHistoricoButton = document.getElementById('limparHistorico'); // Novo botão para limpar histórico
    const logoutButton = document.getElementById('logout'); // Botão de logout
    let saldo = 0;

    // Recuperar saldo inicial
    saldo = parseFloat(localStorage.getItem('saldo')) || 0;
    saldoElement.textContent = 'R$ ' + formatarValor(saldo);

    // Exibir histórico inicial
    renderizarHistorico(transacoes);

    // Função para atualizar o saldo e o histórico
    function atualizarSaldo(valor, operacao, descricao) {
        if (operacao === 'depositar') {
            saldo += valor;
            transacoes.push({ tipo: 'Depósito', valor: valor, descricao: descricao }); // Adicionando a descrição
        } else if (operacao === 'resgatar') {
            if (saldo >= valor) {
                saldo -= valor;
                transacoes.push({ tipo: 'Resgate', valor: valor, descricao: descricao }); // Adicionando a descrição
            } else {
                alert('Saldo insuficiente.');
                return;
            }
        }

        saldoElement.textContent = 'R$ ' + formatarValor(saldo);
        localStorage.setItem('saldo', saldo); // Salvar saldo no localStorage
        localStorage.setItem('transacoes', JSON.stringify(transacoes)); // Salvar transações no localStorage
        valorInput.value = ''; // Limpar campo de valor
        descricaoInput.value = ''; // Limpar campo de descrição
        renderizarHistorico(transacoes); // Atualizar histórico na interface do usuário
    }

    // Adicionar evento de clique para inserir transação
    inserirButton.addEventListener('click', function (event) {
        event.preventDefault();
        const valor = parseFloat(valorInput.value);
        const descricao = descricaoInput.value; // Obter descrição do campo
        const operacao = document.getElementById('operacao').value; // Obter operação do campo de seleção

        if (isNaN(valor) || valor <= 0 || !descricao) { // Verificar se o valor e a descrição estão preenchidos
            alert('Por favor, insira um valor e uma descrição válidos.');
            return;
        }
        atualizarSaldo(valor, operacao, descricao);
    });

    // Adicionar evento de clique para limpar o histórico
    limparHistoricoButton.addEventListener('click', function () {
        if (confirm('Tem certeza de que deseja limpar o histórico? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('saldo');
            localStorage.removeItem('transacoes');
            saldo = 0;
            saldoElement.textContent = 'R$ ' + formatarValor(saldo);
            historicoElement.innerHTML = ''; // Limpar histórico na interface do usuário
        }
    });

    // Adicionar evento de clique para o logout
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('userData'); // Remover dados de autenticação do usuário
        window.location.href = 'http://127.0.0.1:5500/pages/login.html'; // Redirecionar para a página de login
    });


    // Adicionar evento de clique para os filtros
    // Adicionar evento de clique para os filtros
    const todosFilter = document.getElementById('todosFilter');
    const depositarFilter = document.getElementById('depositarFilter');
    const resgatarFilter = document.getElementById('resgatarFilter');

    todosFilter.addEventListener('click', function() {
        renderizarHistorico(transacoes);
        todosFilter.classList.add('selecionado');
        depositarFilter.classList.remove('selecionado');
        resgatarFilter.classList.remove('selecionado');
    });

    depositarFilter.addEventListener('click', function() {
        const transacoesDeposito = transacoes.filter(transacao => transacao.tipo === 'Depósito');
        renderizarHistorico(transacoesDeposito);
        todosFilter.classList.remove('selecionado');
        depositarFilter.classList.add('selecionado');
        resgatarFilter.classList.remove('selecionado');
    });

    resgatarFilter.addEventListener('click', function() {
        const transacoesResgate = transacoes.filter(transacao => transacao.tipo === 'Resgate');
        renderizarHistorico(transacoesResgate);
        todosFilter.classList.remove('selecionado');
        depositarFilter.classList.remove('selecionado');
        resgatarFilter.classList.add('selecionado');
    });

    // Função para renderizar o histórico na interface do usuário
    function renderizarHistorico(transacoes) {
        const historicoContainer = document.getElementById('historico');
        historicoContainer.innerHTML = '';

        transacoes.forEach(function (transacao) {
            const card = document.createElement('div');
            card.classList.add('card');

            // Adiciona classe específica para tipo de transação
            card.classList.add(transacao.tipo === 'Depósito' ? 'deposito' : 'resgate');

            const tipo = document.createElement('h3');
            tipo.textContent = transacao.tipo;
            card.appendChild(tipo);

            const valor = document.createElement('p');
            valor.textContent = 'Valor: R$ ' + formatarValor(transacao.valor);
            card.appendChild(valor);

            const descricao = document.createElement('p');
            descricao.textContent = 'Descrição: ' + transacao.descricao;
            card.appendChild(descricao);

            historicoContainer.appendChild(card);
        });
    }

     // Função para formatar o valor para o formato desejado
     function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
});
