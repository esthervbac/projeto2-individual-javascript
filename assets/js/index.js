    const linha1Ul = document.querySelector('#linha1')
    const vendasAtualizadas = document.querySelector('#teste')
    const comprasAtualizadas = document.querySelector('#teste')
    const totalAtualizado = document.querySelector('#total')
    const lucroPrejuizo = document.querySelector('#lucro')
    const formulario = document.querySelector('#form')
    const selecaoOpcoes = document.querySelector('#trans')
    const opcaoVenda = document.querySelector('#venda')
    const opcaoCompra = document.querySelector('#compra')
    const nomeMercadoriaInput = document.querySelector('#nome-merc')
    const valorInput = document.querySelector('#valor')

	// Pega as transações adicionadas no localStorage e se for diferente de nulo adiciona na variável localStorageTransacoes
   
    const localStorageTransacoes = JSON.parse(localStorage
        .getItem('transacoes'))
    let transacoes = localStorage
        .getItem('transacoes') !== null ? localStorageTransacoes : []
    
    const removerTransacoes = ID => {
        transacoes = transacoes.filter(transacao => 
            id !== ID)
        atualizarLocalStorage()
        inicio()
    }
    
	// Adiciona as transações de mercadorias adicionadas pelo usuário e monta a li com a tabela da área extrato
    const adicionarTransacoesReais = ({ valor, nome, id }) => {
        const operador = valor < 0 ? '-' : '+'
        const cssClass = valor < 0 ? 'sinalmenos' : 'sinalmais'
    
        const opcoesSelecao = valor < 0 ? 'compra' : 'venda'
        const valorSemOperador = Math.abs(valor).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          })

        const li = document.createElement('li')
        li.classList.add(cssClass)
        li.classList.add(opcoesSelecao)
        li.innerHTML = `
        <hr class="hrspan"></hr>
        <span class="operadores" id="operadores">${operador}</span>
        <span class="linha1-texto-merc" id="mercad1">${nome}</span>
        <span class="linha1-texto-val" id="valor1"> ${valorSemOperador}</span>
        `
        linha1Ul.append(li)
    }  
   
	// Soma e diminui os valores adicionados pelo usuário na área de extrato
    const pegueCompras = valoresDeTransacoes => Math.abs(valoresDeTransacoes
        .filter(valor => valor < 0)
        .reduce((acumulador, valor) => acumulador + valor, 0))
        .toFixed(2)

    const pegueVendas = valoresDeTransacoes  => valoresDeTransacoes
        .filter(valor => valor > 0)
        .reduce((acumulador, valor) => acumulador + valor, 0)
        .toFixed(2)

    const pegueTotal = valoresDeTransacoes => valoresDeTransacoes
        .reduce((acumulador, transacao) => acumulador + transacao, 0)

	// Atualiza o valor total das transações e diz se o usuário teve lucro ou prejuízo  
    const atualizarValoresTotais = () => {
        const valoresDeTransacoes = transacoes.map(({ valor }) => valor)
        console.log(valoresDeTransacoes)
        const total = pegueTotal(valoresDeTransacoes)
        const totalFinal = formatarValorParaUsuario(total)
       
    /*  Se precisar jogar valores de Compras e Vendas
        const vendas  = pegueVendas(valoresDeTransacoes)
        const compras = pegueCompras(valoresDeTransacoes) 
        */ 
       
        totalAtualizado.textContent = totalFinal

        if (total > 0) {
            lucroPrejuizo.textContent = '[LUCRO]';
            lucroPrejuizo.style.color = "green";
            lucroPrejuizo.style.color.fontWeight = "bold";
            lucroPrejuizo.style.color.fontSize = "10px";
        } else {
            lucroPrejuizo.textContent = '[PREJUÍZO]';
            lucroPrejuizo.style.color = "red";
            lucroPrejuizo.style.color.fontWeight = "bold";
            lucroPrejuizo.style.color.fontSize = "10px";
        }
    }
	
	// Formata em estilo de moeda o valor enviado do localStorage para ser mostrado ao usuário na área de extrato
    function formatarValorParaUsuario(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
	
	// Cria cada linha de mercadorias adicionadas pelo usuário de atualiza os valores totais
    const inicio = () => {
        linha1Ul.innerHTML = ''
        transacoes.forEach(adicionarTransacoesReais)
        atualizarValoresTotais()
    }

	// Atualiza o localStorage com os valores enviados pelo usuário
    inicio()

    const atualizarLocalStorage = () => {
        localStorage.setItem('transacoes', JSON.stringify(transacoes))
    }

	// Gera ID, e adiciona o nome da mercadoria e seu valor 
    const gerarID = () => Math.round(Math.random() * 1000)

    const adicionarArrayNasTransacoes = (transacaoOpcoes, transacaoNomeMercadoria, transacaoValorMercadoria) => {
        transacoes.push({ 
            id: gerarID(), 
            opcao: transacaoOpcoes, 
            nome: transacaoNomeMercadoria, 
            valor: formatarValorRealParaMaquina(transacaoValorMercadoria) 
        })
    }
    const transacaoNomeMercadoria = nomeMercadoriaInput.value.trim()
    const transacaoValorMercadoria = valorInput.value.trim()
    const limparInputs = () => {
        transacaoNomeMercadoria.value =  ''
        transacaoValorMercadoria.value =  ''
    }

    const lidarComFormEnviar = event => {
        event.preventDefault()

        const transacaoOpcaoVenda = opcaoVenda.value.trim() 
        const transacaoOpcaoCompra = opcaoCompra.value.trim() 
        const transacaoOpcoes = opcaoVenda.value.trim() || opcaoCompra.value.trim() 
        const transacaoNomeMercadoria = nomeMercadoriaInput.value.trim()
        const transacaoValorMercadoria = valorInput.value.trim()
        const algumInputVazio = transacaoOpcaoVenda === '' || 
        transacaoOpcaoCompra === '' || 
        transacaoNomeMercadoria === '' || 
        transacaoValorMercadoria === ''

	// Verifica se algum campo está vazio, se estiver diz para usuário preencher
        if (algumInputVazio) {
            alert('Por favor preencha todos os campos abaixo')
            return
        }

        adicionarArrayNasTransacoes(transacaoOpcoes, transacaoNomeMercadoria, transacaoValorMercadoria)
        inicio()
        atualizarLocalStorage()
        limparInputs()
    }

    formulario.addEventListener('submit', lidarComFormEnviar) 

   // Fazer divs de Nenhuma Transação Cadastrada e LucroPrejuízo aparecerem e desaparecerem nos momentos corretos
    const botao = document.querySelector('#enviar');
    const divNadaCadastrado = document.querySelector('#semtrans');
    const divLucroPrejuizo = document.querySelector('#lucro');

    botao.onclick = function() {
        divNadaCadastrado.setAttribute('class', 'esconder');
        divLucroPrejuizo.setAttribute('class', 'aparecer');
    }

      const divOperadores = document.querySelector('#operadores');
      const divMercadoria = document.querySelector('#mercad1');
      const divValor = document.querySelector('#valor1');

      if (divOperadores && divMercadoria && divValor !== '' ) {
        document.getElementById("semtrans").style.display = "none";
        document.getElementById("lucro").style.display = "block";
      }  


    // Ao clicar no menu 'Limpar Dados' todos os dados do extrato são apagados 
    function acaoLimpar() {
        decisao = confirm('Deseja realmente limpar os dados?')
    
        if (decisao) {
            localStorage.clear();
            limparAutoComplete();
        }
        else
            return false;
    }

	// Verifica se apenas números podem ser inseridos nos inputs, não deixa letras serem adicionadas
    function testaCampoValor(e) {
        e.preventDefault()
    
        if ((/[0-9 -,]/g).test(e.key)) {
            e.target.value += e.key
        }
    } 
		
	// Formata em estilo de moeda o valor adicionado pelo usuário enquanto ele digita
    function formatarMoeda(e) {

        let valor = valorInput.value
    
        valor = valor + '';
        valor = valor.replace(/[\D]+/g, '');
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1"); 
        valor = valor.replace (/\B(?=(\d{3})+(?!\d))/g, ".")

        valorInput.value = valor
    }

	// Formata para valores sem virgulas quando valor é enviado para o localStorage
    function formatarValorRealParaMaquina(valor) {
        return parseFloat(valor.toString().replace('.', '').replace(',', '.'));
    }