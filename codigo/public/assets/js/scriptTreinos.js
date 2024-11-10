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
    const nomeTreino = document.getElementById('nome-treino-popup').value;
    const repeticao = document.getElementById('repeticao-popup').value;

    const novoTreino = { nome: nomeTreino, repeticao: repeticao };

    if (treinoIdAtual === 1) {
        treinosCard1.push(novoTreino);
    } else if (treinoIdAtual === 2) {
        treinosCard2.push(novoTreino);
    } else if (treinoIdAtual === 3) {
        treinosCard3.push(novoTreino);
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
    }

    atualizarListaTreinosPopup();
    atualizarListaTreinosCard(treinoId);

    salvarTreinosNoLocalStorage();
}

function atualizarListaTreinosPopup() {
    const lista = document.getElementById('lista-treinos-popup');
    lista.innerHTML = '';

    let treinosAtuais = [];
    if (treinoIdAtual === 1) {
        treinosAtuais = treinosCard1;
    } else if (treinoIdAtual === 2) {
        treinosAtuais = treinosCard2;
    } else if (treinoIdAtual === 3) {
        treinosAtuais = treinosCard3;
    }

    treinosAtuais.forEach(t => {
        const li = document.createElement('li');
        li.innerText = `Treino: ${t.nome} - Repetições: ${t.repeticao}`;

        const bntExcluir = document.createElement('button');
        bntExcluir.innerText = 'Excluir';
        bntExcluir.onclick = () => excluirTreino(treinoIdAtual, t);
        li.appendChild(bntExcluir);

        lista.appendChild(li);
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
    }

    treinosAtuais.forEach(t => {
        const li = document.createElement('li');
        li.innerText = `NOME: ${t.nome} - REPETIÇÃO: ${t.repeticao}`;
        listaTreinosCard.appendChild(li);
    });
}

function salvarTreinosNoLocalStorage() {
    const treinos = {
        treinosCard1,
        treinosCard2,
        treinosCard3
    };

    localStorage.setItem('treinos', JSON.stringify(treinos));
}

function carregarTreinosDoLocalStorage() {
    const treinosSalvos = JSON.parse(localStorage.getItem('treinos'));
    if (treinosSalvos) {
        treinosCard1 = treinosSalvos.treinosCard1 || [];
        treinosCard2 = treinosSalvos.treinosCard2 || [];
        treinosCard3 = treinosSalvos.treinosCard3 || [];

        atualizarListaTreinosCard(1);
        atualizarListaTreinosCard(2);
        atualizarListaTreinosCard(3);
    }
}

window.onload = carregarTreinosDoLocalStorage;
