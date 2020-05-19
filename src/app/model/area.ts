export class Area {
    descricao?:string;
    diasTrabalhados?:number;
    horastrabalhadas?:number;
    disponibilidade?:number;

    constructor(descricao:string="", diasTrabalhados: number=0,
     horasTrabalhadas:number=0, disponibilidade: number=0){

        this.descricao= descricao;
        this.diasTrabalhados= diasTrabalhados;
        this.horastrabalhadas= horasTrabalhadas;
        this.disponibilidade= disponibilidade;
    }
}
