class Treino {
    constructor() {
        this.id = 1;
        this.arrayTreinos = this.carregarTreinos();
    }

    salvar() {
        let treino = this.lerDados();

        if (this.validaCampos(treino)) {
            this.adicionar(treino);
            this.atualizaTabela();
            this.cancelar(); 
            fecharPopup();
            this.salvarNoLocalStorage();
        }
    }

    atualizaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        let treinosAtuais = [...treinosCard1, ...treinosCard2, ...treinosCard3, ...treinosCard4];
        treinosAtuais.forEach(t => {
            let tr = tbody.insertRow();
    
            let td_treino = tr.insertCell();
            let td_repeticao = tr.insertCell();
    
            td_treino.innerText = t.nome;
            td_repeticao.innerText = t.repeticao;
        });
    }

    adicionar(treino) {
        this.arrayTreinos.push(treino);
        this.id++;
    }

    lerDados() {
        let treino = {};
        treino.id = this.id;
        treino.nomeTreino = document.querySelector('.selected').innerText;
        treino.quantidadeRepeticoes = document.querySelector('.num').value;
        return treino;
    }

    validaCampos(treino) {
        let msg = '';
        if (treino.nomeTreino === '') {
            msg += '- Informe o treino\n';
        }

        if (treino.quantidadeRepeticoes === '') {
            msg += '- Informe a repetição';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('treino').value = '';
        document.getElementById('repeticao').value = '';
    }

    salvarNoLocalStorage() {
        localStorage.setItem('treinos', JSON.stringify(this.arrayTreinos));
    }

    carregarTreinos() {
        let treinos = JSON.parse(localStorage.getItem('treinos'));
        return treinos ? treinos : [];
    }
}

var treino = new Treino();

var treinosCard1 = [];
var treinosCard2 = [];
var treinosCard3 = [];
var treinosCard4 = [];
var treinoIdAtual;

function abrirPopup(treinoId) {
    const popup = document.getElementById('popup');
    popup.style.display = "flex";
    treinoIdAtual = treinoId;

    atualizarListaTreinosPopup();
}

function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = "none";
}

function adicionarTreinoPopup() {
    const nomeTreino = document.querySelector('.selected').innerText.trim();
    const repeticao = document.querySelector('.num').innerText.trim();
    const series = document.querySelector('.numSeries').innerText.trim();

    if(!nomeTreino || !repeticao){
        alert("Escolha o treino e a quantidade de repetição!")
    }
    const novoTreino = { nome: nomeTreino, repeticao: repeticao, series: series};

    if (treinoIdAtual === 1) {
        treinosCard1.push(novoTreino);
    } else if (treinoIdAtual === 2) {
        treinosCard2.push(novoTreino);
    } else if (treinoIdAtual === 3) {
        treinosCard3.push(novoTreino);
    } else if (treinoIdAtual === 4) {
        treinosCard4.push(novoTreino);
    }

    atualizarListaTreinosPopup();
    atualizarListaTreinosCard(treinoIdAtual);
    salvarTreinosNoLocalStorage();

    document.querySelector('.selected').innerText = '';
    document.querySelector('.num').innerText = '';
    document.querySelector('.numSeries').innerText = '';
}



function excluirTreino(treinoId, treino) {
    if (treinoId === 1) {
        treinosCard1 = treinosCard1.filter(t => t !== treino);
    } else if (treinoId === 2) {
        treinosCard2 = treinosCard2.filter(t => t !== treino);
    } else if (treinoId === 3) {
        treinosCard3 = treinosCard3.filter(t => t !== treino);
    } else if (treinoId === 4) {
        treinosCard4 = treinosCard4.filter(t => t !== treino);
    }

    atualizarListaTreinosPopup();
    atualizarListaTreinosCard(treinoId);

    salvarTreinosNoLocalStorage();
}

function atualizarListaTreinosPopup() {
    const tbody = document.getElementById('tbody-treinos-popup');
    tbody.innerHTML = '';

    let treinosAtuais = [];
    if (treinoIdAtual === 1) {
        treinosAtuais = treinosCard1;
    } else if (treinoIdAtual === 2) {
        treinosAtuais = treinosCard2;
    } else if (treinoIdAtual === 3) {
        treinosAtuais = treinosCard3;
    } else if (treinoIdAtual === 4) {
        treinosAtuais = treinosCard4;
    }

    treinosAtuais.forEach(t => {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.innerText = t.nome;

        const tdRepeticao = document.createElement('td');
        tdRepeticao.innerText = t.repeticao;

        const tdSeries = document.createElement('td');
        tdSeries.innerText = t.series;

        const tdAcoes = document.createElement('td');
        const bntExcluir = document.createElement('button');
        bntExcluir.className = 'btn-excluir';
        bntExcluir.innerText = 'Excluir';
        bntExcluir.onclick = () => excluirTreino(treinoIdAtual, t);

        tdAcoes.appendChild(bntExcluir);
        tr.appendChild(tdNome);
        tr.appendChild(tdRepeticao);
        tr.appendChild(tdSeries);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });
}

