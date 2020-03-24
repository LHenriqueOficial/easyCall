import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Model/Usuario';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.page.html',
  styleUrls: ['./usuarios-page.page.scss'],
})
export class UsuariosPagePage implements OnInit {
  
  listaUsuarios:Usuarios[]=[]
  constructor(public navCrl: NavController, public route: Router, public fbauth: AngularFireAuth, public fbstore:AngularFirestore,
    public AlertCtrl: AlertController ) { }

  ngOnInit() {

    this.listarUsuarios();
  }

  listarUsuarios(){

    // verifica se o usuario esta logado 
    this.fbauth.authState.subscribe(user=>{
      if(user)
      {
        // se estiver logado lista usuarios
        let users=this.fbstore.collection("Usuarios")

        // filtrar usuario com uid maior que logado 
        users.ref.where("userId",">",user.uid).get().then(result=>{
          result.forEach(element =>{
            let usuario =new Usuarios()
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userId =element.id
            this.listaUsuarios.push(usuario)
          }); 
        })

        // filtrar usuario com uid menor que logado 
        users.ref.where("userId","<",user.uid).get().then(result=>{
          result.forEach(element =>{
            let usuario =new Usuarios()
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userId =element.id
            this.listaUsuarios.push(usuario)
          }); 
        })

      }
    
    })
    
  }

  irPaginaMensagens(userId){
    // obs  apara passar parametro utilizar rota e em app-routnga no nome da pagina   menssagem/:id 
    this.route.navigate(['/menssagem-page/' + userId])
  }

}
