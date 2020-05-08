import { Component, OnInit } from '@angular/core';
import { Equipamentos } from './../model/equipamentos';
import { Subscription } from 'rxjs';
import { EquipamentosService } from './../services/equipamentos.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SetorService } from './../services/setor.service';
import { Setor } from '../model/setor';

@Component({
  selector: 'app-equipamentos-page',
  templateUrl: './equipamentos-page.page.html',
  styleUrls: ['./equipamentos-page.page.scss'],
})
export class EquipamentosPagePage implements OnInit {
  public equipamentos = new Array<Equipamentos>(); 
  public setores = new Array<Setor>();
  public equip: Equipamentos = {};
  public setor: Setor ={};
  private equipamentoId: string = null;
  private loading: any;
  private equipamentoSubscription: Subscription;
  private setorSubscription: Subscription;
 
  // variavel para mostar a lista de equipamentos 
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private equiService : EquipamentosService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private setorservice: SetorService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    
    this.equipamentoSubscription= this.equiService.getEquipamentos().subscribe(data =>{
      this.equipamentos = data;
      this.setorSubscription = this.setorservice.getSetores().subscribe(data =>{
        this.setores = data;
      })
      
    });
    // this. equipamentoId = this.activatedRoute.snapshot.params['id'];
    // if (this. equipamentoId) this.loadEquipamento();

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.equipamentoSubscription) this.equipamentoSubscription.unsubscribe();
    if (this.setorSubscription) this.setorSubscription.unsubscribe();

  }
  loadEquipamento() {
    this.equipamentoSubscription = this.equiService.getequipamento(this. equipamentoId).subscribe(data => {
      this.equip = data;
    });
  }
  

  async saveEquipamento() {

    await this.presentLoading();

    if (this.equipamentoId) {
      try {
        await this.equiService.updateEquipamento(this.equipamentoId, this.equip);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/equipamentos-page');

      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      // this.equipamento.createdAt = new Date().getTime();
     
      
      try {
        this.equip.qtdParada =0;
        this.equip.tempo=0;
        this.equip.accResposta=0;
        await this.equiService.addequipamento(this.equip);
        this.equip.descricao ="";
        this.setor.descricao="";
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/equipamentos-page');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
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
