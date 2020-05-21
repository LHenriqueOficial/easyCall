export class Equipamentos {
    descricao?: string;
    setor?: string;
    tempo?:number;
    qtdParada?: number;
    accResposta?:number;
    disponibilidade?: number;
    tempoAnterior?:number;
    tempoAtual?: number;
    tempoEntreFalha?:number;

    constructor(){

        this.descricao="";
        this.setor= "";
        this.tempo= 0;
        this.qtdParada= 0;
        this.accResposta= 0;
        this.disponibilidade= 0;
        this.tempoAnterior=0;
        this.tempoAtual=0
        this.tempoEntreFalha

    }

}
