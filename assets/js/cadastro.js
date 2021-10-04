    var transacoesFalsas = [
        { id: 1, name: 'Bolo de Chocolate', valor: -20 },
        { id: 2, name: 'Salário', valor: 300 },
        { id: 3, name: 'Torta de Morango', valor: -10 },
        { id: 4, name: 'Violão', valor: 150 }
    ]
    
    var adicionarTransacoesReais = transacao => {
        var operador = transacao.valor < 0 ? '-' : '+'
        var cssClass = transacao.valor < 0 ? 'sinalmenos' : 'sinalmais'
        var div = document.createElement('div')

        div.classList.add(cssClass)
        div.innerHTML = ``
        console.log(div)

    /*<div class="sinalmenos">-</div>*/

    }

    adicionarTransacoesReais(transacoesFalsas[0])
    
    /* Script para apenas números em valores 
    
function testaValor(e) {
    e.preventDefault();

    var extratoTransacoes = localStorage.getItem('extrato')
    if (extratoTransacoes != null) {
        var extrato = JSON.parse(extratoTransacoes)
    } else {
        var extrato = [];
    }

    extrato.push()
}*/
    /*

    var valorMercadoria = /[^0-9 R$.,]+/g
        if (valorMercadoria.test(e.target.elements['valor'].value)) {
            alert('Apenas números são permitidos no campo valor!')
            return false
        }

    var extratoTransacoes = localStorage.getItem('extrato')
        if (extratoTransacoes != null) {
        var extrato = JSON.parse(extratoTransacoes)
        } else {
        var extrato = [];
        }

    if (id !== null) {
        extrato[id] = {
            mercad: e.target.elements['mercad'].value,
            valor: e.target.elements['valor'].value,
            total: e.target.elements['total'].value,
        }
    } else {
        extrato.push({
            mercad: e.target.elements['mercad'].value,
            valor: e.target.elements['valor'].value,
            total: e.target.elements['total'].value,
        })
    }

    localStorage.setItem('extrato', JSON.stringify(extrato))

    document.getElementById('goHome').click()
    }

    var urlPrincipal = new URL(window.location.href)

    var id = urlPrincipal.searchParams.get('mercadorias')
    if (id !== null) {
        var extratoTransacoes = localStorage.getItem('extrato')
        if (extratoTransacoes != null) {
            var extrato = JSON.parse(extratoTransacoes)
        } else {
            var extrato = [];
        }
        console.log(extrato[id])

        document.getElementById('mercad').value = extrato[id].mercad
        document.getElementById('valor').value = extrato[id].valor
        document.getElementById('total').value  = extrato[id].total
        if (extrato[id].trans) {
            document.getElementById('compra').checked = true
        } else {
            document.getElementById('venda').checked = true
        }
} */


 /* Script para máscara de valores */

function testaCampoValor(e) {
    e.preventDefault()
    console.log(e)

    if ((/[0-9 R$.,]/g).test(e.key)) {
        e.target.value += e.key
    }
} 
 
 function formatarMoeda() {
    var elemento = document.getElementById('valor');
    var valor = elemento.value;
    
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g,''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
  
    if (valor.length > 6) {
      valor = valor.replace(/([0-9R$]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
  
    elemento.value = 'R$ ' + valor;

    e.preventDefault()
    if ((/[0-9 R$.,]/g).test(e.key)) {
        e.target.value += e.key
    }
  }
