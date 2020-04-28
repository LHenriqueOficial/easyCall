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
  usuariomensagem: string

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


  constructor(
    private falhaService: FalhaService,
    public fbauth: AngularFireAuth,
    private equiService : EquipamentosService,
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

      this.equipamentoSubscrible = this.equiService.getEquipamentos().subscribe(data =>{
        this.equipamentos = data;
      })
      this.ordemId = this.activatedRoute.snapshot.params['id'];

    // if (this.ordemId) this.loadOrdem();

      
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
  try {
    await this.ordemService.addOrdem(this.ordem);
    
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
  
}


