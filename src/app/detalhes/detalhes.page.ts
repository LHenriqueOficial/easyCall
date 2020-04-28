import { Component, OnInit } from '@angular/core';
import { Ordem } from '../model/ordem';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { OrdemService } from './../services/ordem.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  private loading: any;
  private ordem: Ordem = {};
  ordemId: string= null;
  private ordemSubscription: Subscription;
  nomeUser: any;
  setor: any;
  funcao: any;
  result: string
  teste: any;
  comparador: any = 1;
  valorBotao: any;
  valorBotao2: any;
  

  constructor(
    private AuthService: AuthService,
    private loadingCtrl: LoadingController,
    private ordemService: OrdemService,
    private toast: ToastController,
    private activatedRoute: ActivatedRoute,
    public fbauth: AngularFireAuth,
    private db : AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {

    this.ordemId = this.activatedRoute.snapshot.params['id'];
    if(this.ordemId) this.loadOrdem();
     
   }

  ngOnInit() {

    this.fbauth.authState.subscribe(user=>{
      if (user)

    

      
      {
        let uid = user.uid;
        console.log("autenticado: " + user.uid)
        uid = user.uid;
        console.log("teste uid  " + uid)
        let users=this.db.collection("Usuarios")
        users.ref.where("userId", "==", uid).get().then(result=>{
     
               result.forEach(element =>{
                 this.nomeUser=element.data().nome
                 this.setor= element.data().setor
                 this.funcao=element.data().funcao
                 console.log("executante  " + this.nomeUser)
                 console.log("teste uid  " + this.funcao)
                 console.log("teste uid  " + this.setor)
                 console.log("teste ordem   " + this.ordem.nome)

                 console.log(" hora 1 " + this.ordem.horaInicio)
                 console.log( " hora 2 " + this.ordem.horaInicioExecucao)
                 console.log( " hora 3 " + (this.ordem.horaInicioExecucao - this.ordem.horaInicio))
                 this.teste = new Date().getTime();

                this.result = ((this.teste - this.ordem.horaInicio)/ 1000 / 60).toFixed(2)
               if(this.ordem.tempoServico > this.comparador ){
                 this.result = this.ordem.tempoServico;
                  this.valorBotao = "true";
               }
               if (this.ordem.horaInicioExecucao > this.comparador ){
                this.valorBotao2 = "true";
               }
               console.log("valor do botao 2 " + this.valorBotao2)
                 
               
                console.log( " result " + result)
               })
            })
      }
      else{
        console.log("nao autenticado")
      }
    })
   
  
  }
  ngOnDestroy() {
    if (this.ordemSubscription) this.ordemSubscription.unsubscribe();
  }

  loadOrdem(){
    this.ordemSubscription = this.ordemService.getOrdem(this.ordemId).subscribe(data =>{
      this.ordem = data;
      
    })
  }

  async saveOrdem(){
    await this.presentLoading();

    if(this.ordemId){
      try{
        this.ordem.horaInicioExecucao = new Date().getTime();
        this.ordem.status =' Em execução'
        await this.ordemService.updateOrdem(this.ordemId, this.ordem);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/os-manutencaopage')
      }catch(error){
        this.presentToast('Erro ao tentar salvar os dados')
        this.loading.dismiss();
      }
    }

  }

  async finalizaOrdem(){
    await this.presentLoading();

    if(this.ordemId){
      try{
        this.ordem.horaFinalizacao = new Date().getTime();
        this.ordem.status =' Finalizada'
        this.ordem.tempoServico = this.result
        await this.ordemService.updateOrdem(this.ordemId, this.ordem);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/os-manutencaopage')
      }catch(error){
        this.presentToast('Erro ao tentar salvar os dados')
        this.loading.dismiss();
      }
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
