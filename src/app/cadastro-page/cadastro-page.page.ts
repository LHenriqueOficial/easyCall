import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/model/Usuario';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { Setor } from '../model/areadeTrabalho';
import { SetorService } from './../services/setor.service';
import { Funcao } from './../model/funcao';
import { FuncaoService } from './../services/funcao.service';


@Component({
  selector: 'app-cadastro-page',
  templateUrl: './cadastro-page.page.html',
  styleUrls: ['./cadastro-page.page.scss'],
})
export class CadastroPagePage implements OnInit {
  
  setorSubscription: Subscription;
  public setores = new Array<Setor>();
  funcaoSubscription: Subscription;
  public funcoes = new Array<Funcao>();
  public funcao: Funcao={};
  public setor: Setor= {};
  public usuario: Usuarios= {};
  public listSetor: Array<string> = ['Solda', 'Pintura Automática', 'Montagem', 'Silos', 'Corte e Dobra',
'Pintura Manual', 'Corte e Perfil','Expedição', 'Montagem Externa', 'Administrativo','Manutenção','Gerência']
 public listFuncao: Array<string>= ['Operador 1','Operador 2','Operador 3', 'Montador 1', 'Montador 2', 'Montador 3','Operador 3','Auxiliar de Produção','Lider de Produção',
'Programador de Manutenção', 'Auxiliar Adm','Técnico de Segurança','Supervisor de Produção','Eletricista de Manutenção',
'Gerente Industrial','Auxiliar de Manutenção', 'Diretor Industrial', 'Mecânico de Manutenção','Robotista','Torneiro','']
  


  constructor(
    public fbauth: AngularFireAuth ,
    public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, 
    public navCtrl : NavController,
    public setorService: SetorService,
    public funcaoService: FuncaoService,)
     { 
    this.usuario=new Usuarios()
    this.setorSubscription = this.setorService.getSetores().subscribe( data =>{
    this.setores =data;

      console.log("teste setor"+ this.setores)
    })

    this.funcaoSubscription = this.funcaoService.getFuncoes().subscribe(data =>{
      this.funcoes = data;
    })
  
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.funcaoSubscription.unsubscribe();
    this.setorSubscription.unsubscribe();
  }
showScreen(nomeDaPagina: string){
  this.navCtrl.navigateForward(nomeDaPagina)
};

cadastrarUsuario(){
  // metodo para cadastrar usuarios

  const newUser = this.fbauth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha).then
  (result=>{
    let users = this.fbstore.collection("Usuarios")
    users.add({
      nome:this.usuario.nome,
      email:this.usuario.email,
      senha:this.usuario.senha,
      setor:this.usuario.setor,
      funcao:this.usuario.funcao,
      userId:result.user.uid
    }).then( async ()=>{

      const alert = await this.AlertCtrl.create({
        header:'mensagem',
        subHeader:'',
        message:'Usuário Cadastardo com Sucesso',
        buttons:['Ok']
      });
      console.log("sdffffffffffff" + newUser);
      await alert.present();

      /// autenticando o usuario apos autenticação 
this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(()=>{

 this.fbauth.authState.subscribe(async users=>{
   if(users)
   {
    const alert = await this.AlertCtrl.create({
      header:'mensagem',
      subHeader:'',
      message:'usuario autenticado',
      buttons:['Ok']
    });
    await alert.present();
    this.showScreen('home-page');
   }
 })
    
  });
  
      }).catch( async ()=>{
        const alert = await this.AlertCtrl.create({
          header:'Menssagem',
          subHeader:'',
          message:'Erro ao Cadastrar Usuário',
          buttons: ['Ok']
        });
  
        await alert.present();
    })
  })
}

}