function atualizarListaTreinosCard(treinoId) {
    const listaTreinosCard = document.getElementById(`lista-treinos-${treinoId}`);
    listaTreinosCard.innerHTML = '';

    let treinosAtuais = [];
    if (treinoId === 1) {
        treinosAtuais = treinosCard1;
    } else if (treinoId === 2) {
        treinosAtuais = treinosCard2;
    } else if (treinoId === 3) {
        treinosAtuais = treinosCard3;
    } else if (treinoId === 4) {
        treinosAtuais = treinosCard4;
    }

    const treinosVisiveis = treinosAtuais.slice(0, 5);

    treinosVisiveis.forEach(t => {
        const li = document.createElement('li');
        li.innerText = `${t.nome} - ${t.repeticao} Repetições X ${t.series} Séries`;

        listaTreinosCard.appendChild(li);
    });

    //treinosAtuais.forEach(t => {
    //    const li = document.createElement('li');
    //    li.innerText = `${t.nome}   -   ${t.repeticao}`;
    //    listaTreinosCard.appendChild(li);
    //});                                                           TESTE, IGNORAR ESSA PARTE
}

function abrirPopupEscolherTreino() {
    const popup = document.getElementById('popupEscolherTreino');
    popup.style.display = "flex";
}

function fecharPopupEscolherTreino() {
    const popup = document.getElementById('popupEscolherTreino');
    popup.style.display = "none";
}

//NORMAL 
//NORMAL
//NORMAL

function fixarTreino(treinoId) {
    let treinoFixado = [];

    if (treinoId === 1 && treinosCard1.length > 0) {
        treinoFixado = [...treinosCard1];
    } else if (treinoId === 2 && treinosCard2.length > 0) {
        treinoFixado = [...treinosCard2];
    } else if (treinoId === 3 && treinosCard3.length > 0) {
        treinoFixado = [...treinosCard3];
    } else if (treinoId === 4 && treinosCard4.length > 0) {
        treinoFixado = [...treinosCard4];
    }

    if (treinoFixado.length > 0) {
        const listaTreinosAside = document.getElementById('lista-treinos');
        listaTreinosAside.innerHTML = '';

        treinoFixado.forEach(t => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-treino';

            const treinoIdUnique = `${t.nome}-${t.repeticao}-${t.series}`;
            checkbox.id = treinoIdUnique;

            checkbox.checked = getEstadoCheckbox(t.nome, t.repeticao, t.series);

            checkbox.addEventListener('change', function() {
                salvarEstadoCheckbox(t.nome, t.repeticao, t.series, checkbox.checked);
            });

            const textoTreino = document.createTextNode(`${t.nome} - ${t.repeticao} Repetições x ${t.series} Séries`);
            li.appendChild(checkbox);
            li.appendChild(textoTreino);
            listaTreinosAside.appendChild(li);
        });

        salvarTreinosNoLocalStorage();
    }

    fecharPopupEscolherTreino();
}


function atualizarListaTreinosAside() {
    const listaTreinosAside = document.getElementById('lista-treinos');
    listaTreinosAside.innerHTML = ''; 

    const treinosFixados = [...treinosCard1, ...treinosCard2, ...treinosCard3, ...treinosCard4];

    treinosFixados.forEach(t => {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-treino';
        checkbox.checked = getEstadoCheckbox(t.nome, t.repeticao);


        const textoTreino = document.createElement('span');
        textoTreino.innerText = `${t.nome} - ${t.repeticao}`;


        textoTreino.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked; 
            salvarEstadoCheckbox(t.nome, t.repeticao, checkbox.checked); 
        });

        li.appendChild(checkbox);
        li.appendChild(textoTreino);
        listaTreinosAside.appendChild(li);


        checkbox.addEventListener('change', function() {
            salvarEstadoCheckbox(t.nome, t.repeticao, checkbox.checked);
        });
    });

    salvarTreinosNoLocalStorage();
}


function salvarEstadoCheckbox(nome, repeticao, marcado) {
    const chave = `checkbox-${nome}-${repeticao}`;
    localStorage.setItem(chave, marcado);

    const treinosSalvos = JSON.parse(localStorage.getItem('treinos')) || {
        treinosCard1: [],
        treinosCard2: [],
        treinosCard3: [],
        treinosCard4: [],
        treinosFixados: []
    };

    
    treinosSalvos.treinosFixados = treinosSalvos.treinosFixados.map(t => {
        if (t.nome === nome && t.repeticao === repeticao) {
            t.checked = marcado;
        }
        return t;
    });
}

