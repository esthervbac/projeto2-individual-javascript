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
    
    const adicionarTransacoesReais = ({ valor, nome, id, opcao }) => {
        const operador = valor < 0 ? '-' : '+'
        const cssClass = valor < 0 ? 'sinalmenos' : 'sinalmais'
        const transacoesDeMercadorias = valor < 0 ? '#compra' : '#venda'
        const valorSemOperador = Math.abs(valor)
        const li = document.createElement('li')

        li.classList.add(cssClass)
        li.innerHTML = `
        <hr class="hrspan"></hr>
        <span class="operadores">${operador}</span>
        <span class="linha1-texto-merc" id="mercad1">${nome}</span>
        <span class="linha1-texto-val" id="valor1"> R$ ${valorSemOperador}</span>
        `
        linha1Ul.append(li)

    }

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
        .toFixed(2)

    const atualizarValoresTotais = () => {
        const valoresDeTransacoes = transacoes.map(({ valor }) => valor)
        const total = pegueTotal(valoresDeTransacoes)
        const vendas  = pegueVendas(valoresDeTransacoes)
        const compras = pegueCompras(valoresDeTransacoes)
        
        totalAtualizado.textContent = `R$ ${total}`

        if (total > 0) {
            lucroPrejuizo.textContent = `[LUCRO]` 
        } else {
            lucroPrejuizo.textContent = `[PREJUÍZO]`  
        }
    }

    const inicio = () => {
        linha1Ul.innerHTML = ''
        transacoes.forEach(adicionarTransacoesReais)
        atualizarValoresTotais()
    }

    inicio()

    const atualizarLocalStorage = () => {
        localStorage.setItem('transacoes', JSON.stringify(transacoes))
    }

    const gerarID = () => Math.round(Math.random() * 1000)

    const adicionarArrayNasTransacoes = (transacaoOpcoes, transacaoNomeMercadoria, transacaoValorMercadoria) => {
        transacoes.push({ 
            id: gerarID(), 
            opcao: transacaoOpcoes, 
            nome: transacaoNomeMercadoria, 
            valor: Number(transacaoValorMercadoria) 
        })
    }

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
        const algumInputVazio = transacaoOpcaoVenda === '' || transacaoOpcaoCompra === '' || transacaoNomeMercadoria === '' || transacaoValorMercadoria === ''

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