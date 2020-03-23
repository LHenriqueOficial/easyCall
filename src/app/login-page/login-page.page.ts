import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Model/Usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  usuario:Usuarios
  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, public navCtrl : NavController) { 
    this.usuario=new Usuarios()
  }

  ngOnInit() {

    this.fbauth.authState.subscribe(user=>{
      if (user)
      {
        console.log("autenticado: " + user.uid)
      }
      else{
        console.log("nao autenticado")
      }
    })
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  loginUsuario(){
    this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(()=>{
      this.showScreen('home-page')

    })
    .catch(async ()=>{
      const alert = await this.AlertCtrl.create({
        header:'Menssagem',
        subHeader:"",
        message:'Login ou Senha está incorreto',
        buttons:['Ok']
      });
      await alert.present();
    })
  };


}