function getEstadoCheckbox(nome, repeticao) {
    const chave = `checkbox-${nome}-${repeticao}`;
    return localStorage.getItem(chave) === 'true';
}

document.getElementById('adicionarTreinoBtn').onclick = function() {
    console.log('Botão Fixar Treino clicado');
    abrirPopupEscolherTreino();
};

function salvarTreinosNoLocalStorage() {
    const treinos = {
        treinosCard1,
        treinosCard2,
        treinosCard3,
        treinosCard4,
        treinosFixados: getTreinosFixados()
    };

    localStorage.setItem('treinos', JSON.stringify(treinos));
}

function carregarTreinosDoLocalStorage() {
    const treinosSalvos = JSON.parse(localStorage.getItem('treinos'));

    if (treinosSalvos) {
        treinosCard1 = treinosSalvos.treinosCard1 || [];
        treinosCard2 = treinosSalvos.treinosCard2 || [];
        treinosCard3 = treinosSalvos.treinosCard3 || [];
        treinosCard4 = treinosSalvos.treinosCard4 || [];

        const treinosFixados = treinosSalvos.treinosFixados || [];
        const listaTreinosAside = document.getElementById('lista-treinos');
        listaTreinosAside.innerHTML = ''; 

        treinosFixados.forEach(t => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-treino';

            checkbox.checked = getEstadoCheckbox(t.nome, t.repeticao);
            

            checkbox.addEventListener('change', function () {
                salvarEstadoCheckbox(t.nome, t.repeticao, checkbox.checked);
        });

        const textoTreino = document.createTextNode(`${t.nome} - ${t.repeticao}`);
            li.appendChild(checkbox);
            li.appendChild(textoTreino);
            listaTreinosAside.appendChild(li);
        });

        atualizarListaTreinosCard(1);
        atualizarListaTreinosCard(2);
        atualizarListaTreinosCard(3);
        atualizarListaTreinosCard(4);
    }
}

function salvarEstadoCheckbox(nome, repeticao, estadoCheckbox) {
    const chave = `checkbox-${nome}-${repeticao}`;
    const treinosSalvos = JSON.parse(localStorage.getItem('treinos')) || {
        treinosCard1: [],
        treinosCard2: [],
        treinosCard3: [],
        treinosCard4: [],
        treinosFixados: []
    };

    
    treinosSalvos.treinosFixados = treinosSalvos.treinosFixados.map(t => {
        if (t.nome === nome && t.repeticao === repeticao) {
            t.checked = estadoCheckbox; 
        }
        return t;
    });

    localStorage.setItem('treinos', JSON.stringify(treinosSalvos));
}

function getTreinosFixados() {
    const listaTreinosAside = document.getElementById('lista-treinos');
    const treinosFixados = [];

    const liElements = listaTreinosAside.getElementsByTagName('li');
    for (let li of liElements) {
        const treino = {
            nome: li.innerText.split(' - ')[0].replace('NOME: ', ''),
            repeticao: li.innerText.split(' - ')[1].replace('REPETIÇÃO: ', '')
        };
        treinosFixados.push(treino);
    }

    return treinosFixados;
}

/* dropdowns */

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => { 
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            option.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
            });
        });
    });

const plus = document.querySelector(".plus"),
minus = document.querySelector(".minus"),
num = document.querySelector(".num");

let a = 1;
plus.addEventListener("click", () => {
    a++;
    a = (a < 50) ? "0" + a : a;
    num.innerText = a;
    console.log("a");
});

minus.addEventListener("click", () => {
    if(a > 1){
        a--;
        a = (a < 50) ? "0" + a : a;
    num.innerText = a;
    }
});


const plusSeries = document.querySelector(".plus-series");
const minusSeries = document.querySelector(".minus-series");
const numSeries = document.querySelector(".numSeries");

let seriesCount = 1;  

plusSeries.addEventListener("click", () => {
    seriesCount++;
    seriesCount = seriesCount < 10 ? "0" + seriesCount : seriesCount;  
    numSeries.innerText = seriesCount;  
});

minusSeries.addEventListener("click", () => {
    if(seriesCount > 1) { 
        seriesCount--;
        seriesCount = seriesCount < 10 ? "0" + seriesCount : seriesCount; 
        numSeries.innerText = seriesCount;
    }
});

// POP DE CONLCLUSÃP //


