import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { OrdemService } from './../services/ordem.service';
import { Subscription, Observable } from 'rxjs';
import { Ordem } from '../model/ordem';
import { element } from 'protractor';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { FirebaseFirestore } from 'angularfire2';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio-page',
  templateUrl: './relatorio-page.page.html',
  styleUrls: ['./relatorio-page.page.scss'],
})
export class RelatorioPagePage implements OnInit {

  ordemSubscription: Subscription;
  public ordem = new Array<Ordem>();
  public orde: Ordem= {};
  lista:Array<Ordem>
  ordemList: any = []
  list: Ordem={};
  pesquisa: string;
  valorConta: Number=0;
  contaExecucao: Number=0;
  contaAguarde: Number=0;

  constructor(
    private db: AngularFirestore,
    private firestore: AngularFirestore,
    private ordemService : OrdemService,
    private navCtrl: NavController
    
  ) {
    this.ordemSubscription = this.ordemService.getOrdens().subscribe(data =>{
      this.ordem = data;
    
    })
    this.contaOrdem();
   }

  ngOnInit() {
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina)
  };


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
  
 
}

  



  
  


