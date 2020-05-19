export class Equipamentos {
    descricao?: string;
    setor?: string;
    tempo?:number;
    qtdParada?: number;
    accResposta?:number;
    disponibilidade?: number;

    constructor(descricao: string ="", setor: string="",
    tempo:number=0, qtdParada: number=0,accResposta:number=0,disponibilidade: number=0){

        this.descricao=descricao;
        this.setor= setor;
        this.tempo= tempo;
        this.qtdParada= qtdParada;
        this.accResposta= accResposta;
        this.disponibilidade= disponibilidade;

    }

}