document.getElementById('concluirTreinosBtn').onclick = function() {
    if (todosTreinosConcluidos()) {
        abrirPopupConclusao();
    } else {
        alert("Ainda faltam treinos para concluir.");
    }
};


function todosTreinosConcluidos() {
    const checkboxes = document.querySelectorAll('.checkbox-treino');
    return Array.from(checkboxes).every(checkbox => checkbox.checked);
}


function abrirPopupConclusao() {
    const popup = document.getElementById('popupConclusao');
    popup.style.display = "flex";
}



function fecharPopupConclusao() {
    const popup = document.getElementById('popupConclusao');
    popup.style.display = "none"; 
}

// ADICIONAR NOVOS CARDS //

let maxCards = 4;
let cardsAdicionados = JSON.parse(localStorage.getItem('cardsAdicionados')) || [1];

document.addEventListener("DOMContentLoaded", () => {
    carregarCardsSalvos();
});

function carregarCardsSalvos() {
    const cardContainer = document.querySelector('.backTreino');

    cardsAdicionados.forEach(cardId => {
        if (cardId > maxCards) return;

        const novoCard = document.createElement('div');
        novoCard.className = `treino${cardId} atras`;
        novoCard.id = `card-${cardId}`;
        novoCard.innerHTML = `
            <h1>TREINO ${cardId}</h1>
            <ul id="lista-treinos-${cardId}"></ul>
            <button class="verMaisBtn" onclick="abrirPopup(${cardId})">Ver Mais</button>
        `;

        const placeholder = document.getElementById('card-2');
        cardContainer.insertBefore(novoCard, placeholder);
    });


    if (cardsAdicionados.length >= maxCards) {
        esconderCardAdicionar();
    }
}

function adicionarNovoCard() {
    const cardContainer = document.querySelector('.backTreino');
    const cardCount = cardsAdicionados.length;

    if (cardCount >= maxCards) {
        alert("Você atingiu o limite máximo de 4 cards.");
        return;
    }

    const novoCardId = cardCount + 1;
    cardsAdicionados.push(novoCardId);

    const novoCard = document.createElement('div');
    novoCard.className = `treino${novoCardId} atras`;
    novoCard.id = `card-${novoCardId} - 1`;
    novoCard.innerHTML = `
        <h1>TREINO ${novoCardId}</h1>
        <ul id="lista-treinos-${novoCardId}"></ul>
        <button class="verMaisBtn" onclick="abrirPopup(${novoCardId})">Ver Mais</button>
    `;

    const placeholder = document.getElementById('card-2');
    cardContainer.insertBefore(novoCard, placeholder);

    salvarCardsNoLocalStorage();

    if (cardsAdicionados.length >= maxCards) {
        esconderCardAdicionar();
    }
}

function esconderCardAdicionar() {
    const cardAdicionar = document.getElementById('card-adicionar');
    if (cardAdicionar) {
        cardAdicionar.style.display = 'none';
    }
}

function salvarCardsNoLocalStorage() {
    localStorage.setItem('cardsAdicionados', JSON.stringify(cardsAdicionados));
}

function validarCard(cardId) {
    if (!cardsAdicionados.includes(cardId)) {
        alert("Card não existe!");
        return false;
    }
    return true;
}

function validarInputs(inputs) {
    for (let input of inputs) {
        if (!input || input.trim() === '') {
            alert("Todos os campos devem ser preenchidos.");
            return false;
        }
    }
    return true;
}

function sincronizarLocalStorage() {
    const treinos = {
        treinosCard1: window.treinosCard1 || [],
        treinosCard2: window.treinosCard2 || [],
        treinosCard3: window.treinosCard3 || [],
        treinosCard4: window.treinosCard4 || []
    };
    localStorage.setItem('treinos', JSON.stringify(treinos));
}

function obterTreinosCardPorId(cardId) {
    switch (cardId) {
        case 1: return window.treinosCard1 || [];
        case 2: return window.treinosCard2 || [];
        case 3: return window.treinosCard3 || [];
        case 4: return window.treinosCard4 || [];
        default: return [];
    }
}

function adicionarBotaoConclusao() {
    const container = document.getElementById('container'); 
    const botaoConclusao = document.createElement('button');
    botaoConclusao.id = "concluirTreinosBtn";
    botaoConclusao.className = "concluirTreinosBtn";
    botaoConclusao.innerText = "Concluir Ficha";


    container.appendChild(botaoConclusao);
    

    botaoConclusao.onclick = function() {
        if (todosTreinosConcluidos()) {
            abrirPopupConclusao();
        } else {
            alert("Ainda faltam treinos para concluir.");
        }
    };
}


window.onload = carregarTreinosDoLocalStorage;
