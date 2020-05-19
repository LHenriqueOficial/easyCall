import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Equipamentos } from 'src/app/model/equipamentos';
import { EquipamentosService } from 'src/app/services/equipamentos.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';
import { element } from 'protractor';

@Component({
  selector: 'app-relatorio-equipamentos',
  templateUrl: './relatorio-equipamentos.page.html',
  styleUrls: ['./relatorio-equipamentos.page.scss'],
})
export class RelatorioEquipamentosPage implements OnInit {
 private equipamentoSubscrible:Subscription;
 public equipamentos = new Array<Equipamentos>();
 listaequipamento:Observable<Equipamentos[]>
 ordemList: any = []
tempodeParada: any=[]



  constructor(
    private equipServise: EquipamentosService,
    private db: AngularFirestore,

  ) 
  { 
    this.equipamentoSubscrible = this.equipServise.getEquipamentos().subscribe(data =>{
      this.equipamentos = data;
    })
    this.carregadados();
  }

  ngOnInit() {
  }

  // listarMensagens(){

  //   this.listaequipamento=this.db.collection<Equipamentos>("Mensagens",ref=>{
  //     return ref.limit(200).orderBy("tempo")///  ordena mensagens por dada e limida em 10 
  //   }).valueChanges()// altera o conteudo dianamicamente 
  
  //   this.listaequipamento.subscribe(res=>
  //     {
  //       this.filtarLista(res)
  //     })
  // }


 carregadados() {
    let lista=this.db.collection<Equipamentos>("Equipamentos")
   
     lista.ref.orderBy("tempo", "desc").get().then( async res =>{
      
     await res.forEach(doc => {
        this.ordemList.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
      
      });
      res.forEach(element =>{

        this.tempodeParada = element.data().tempo.toFixed(2)
      
        console.log("teste elemento" + this.tempodeParada)


      })
    })
  }

}
