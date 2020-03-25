import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mensagens } from './../../Model/Mensagens';
import { Observable } from 'rxjs';
import { Usuarios } from './../../Model/Usuario';
import { element } from 'protractor';

@Component({
  selector: 'app-menssagem-page',
  templateUrl: './menssagem-page.page.html',
  styleUrls: ['./menssagem-page.page.scss'],
})
export class MenssagemPagePage implements OnInit {

  usuariomensagem: string  //usuario pra a meansagem vai ser enviada
  mensagem:Mensagens
  usuario:string    // usuario que envia a mensagem 
  lista:Observable<Mensagens[]>  //  lista de mansagens enviadas como todos os dados   
  listamensagens:Observable<Mensagens[]>
  nomeuser:string


  constructor(public fbauth: AngularFireAuth ,public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, public navCtrl : NavController, public acrroute: ActivatedRoute) {
      this.mensagem=new Mensagens() 

      this.verificarLogin()
      this.listarMensagens()
      this.getUser()

      this.acrroute.paramMap.subscribe((params:ParamMap)=>
      {
        this.usuariomensagem=params.get("id")
        console.log(this.usuariomensagem)
      })
    }

  ngOnInit() {
  }

  getUser(){
    /// busca nome do usuario selecionado pr enviar as mensagens 
    let users=this.fbstore.collection("Usuarios")
     users.ref.where("userId", "==", this.usuariomensagem).get().then(result=>{

       result.forEach(element =>{
         this.nomeuser=element.data().nome
       })
    })
  }


listarMensagens(){

  this.lista=this.fbstore.collection<Mensagens>("Mensagens",ref=>{
    return ref.limit(200).orderBy("data")///  ordena mensagens por dada e limida em 10 
  }).valueChanges()// altera o conteudo dianamicamente 

  this.lista.subscribe(res=>
    {
      this.filtarLista(res)
    })
}

filtarLista(res){

  /// filtar o dados enviados para mostar na tela durante a troca de mensagens 
this.listamensagens=res.filter(t=>(t.de==this.usuario && t.para==this.usuariomensagem)
|| (t.para==this.usuario && t.de==this.usuariomensagem))

console.log(this.listamensagens)
}

  postarMensagem(texto){

    this.mensagem.de =this.usuario
    this.mensagem.para =this.usuariomensagem
    this.mensagem.data = new Date()
    console.log(texto) // apaga depois 

    //// metodo para enviar data para fire estaro na colecao Mensagens
    let mensagens =this.fbstore.collection("Mensagens")
    mensagens.add({
      de:this.mensagem.de,
      para:this.mensagem.para,
      texto:this.mensagem.texto,
      data:this.mensagem.data
    })
  }

  verificarLogin(){
    this.fbauth.authState.subscribe(user=>{
      if(user)
      {
        this.usuario = user.uid
        console.log("autenticado" + user.uid )
      }
      else
      {
        console.log("nao autenticado")
      }
    })
  }
}
