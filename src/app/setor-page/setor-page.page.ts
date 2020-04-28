import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipamentosService } from '../services/equipamentos.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { SetorService } from '../services/setor.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Setor } from '../model/setor';

@Component({
  selector: 'app-setor-page',
  templateUrl: './setor-page.page.html',
  styleUrls: ['./setor-page.page.scss'],
})
export class SetorPagePage implements OnInit {

  public setores = new Array<Setor>();
  public setor: Setor ={};
  private loading: any;
  private setorSubscription: Subscription;
  private setorId: string = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private equiService : EquipamentosService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private setorservice: SetorService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {

    this.setorSubscription = this.setorservice.getSetores().subscribe(data =>{
      this.setores = data;
    });

   }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.setorSubscription) this.setorSubscription.unsubscribe();

  }

  loadSetor() {
    this.setorSubscription = this.equiService.getequipamento(this. setorId).subscribe(data => {
      this.setor = data;
    });
  }


  async saveSetor() {

    await this.presentLoading();

    if (this.setorId) {
      try {
        await this.equiService.updateEquipamento(this.setorId, this.setor);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/setor-page');

      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
     
      try {
        await this.setorservice.addSetor(this.setor);
        this.setor.descricao =""
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/setor-page');
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
