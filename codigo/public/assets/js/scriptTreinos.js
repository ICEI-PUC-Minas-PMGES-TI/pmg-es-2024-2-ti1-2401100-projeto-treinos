


class Treino {
    constructor() {
        this.id = 1;
        this.arrayTreinos = [];
    }

    salvar() {
        let treino = this.lerDados();

        if (this.validaCampos(treino)) {
            this.adicionar(treino);
            this.atualizaTabela();
            this.cancelar(); // Limpa os campos após salvar
            fecharPopup(); // Fecha o popup após salvar
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
}

var treino = new Treino();

var treinosCard1 = [];
var treinosCard2 = [];
var treinosCard3 = [];
var treinoIdAtual;

function abrirPopup(treinoId) {
    const popup = document.getElementById('popup');
    const treinoDetalhes = document.getElementById('treino-detalhes');

    treinoIdAtual = treinoId;
    popup.style.display = "flex";

    atualizarListaTreinosPopup();
}

function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = "none";
}

function adicionarTreinoPopup(treinoId) {
    const nomeTreino = document.getElementById('nome-treino-popup').value;
    const repeticao = document.getElementById('repeticao-popup').value;


    const listaTreinosPopup = document.getElementById('lista-treinos-popup');
    const novoTreinoPopup = document.createElement('li');
    novoTreinoPopup.textContent = `Nome: ${nomeTreino} - Repetição: ${repeticao}`;
    listaTreinosPopup.appendChild(novoTreinoPopup);


    const listaTreinosCard = document.getElementById(`lista-treinos-${treinoId}`);
    const novoTreinoCard = document.createElement('li');
    novoTreinoCard.textContent = `Nome: ${nomeTreino} - Repetição: ${repeticao}`;
    listaTreinosCard.appendChild(novoTreinoCard);


    document.getElementById('nome-treino-popup').value = '';
    document.getElementById('repeticao-popup').value = '';
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
        lista.appendChild(li);
    });
}
