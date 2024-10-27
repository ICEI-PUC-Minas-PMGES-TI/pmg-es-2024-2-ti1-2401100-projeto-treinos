class Treino {
    constructor() {
        this.id = 1;
        this.arrayTreinos = [];
    }

    salvar() {
        let treino = this.lerDados();

        if (this.validaCampos(treino)) {
            this.adicionar(treino);
            this.treinoTabela();
        }
    }

    treinoTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayTreinos.length; i++) {
            let tr = tbody.insertRow();

            let td_treino = tr.insertCell();
            let td_repeticao = tr.insertCell();
            let td_serie = tr.insertCell();

            td_treino.innerText = this.arrayTreinos[i].nomeTreino;
            td_repeticao.innerText = this.arrayTreinos[i].nomeRepeticao;
            td_serie.innerText = this.arrayTreinos[i].repeticao;
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
        treino.nomeRepeticao = document.getElementById('repeticao').value;
        treino.repeticao = document.getElementById('repeticao').value;

        return treino;
    }

    validaCampos(treino) {
        let msg = '';
        if (treino.nomeTreino === '') {
            msg += '- Informe o treino\n';
        }

        if (treino.nomeRepeticao === '') {
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
