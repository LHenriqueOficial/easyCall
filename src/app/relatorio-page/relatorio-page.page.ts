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
  pesquisa: string;

  constructor(
    private db: AngularFirestore,
    private firestore: AngularFirestore,
    private ordemService : OrdemService,
    
  ) {
    this.ordemSubscription = this.ordemService.getOrdens().subscribe(data =>{
      this.ordem = data;
      // this.carregadados();
    })
   }

  ngOnInit() {
  }



  carregadados() {
    let lista=this.db.collection<Ordem>("Ordem")
   
     lista.ref.where("data", "==", '2020-03-09T15:43:42.218-03:00').get().then(res =>{
      
      res.forEach(doc => {
        this.ordemList.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
      });
    })
  }
 
}

  



  
  


