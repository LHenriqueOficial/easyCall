import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuarios } from 'src/app/model/Usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.page.html',
  styleUrls: ['./manutencao.page.scss'],
})
export class ManutencaoPage implements OnInit {
  funcao: any;
  usuariot: any;

  constructor(
    private navCtrl: NavController,
    private fbauth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

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
}
