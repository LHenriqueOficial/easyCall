import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.page.html',
  styleUrls: ['./disponibilidade.page.scss'],
})
export class DisponibilidadePage implements OnInit {
horasTrabalhadas: number;
diasTrabalhados: number;
disponibilidade: number;
qtdEquip: number;
tempoPorEquip:number;
ordemList: any = []
  constructor() { }

  ngOnInit() {

  }


 async calcDistponibilidade(){
    this.disponibilidade = (this.diasTrabalhados * this.horasTrabalhadas * this.qtdEquip )
    this.tempoPorEquip = (this.disponibilidade / this.qtdEquip)
  }

  // carregaOrdem(valor: string) {
  
  //     let lista=this.db.collection<Ordem>("Ordem")
     
  //      lista.ref.where("status", "==", valor).get().then(res =>{
        
  //       res.forEach(doc => {
  //         this.ordemList.push(doc.data())
  //         console.log(doc.id, ' => ' , doc.data())
        
  //       });
  //     })
  //   }
}
