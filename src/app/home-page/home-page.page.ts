import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from './../services/usuario.service';
import { Usuarios } from '../model/Usuario';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  usuariot: any;
  setor: any;
  valorConta: number = 0;
  contaExecucao: number =0;
  contaAguarde: number=0;

  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, 
    public navCtrl : NavController,
    private push: Push,
    private fcm: FCM,
    public alertController: AlertController,
    public roter : Router,
    private db: AngularFirestore) { 


    }

  ngOnInit() {
    this.fcm.getToken().then(token => {
      console.log("teste masage "+ token)
      console.log("é nois mlk " )
    });
    
    console.log("é nois mlk " )

    this.fbauth.authState.subscribe(user=>{
      if(user)
      {
        console.log("autenticado" + user.uid  )
        let uid = user.uid;
        console.log("teste uid  " + uid)
        let users=this.fbstore.collection<Usuarios>("Usuarios")
        users.ref.where("userId", "==", uid).get().then(result=>{

          this.usuariot= result;
     
               result.forEach(element =>{
                 this.setor=element.data().setor
                 
               })
            })
      }
      else
      {
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

blockPage(nomeDaPagina: string){
  console.log(this.setor)
  if(this.setor === 'Manutenção'){
    this.navCtrl.navigateBack(nomeDaPagina)
  }
  else{
    this.alert();
  }
}

  logOut(){
    this.fbauth.auth.signOut();
    this.navCtrl.navigateForward('inicial-page')
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Acesso negado',
      translucent: true,
      mode:'ios',
      message: 'Procure adiministrador do APK',
      buttons: ['OK']
    });

    await alert.present();
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
