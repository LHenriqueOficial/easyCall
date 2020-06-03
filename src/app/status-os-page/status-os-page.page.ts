import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { OrdemService } from '../services/ordem.service';
import { ActivatedRoute } from '@angular/router';
import { FalhaService } from '../services/falha.service';
import { Subscription } from 'rxjs';
import { StatusOs } from './../model/status-os';
import { StatusOsService } from './../services/status-os.service';
import { Ordem } from '../model/ordem';
import { Equipamentos } from '../model/equipamentos';
import { EquipamentosService } from '../services/equipamentos.service';

@Component({
  selector: 'app-status-os-page',
  templateUrl: './status-os-page.page.html',
  styleUrls: ['./status-os-page.page.scss'],
})
export class StatusOsPagePage implements OnInit {

  private statusOsSubscription: Subscription;
  private ordemSubscription: Subscription;
  private equipamentoSubscription: Subscription
   private equipamentoSubscrible: Subscription
  public equipamento: Equipamentos={};
  
  nomeEquip: string= null;
  public statusOs = new Array<StatusOs>();
  public equipamentos = new Array<Equipamentos>();
  public ordem = new Array<Ordem>();
  public cor:any =" dark";
  qtdParada: any;
  tempoAcc: any;
  equipId: string;
  equipList: any = []
  somaQtd: number =1;
  status: string= null;
 

  constructor(
    private falhaService: FalhaService,
    public fbauth: AngularFireAuth,
    public db : AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ordemService: OrdemService,
    private statusService: StatusOsService,
    private equipServise: EquipamentosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.status = this.activatedRoute.snapshot.params['valor'];

   
if(this.status == 'Aguardando...'){

this.carregaStatus(this.status)

}else if(this.status == 'Em Execução'){
  this.carregaStatus(this.status)

}else if(this.status == 'Finalizada'){
  this.carregaStatus(this.status)
}
else{
  this.status = "";
  this.carregaDados();
}
  

  

  

    // this.statusOsSubscription = this.statusService.getStatus().subscribe(data =>{
    //   this.statusOs =data; 
    // })
    // this.ordemSubscription = this.ordemService.getOrdens().subscribe(data =>{
    //   this.ordem = data;
    // })
    
    // this.equipamentoSubscrible = this.equipServise.getEquipamentos().subscribe(data =>{
    //   this.equipamentos = data;
    // })

  }

  ngOnInit() {

  }
  ngOnDestroy() {
    if (this.ordemSubscription) this.ordemSubscription.unsubscribe();
    if(this.equipamentoSubscription) this.equipamentoSubscription.unsubscribe();
  }

  carregaDados() {
    let lista=this.db.collection<Ordem>("Ordem")
   
     lista.ref.orderBy("status", "asc" ).get().then(res =>{
      
      res.forEach(doc => {
        this.ordem.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
        this.equipId = doc.id;
        console.log("eeeeeeeeeeeee" + this.equipId+ " tempo ")  
      });
    })
  }

  carregaStatus(valor: string) {
    let lista=this.db.collection<Ordem>("Ordem")
   
     lista.ref.where("status", "==", valor ).get().then(res =>{
      
      res.forEach(doc => {
        this.ordem.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
        this.equipId = doc.id;
        console.log("eeeeeeeeeeeee" + this.equipId+ " tempo ")  
      });
    })
  }
  
  // carregaQtdParadaEquip(){
  //   let equip=this.db.collection("Equipamentos")
  //    equip.ref.where("descricao", "==", this.nomeEquip).get().then(result=>{
  //     result.forEach(element =>{
  //       this.tempoAcc=element.data().tempo
  //       this.qtdParada= element.data().qtdParada
  //       // console.log("tempo de parada   " + this.tempoAcc)
  //       console.log("quantidade de parada dase de dados   " + this.qtdParada)
  //       // console.log("calculo minuto "+ (this.tempoAcc / 1000)/60)   
  //     })
  //  })
  
  // }

  // async atualizaEquipamento(){
  //   console.log("quantidade de parada dentro do atualiza   " + this.qtdParada)

    
  //     try{
  //       this.equipamento.qtdParada = (this.qtdParada + this.somaQtd);
  //       // var numberValue = Number(stringToConvert);
  //     //  await this.equipServise.updateEquipamento(this.equipId, this.equipamento);
        
  //     }catch(error){
  //       this.presentToast('Erro ao tentar salvar os dados')
       
  //     }

  // }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina)
  };

  
}
