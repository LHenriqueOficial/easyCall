import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../model/Usuario';
import { Falhas } from './../model/falhas';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { FalhaService } from './../services/falha.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { unescapeIdentifier } from '@angular/compiler';
import { element } from 'protractor';
import { Ordem } from './../model/ordem';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { OrdemService } from './../services/ordem.service';
import { ActivatedRoute } from '@angular/router';
import { EquipamentosService } from '../services/equipamentos.service';
import { Equipamentos } from './../model/equipamentos';
import { Contagem } from './../model/contagem';
import { ContagemService } from './../services/contagem.service';


@Component({
  selector: 'app-abrir-os-page',
  templateUrl: './abrir-os-page.page.html',
  styleUrls: ['./abrir-os-page.page.scss'],
})
export class AbrirOsPagePage implements OnInit {
  public falhas = new Array<Falhas>();
  public equipamentos = new Array<Equipamentos>();
  public usuario: Usuarios= {};
  public ordem: Ordem= {};
  public equipamento: Equipamentos={};
  public contagem:Contagem={};

  private falhasSubscription: Subscription;
  private equipamentoSubscrible: Subscription;
  private usuarioSubscription: Subscription;
  private ordemSubscription: Subscription;
  public users = new Array<Usuarios>();
  nomeUser: any;
  funcao: any;
  setor: any;
  loading: any;
  ordemId: any;
  usuariot: any = []
  equipList: any = []
  equipId: any = null;
  contaId: string = null;
  tempoAcc: any;
  public qtdParada: number;
  public somaQtdPara: number = 1;
  idconta: string;
  public valorConta:number;
  public contaespera: number;



  constructor(
    private falhaService: FalhaService,
    public fbauth: AngularFireAuth,
    private equipServise : EquipamentosService,
    private contaServise: ContagemService,
    public db : AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ordemService: OrdemService,
    private equipService: EquipamentosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    ) { 

     

      this.falhasSubscription= this.falhaService.getFalhas().subscribe(data =>{
        this.falhas = data;
        // console.log("kfljdlkfjfd" + this.falhas);
      });

      this.equipamentoSubscrible = this.equipServise.getEquipamentos().subscribe(data =>{
        this.equipamentos = data;
      })
      this.ordemId = this.activatedRoute.snapshot.params['id'];

    // if (this.ordemId) this.loadOrdem();

    this.carregaValorContagem();

      
    }
 
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
                 this.nomeUser=element.data().nome
                 this.setor= element.data().setor
                 this.funcao=element.data().funcao
                 console.log("teste uid  " + this.nomeUser)
                 console.log("teste uid  " + this.funcao)
                 console.log("teste uid  " + this.setor)
                 console.log("teste ordem   " + this.ordem.nome)
                 console.log("teste usuario t  " + this.usuariot)
               })
            })
      }
      else{
        console.log("nao autenticado")
      }
    })
  }
  ////////////////////////////////////
  /////////////////////////////////

  ngOnDestroy() {
    this.falhasSubscription.unsubscribe();
  }

// 

// loadOrdem() {
//   this.ordemSubscription = this.ordemService.addOrdem(this.ordemId).subscribe(data => {
//     this.ordem = data;
//   });
// }


async saveOs(){
  await this.presentLoading();
  this.ordem.horaInicio = new Date().getTime();
  // .toISOString();;
this.ordem.status = "Aguardando..."
this.ordem.cor="danger"
 let lista=this.db.collection<Equipamentos>("Equipamentos")
 
   lista.ref.where("descricao", "==", this.ordem.equipamento).get().then(res =>{
    
    res.forEach(doc => {
      this.equipList.push(doc.data())
      console.log(doc.id, ' => ' , doc.data())
      this.equipId = doc.id;
      console.log("eeeeeeeeeeeee id do equipamento print 1" + this.equipId )  
    });
  })

  let equip=this.db.collection("Equipamentos")
   equip.ref.where("descricao", "==", this.ordem.equipamento).get().then(result=>{
    result.forEach(element =>{
      this.tempoAcc=element.data().tempo
      this.qtdParada= element.data().qtdParada
      // console.log("tempo de parada   " + this.tempoAcc)
      // console.log("quantidade de parada  base de dados print 2  " + this.qtdParada)
      // console.log("somando mais 1 para variavel  print 3 " + (this.qtdParada + this.somaQtdPara) ) 

      this.equipamento.qtdParada = Number(this.qtdParada + this.somaQtdPara)
      // soma numero de Ordem de serviço

      this.equipService.updateEquipamento(this.equipId, this.equipamento)
    })
 })
 
  try {
    await this.ordemService.addOrdem(this.ordem);
    this.carregaContagem();
    console.log("valor conta 2222  " + this.contagem.contaOs)
    console.log("valor salvo com sucesso   ")


    await this.loading.dismiss();

    this.navCtrl.navigateBack('/status-os-page');
  } catch (error) {
    this.presentToast('Erro ao tentar salvar');
    this.loading.dismiss();
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
      this.contagem.contaOs = Number(this.valorConta + this.somaQtdPara)
      console.log("testa contaOsEmEspera antes  " + this.contaespera )  
      this.contagem.contaOsEmEspera = Number(this.contaespera + this.somaQtdPara)
      console.log("testa contaOsEmEspera depois  " + this.contagem.contaOsEmEspera )  

      this.contaServise.updateContagem(this.contaId, this.contagem)
      
    });
  })
  }
  
}


