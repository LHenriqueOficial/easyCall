import { Component, OnInit } from '@angular/core';
import { OrdemService } from 'src/app/services/ordem.service';
import { Subscription } from 'rxjs';
import { Ordem } from 'src/app/model/ordem';
import { analytics } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Contagem } from 'src/app/model/contagem';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio-ordens',
  templateUrl: './relatorio-ordens.page.html',
  styleUrls: ['./relatorio-ordens.page.scss'],
})
export class RelatorioOrdensPage implements OnInit {
  private ordemSubscription: Subscription;
  
  public ordem = new Array<Ordem>();
  ordemList: any = []
  soma:any = []
  valorConta: number = 0;
  contaExecucao: number =0;
  contaAguarde: number=0;
  equipList: any;
  equipId: string;
  calcTempo: number=0;
  mediaResp: string;
  valorTempoServico: number=0;
  mediaServ: string;
  modelo:string;
  calculoTempo: string;
  tempoTotaldeServico: any;



  constructor(
    private ordemService: OrdemService,
    private db: AngularFirestore,
    private roter: Router,
  ) 
  {
    this.ordemSubscription = this.ordemService.getOrdens().subscribe(data =>{
      this.ordem = data;
    })
    
  
   }

  ngOnInit() {

    this.contaOrdem();
    this.calcTempoResposta();
    

  }

  ngOnDestroy() {
    if (this.ordemSubscription) this.ordemSubscription.unsubscribe();

  }

contaOrdem(){

  let conta=this.db.collection("Contagem")
    conta.ref.where("id", "==", 1).get().then(result=>{
     result.forEach(element =>{
       this.valorConta=element.data().contaOs
       this.contaExecucao= element.data().contaOsExecucao
       this.contaAguarde= element.data().contaOsEmEspera

     })
  })
  
}


rota(valor: string){
  this.roter.navigate(['/status-os-page', valor])

}

// carregaOrdem(valor: string) {
// this.modelo = valor;
//   let lista=this.db.collection<Ordem>("Ordem")
 
//    lista.ref.where("status", "==", valor).get().then(res =>{
    
//     res.forEach(doc => {
//       this.ordemList.push(doc.data())
//       console.log(doc.id, ' => ' , doc.data())
    
//     });
//   })
// }

calcTempoResposta(){
  let lista=this.db.collection<Ordem>("Ordem")
 
  lista.ref.where("status", "==", "Finalizada").get().then(res =>{
   
   res.forEach(element => {
    console.log("consulta " + element.data().tempoResposta )  
    this.valorTempoServico += Number(element.data().tempoServico)
    this.tempoTotaldeServico = this.valorTempoServico.toFixed(2)
    this.calcTempo += Number(element.data().tempoResposta)
    this.calculoTempo = this.calcTempo.toFixed(2);
     this.mediaResp = Number(this.calcTempo / this.valorConta).toFixed(2)

     this.mediaServ = Number(this.valorTempoServico / this.valorConta).toFixed(2)

     this.soma = Number((element.data().horaInicio - element.data().horaFinalização)/ 1000 /60).toFixed(2)
     console.log("teste contagem "+ this.soma )
   });
 })

}
  
 
}

