import { Component, OnInit } from '@angular/core';
import { Ordem } from '../model/ordem';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { OrdemService } from './../services/ordem.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Equipamentos } from './../model/equipamentos';
import { EquipamentosService } from '../services/equipamentos.service';
import { element } from 'protractor';
import { Contagem } from '../model/contagem';
import { ContagemService } from './../services/contagem.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  private loading: any;
  public ordem: Ordem = {};
  public equipament = new Array<Equipamentos>();
  private equipamento: Equipamentos={};
  public contagem:Contagem={};
  ordemId: string= null;
  nomeEquip: string= null;
  equipId : string =null;
  equipList: any = []
 

  private ordemSubscription: Subscription;
  private equipamentoSubscription: Subscription;
  nomeUser: any;
  setor: any;
  funcao: any;
  result: any
  tempoResp: string;
  teste: any;
  comparador: any = 1;
  valorBotao: any;
  valorBotao2: any;
  tempoAcc: number;
  qtdParada: any;
  accResp: any;
  contaId: string;
  valorConta: number;
  contaespera: number;
  subtraiOs: number =1;
  contaexecucao:number;
  contaFinalizada:number;
  

  constructor(
    private AuthService: AuthService,
    private loadingCtrl: LoadingController,
    private ordemService: OrdemService,
    private equipServise: EquipamentosService,
    private toast: ToastController,
    private activatedRoute: ActivatedRoute,
    public fbauth: AngularFireAuth,
    private db : AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private contaServise: ContagemService
  ) {

    this.ordemId = this.activatedRoute.snapshot.params['id'];
    this.nomeEquip = this.activatedRoute.snapshot.params['equipamento'];
   if(this.ordemId) this.loadOrdem();
    // this.loadEquipamento();
    this.carregaDados();
    this.carregaTime();
    this.carregaValorContagem()
    this.carregaContagem()
     
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
                 console.log(" hora 99898989 " + this.ordem.horaInicio )
                 console.log( " hora 2 " + this.ordem.horaInicioExecucao)
                 console.log( " hora 3 " + (this.ordem.horaInicioExecucao - this.ordem.horaInicio))
                 // calculo de converção de minutos 
                 this.teste = new Date().getTime();
                this.result = ((this.teste - this.ordem.horaInicio)/ 1000 / 60).toFixed(2)
               if(this.ordem.tempoServico > this.comparador ){
                 this.result = this.ordem.tempoServico;
                  this.valorBotao = "true";
               }
               if (this.ordem.horaInicioExecucao > this.comparador ){
                this.valorBotao2 = "true";
               }
               if(this.ordem.status == "Aguardando..."){
                this.valorBotao = "true";

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
// loadEquipamento(){
//   this.equpamentoSubscription = this.equipServise.getequipamento(this.nomeEquip).subscribe(data=>{
//     this.equipamento = data;
//   })
// }
  // carregada dados da coleção do equipamento utilizando o nome do equipamento como parametro 

carregaDados() {
  let lista=this.db.collection<Equipamentos>("Equipamentos")
 
   lista.ref.where("descricao", "==", this.nomeEquip).get().then(res =>{
    
    res.forEach(doc => {
      this.equipList.push(doc.data())
      console.log(doc.id, ' => ' , doc.data())
      this.equipId = doc.id;
      console.log("eeeeeeeeeeeee" + this.equipId+ " tempo ")  
      
    });
  })
}

// pega valores inidividuais da coleção
carregaTime(){
  let equip=this.db.collection("Equipamentos")
   equip.ref.where("descricao", "==", this.nomeEquip).get().then(result=>{
    result.forEach(element =>{
      this.tempoAcc=element.data().tempo
      this.qtdParada= element.data().qtdParada
      this.accResp= element.data().accResposta
      // console.log("tempo de parada   " + this.tempoAcc)
      // console.log("quantidade de parada   " + this.qtdParada)
      // console.log("calculo minuto "+ (this.tempoAcc / 1000)/60)   
    })
 })

}

  async saveOrdem(){
    await this.presentLoading();

    if(this.ordemId){
      try{
        this.ordem.horaInicioExecucao = new Date().getTime();
        this.ordem.status ='Em Execução'
        this.ordem.cor = 'warning'
        this.ordem.tempoResposta = this.result;
        this.equipamento.accResposta = this.accResp + Number(this.result)
        this.contagem.contaOsEmEspera = Number(this.contaespera - this.subtraiOs)
        this.contagem.contaOsExecucao = Number(this.contaexecucao + this.subtraiOs)
      this.contaServise.updateContagem(this.contaId, this.contagem)
        await this.ordemService.updateOrdem(this.ordemId, this.ordem);
        this.equipServise.updateEquipamento(this.equipId, this.equipamento);

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
        this.ordem.status ='Finalizada'
        this.ordem.cor ='success'
        this.ordem.tempoServico = this.result
        this.ordem.descAtividade
        await this.ordemService.updateOrdem(this.ordemId, this.ordem);
        this.equipamento.tempo = this.tempoAcc + Number(this.result);
        this.contagem.contaOsExecucao = Number(this.contaexecucao - this.subtraiOs)
        this.contagem.contaOsFinalizada = Number(this.contaFinalizada + this.subtraiOs)
      this.contaServise.updateContagem(this.contaId, this.contagem)
        // var numberValue = Number(stringToConvert);
        this.equipServise.updateEquipamento(this.equipId, this.equipamento);
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

  carregaValorContagem(){
    let conta=this.db.collection("Contagem")
    conta.ref.where("id", "==", 1).get().then(result=>{
     result.forEach(element =>{
       this.valorConta=element.data().contaOs
       this.contaespera=element.data().contaOsEmEspera
       this.contaexecucao=element.data().contaOsExecucao
       this.contaFinalizada = element.data().contaOsFinalizada
       console.log("valor conta  " + this.valorConta)
     })
  })
  }

  carregaContagem(){
    let lista=this.db.collection<Contagem>("Contagem")
 
   lista.ref.where("id", "==", 1).get().then(res =>{
    
    res.forEach(doc => {
      this.equipList.push(doc.data())
      console.log(doc.id, ' => ' , doc.data())
      this.contaId = doc.id;
      // console.log("eeeeeeeeeeeee id do equipamento print 1 " + this.contaId )  
      
    });
  })
  }

}
