import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menssagem-page',
  templateUrl: './menssagem-page.page.html',
  styleUrls: ['./menssagem-page.page.scss'],
})
export class MenssagemPagePage implements OnInit {

  usuarioMensagem: string
  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, public navCtrl : NavController, public acrroute: ActivatedRoute) { 
      this.verificarLogin()
      this.acrroute.paramMap.subscribe((params:ParamMap)=>
      {
        this.usuarioMensagem=params.get("id")
        console.log(this.usuarioMensagem)
      })
    }

  ngOnInit() {
  }

  verificarLogin(){
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
}
