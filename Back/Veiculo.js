class Veiculo {
    _id;
    _descricao;
    _portas;
    _cor;

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        this._descricao = value;
    }

    get portas() {
        return this.portas;
    }
    set portas(value) {
        this._portas = value;
    }
   
    get cor() {
        return this._cor;
    }
    set cor(value) {
        this._cor = value;
    }

    constructor(vId, vDescricao, vPortas, vCor){
        this.id = vId;
        this.descricao = vDescricao;
        this.portas = vPortas;
        this.cor = vCor;
    }
}

export default Veiculo;