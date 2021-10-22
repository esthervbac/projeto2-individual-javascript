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
    
    const adicionarTransacoesReais = ({ valor, nome, id }) => {
        const operador = valor < 0 ? '-' : '+'
        const cssClass = valor < 0 ? 'sinalmenos' : 'sinalmais'
       debugger
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
        debugger 
        const totalFinal = Number(total).toLocaleString()
       
    /*  Se precisar jogar valores de Compras e Vendas
        const vendas  = pegueVendas(valoresDeTransacoes)
        const compras = pegueCompras(valoresDeTransacoes) 
        */ 
       
        totalAtualizado.textContent = 'R$ ' + totalFinal

        if (total > 0) {
            lucroPrejuizo.textContent = '[LUCRO]'
        } else {
            lucroPrejuizo.textContent = '[PREJUÍZO]'
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

   // Fazer divs de Nenhuma Transação Cadastrada e LucroPrejuízo aparecerem e desaparecerem 
  //  nos momentos corretos

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


    /* Ao clicar no menu 'Limpar Dados' todos os dados do extrato são apagados */

    function acaoLimpar() {
        decisao = confirm('Deseja realmente limpar os dados?')
    
        if (decisao) {
            localStorage.clear();
            limparAutoComplete();
        }
        else
            return false;
    }


 /*   function adicionarTransacoesReais ( valor, nome, id ) {
        const operador = valor < 0 ? '-' : '+'
        const cssClass = valor < 0 ? 'sinalmenos' : 'sinalmais'
       debugger
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
    } */

    function testaCampoValor(e) {
        e.preventDefault()
    
        if ((/[0-9 -,]/g).test(e.key)) {
            e.target.value += e.key
        }
    } 

        function formatarMoeda(e) {

            let valor = valorInput.value
    

        valor = valor + '';
        valor = valor.replace(/[\D]+/g, '');
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1"); 
        valor = valor.replace (/\B(?=(\d{3})+(?!\d))/g, ".")

        let escolhendoVenda = document.querySelector('#venda').text;
        let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
    
        for(i=0; i<opcoesSelecionadas.length; i++)
            if (opcoesSelecionadas[i].text !== escolhendoVenda) {
                valorInput.value = '-' + valor

                console.log('')
            } else {
                valorInput.value = valor

            }
    }

    function formatarValorRealParaMaquina(valor) {
        return parseFloat(valor.toString().replace('.', '').replace(',', '.'));
    }

       /*   let escolhendoVenda = document.querySelector('#venda').text;
        let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
    
        for(i=0; i<opcoesSelecionadas.length; i++)
        if (opcoesSelecionadas[i].text !== escolhendoVenda) {
            elemento.value = '-' + valor
            console.log('compra -')
        } else {
            elemento.value = valor
            console.log('venda +')
        } */


    /*
    
    document.addEventListener("keyup", function() {
        let escolhendoVenda = document.querySelector('#venda').text;
        let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
        let valorEnviado = valorInput.value
        let valorFormatado = valorEnviado.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          });

        for(i=0; i<opcoesSelecionadas.length; i++)
            if (opcoesSelecionadas[i].text !== escolhendoVenda) {
                valorEnviado.textContent = '-' + valorFormatado
                    console.log('compra -')
            } else {
                valorEnviado.textContent = valorFormatado
                    console.log('venda +')
          } 
        
    });

        let inputValor = document.querySelector('valor');
        let escolhendoVenda = document.querySelector('#venda').text;
        let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;

        inputValor.addEventListener('keyup', (e) => {
            e.preventDefault();

            let valorTotal = inputValor.value;
            let totalFormatado = new Intl.NumberFormat("pt-BR", {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            }).format(valorTotal);

            inputValor.value = totalFormatado;

            for(i=0; i<opcoesSelecionadas.length; i++)
            if (opcoesSelecionadas[i].text !== escolhendoVenda) {
                inputValor.value = '-' + totalFormatado
            } else {
                inputValor.value = totalFormatado
            } 
        })

    new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(value) / 100)

/*

var a = "12,13";
        var b = "48,12"
        var n1 = parseFloat(a.replace(".", ","));
        var n2 = parseFloat(b.replace(".", ","));
        var resultado = n1 + n2;
        console.log(resultado); // 60,25

        toFixed(2).replace(".",",")


        valor = valor + '';
        valor = parseFloat(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1"); 

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, "$1,$2");
        }  */

        /* let escolhendoVenda = document.querySelector('#venda').text;
       let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
   
       for(i=0; i<opcoesSelecionadas.length; i++)
       if (opcoesSelecionadas[i].text !== escolhendoVenda) {
           elemento.value = '-' + valor.toFixed(2)
           console.log('compra -')
       } else {
           elemento.value = valor.toFixed(2)

           console.log('venda +')
       } 

    


   function formatarMoeda(e) {
        let elemento = document.getElementById('valor');
        let valor = elemento.value;

        valor = valor + '';
        valor = parseFloat(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ".$1"); 

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, "$1,$2");
        }

        elemento.value = valor

        new Intl.NumberFormat('pt-BR',  {
            style: 'currency',
            currency: 'BRL',
        }).format(valor));

       let escolhendoVenda = document.querySelector('#venda').text;
        let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
    
        for(i=0; i<opcoesSelecionadas.length; i++)
        if (opcoesSelecionadas[i].text !== escolhendoVenda) {
            elemento.value = '-' + valor
            console.log('compra -')
        } else {
            elemento.value = valor
            console.log('venda +')
        } 
    } 
    
    
    function formatarMoeda(e) {
        console.log(e);
        e.preventDefault();
        
        

        let elemento = document.getElementById('valor');
        let valor = elemento.value.replace(/0,0/gi, '').replace(/0,/gi,'').replace(/[,.]/gi, '');

        if (valor.length == 1) {
            valor = '0,0' + valor
        } else

        if (valor.length <= 2) {
            valor = '0,' + valor
        } else
        
        if (valor.length >= 3)
            valor = valor.replace(/([0-9]{2})$/g, ",$1"); 

        valorsemdecimal = valor.replace(/,([0-9]{2})$/g, "")

        numpontos = parseInt(valorsemdecimal.length / 3)
        if (valorsemdecimal.length % 3 == 0) {
            numpontos -= 1
        }
                 
        for (let i=0; i < numpontos; i++) {
          aditionalnumbers = []
          for (let j = 0; j < i; j++) {
              aditionalnumbers.push('([0-9]{3})')
          }
          rx = new RegExp('/'+  aditionalnumbers.join('.')  +'([0-9]{3}),([0-9]{2}$)/g');
          valor = valor.replace(rx, "$1.$2")
        }

//         let escolhendoVenda = document.querySelector('#venda').text;
//         let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
    
//         for(i=0; i<opcoesSelecionadas.length; i++)
//         if (opcoesSelecionadas[i].text !== escolhendoVenda) {
            elemento.value = valor
//             console.log('compra -')
//         } else {
//             elemento.value = valor
//             console.log('venda +')
//         }
    }




            String.prototype.reverse = function(){
            return this.split('').reverse().join(''); 
          };
          
          function formatarMoeda(campo,evento){
            var tecla = (!evento) ? window.event.keyCode : evento.which;
            var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
            var resultado  = "";
            var mascara = "##.###.###,##".reverse();
            for (var x=0, y=0; x<mascara.length && y<valor.length;) {
              if (mascara.charAt(x) != '#') {
                resultado += mascara.charAt(x);
                x++;
              } else {
                resultado += valor.charAt(y);
                y++;
                x++;
              }
              let escolhendoVenda = document.querySelector('#venda').text;
              let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
     
                  for(i=0; i<opcoesSelecionadas.length; i++)
                  if (opcoesSelecionadas[i].text !== escolhendoVenda) {
                      campo.value = 'R$ -' + resultado.reverse();
                  } else {
                      campo.value = 'R$ ' + resultado.reverse();
                  }
              }
            }
    
            .toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          });





           String.prototype.reverse = function(){
            return this.split('').reverse().join(''); 
          };
          
          function formatarMoeda(campo,evento){
            var tecla = (!evento) ? window.event.keyCode : evento.which;
            var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
            var resultado  = "";
            var mascara = "##.###.###.##".reverse();
            for (var x=0, y=0; x<mascara.length && y<valor.length;) {
              if (mascara.charAt(x) != '#') {
                resultado += mascara.charAt(x);
                x++;
              } else {
                resultado += valor.charAt(y);
                y++;
                x++;
              }
              let escolhendoVenda = document.querySelector('#venda').text;
              let opcoesSelecionadas = document.querySelector('#trans').selectedOptions;
     
                  for(i=0; i<opcoesSelecionadas.length; i++)
                  if (opcoesSelecionadas[i].text !== escolhendoVenda) {
                      campo.value = 'R$ -' + resultado.reverse();
                } else {
                      campo.value = 'R$ ' + resultado.reverse();
                }
            }
        }



         valor = valor.toString().replace (/\B(?=(\d{3})+(?!\d))/g, ".")
    
    */