import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, public navCtrl : NavController) { }

  ngOnInit() {

    this.fbauth.authState.subscribe(user=>{
      if(user)
      {
        console.log("autenticado" + user.uid )
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

  logOut(){
    this.fbauth.auth.signOut();
    this.navCtrl.navigateForward('inicial-page')
  }

}
