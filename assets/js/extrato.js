//console.log('Oi, eu sou o Javascript!')

/* var extratoTransacoes = localStorage.getItem('extrato')
if (extratoTransacoes != null) {
    var extrato = JSON.parse(extratoTransacoes)
} else {
    var extrato = [];
}

function montarExtrato() {

    divsPresentes = [...document.querySelectorAll('div.extrato body')];
    divsPresentes.forEach((element) => {
        element.remove()
    })   

for (mercadorias in extrato)  {
    document.querySelector('div.extrato body').innerHTML += `<div class="linha1">
        <div class="sinalmais">+</div>
        <div class="linha1-sep">
            <div class="linha1-texto-merc" id="mercad">${ extrato[mercadorias].mercad }</div>
            <div class="linha1-texto-val" id="valor">${ extrato[mercadorias].valor }</div>
        </div>
    </div>
    <hr>
    <hr>
    <hr class="hrbaixo">
    <div class="linha4">
        <div class="sep"></div>
        <div class="sep-total">
            <div class="linha4-texto-total" id="texto-total">Total</div>
            <div class="linha4-texto-val" id="total">${ extrato[mercadorias].total }<br>
                <div class="lucro">[LUCRO]</div>
            </div>
        </div>
    </div>
</div>`
}


}
montarExtrato(); */