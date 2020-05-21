export class Area {
    descricao?:string;
    diasTrabalhados?:number;
    horasTrabalhadas?:number;
    tempoPorEquip?: number;
    disponibilidade?:number;
    qtdEquip?:number;
 

    constructor(){

        this.descricao="";
        this.diasTrabalhados= 0;
        this.horasTrabalhadas= 0;
        this.disponibilidade= 0;
        this.tempoPorEquip = 0;
        this.qtdEquip= 0;
    }
}
