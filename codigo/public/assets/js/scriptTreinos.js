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

        for (let i = 0; i < this.arrayTreinos.length; i++) {
            let tr = tbody.insertRow();

            let td_treino = tr.insertCell();
            let td_repeticao = tr.insertCell();

            td_treino.innerText = this.arrayTreinos[i].nomeTreino;
            td_repeticao.innerText = this.arrayTreinos[i].quantidadeRepeticoes;
        }
    }

    adicionar(treino) {
        this.arrayTreinos.push(treino);
        this.id++;
    }

    lerDados() {
        let treino = {};
        treino.id = this.id;
        treino.nomeTreino = document.getElementById('treino').value;
        treino.quantidadeRepeticoes = document.getElementById('repeticao').value;
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
    const nomeTreino = document.getElementById('nome-treino-popup').value.trim();
    const repeticao = document.getElementById('repeticao-popup').value.trim();

    const novoTreino = { nome: nomeTreino, repeticao: repeticao };

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

    document.getElementById('nome-treino-popup').value = '';
    document.getElementById('repeticao-popup').value = '';
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

        const tdAcoes = document.createElement('td');
        const bntExcluir = document.createElement('button');
        bntExcluir.className = 'btn-excluir';
        bntExcluir.innerText = 'Excluir';
        bntExcluir.onclick = () => excluirTreino(treinoIdAtual, t);

        tdAcoes.appendChild(bntExcluir);
        tr.appendChild(tdNome);
        tr.appendChild(tdRepeticao);
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

    treinosAtuais.forEach(t => {
        const li = document.createElement('li');
        li.innerText = `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`;
        listaTreinosCard.appendChild(li);
    });
}

function abrirPopupEscolherTreino() {
    const popup = document.getElementById('popupEscolherTreino');
    popup.style.display = "flex";
}

function fecharPopupEscolherTreino() {
    const popup = document.getElementById('popupEscolherTreino');
    popup.style.display = "none";
}

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
            li.innerText = `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`;
            //listaTreinosAside.appendChild(li); //pod ignorar esse comando

            if (![...listaTreinosAside.getElementsByTagName('li')].some(liItem => liItem.innerText === `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`)) {
                listaTreinosAside.appendChild(li);
            }
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
        li.innerText = `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`;
        listaTreinosAside.appendChild(li);
    });

    salvarTreinosNoLocalStorage();
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
            li.innerText = `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`;
            listaTreinosAside.appendChild(li);
        });

        atualizarListaTreinosCard(1);
        atualizarListaTreinosCard(2);
        atualizarListaTreinosCard(3);
        atualizarListaTreinosCard(4);
    }
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


window.onload = carregarTreinosDoLocalStorage;
