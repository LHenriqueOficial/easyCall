import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from './../services/usuario.service';
import { Usuarios } from '../model/Usuario';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  usuariot: any;
  setor: any;

  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, 
    public navCtrl : NavController,
    public alertController: AlertController) { }

  ngOnInit() {

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

}
