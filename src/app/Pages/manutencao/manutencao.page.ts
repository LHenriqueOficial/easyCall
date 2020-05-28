import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuarios } from 'src/app/model/Usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.page.html',
  styleUrls: ['./manutencao.page.scss'],
})
export class ManutencaoPage implements OnInit {
  funcao: any;
  usuariot: any;
  valorConta: number = 0;
  contaExecucao: number =0;
  contaAguarde: number=0;

  constructor(
    private navCtrl: NavController,
    private fbauth: AngularFireAuth,
    private db: AngularFirestore,
    private roter: Router,
  ) { 
    this.contaOrdem();
  }

  ngOnInit() {

    this.fbauth.authState.subscribe(user=>{
      if (user)
      
      {
        let uid = user.uid;
        console.log("autenticado: " + user.uid)
        uid = user.uid;
        console.log("teste uid  " + uid)
        let users=this.db.collection<Usuarios>("Usuarios")
        users.ref.where("userId", "==", uid).get().then(result=>{

          this.usuariot= result;
     
               result.forEach(element =>{
                 this.funcao=element.data().funcao
                 
               })
            })
      }
      
      else{
        console.log("nao autenticado")
      }
    })
  
  }


  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina)
  };

  rota(valor: string){
    this.roter.navigate(['/status-os-page', valor])
  
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
}
