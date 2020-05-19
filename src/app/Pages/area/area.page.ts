import { Component, OnInit } from '@angular/core';
import { Area } from './../../model/area';
import { Subscription } from 'rxjs';
import { AreaService } from './../../services/area.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {
  public areas = new Array<Area>();
  public area: Area={};
  private areaSubscription: Subscription;
  loading: any;
  areaId: string;


  constructor(
    private areaservice: AreaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.areaSubscription= this.areaservice.getAreas().subscribe(data =>{
      this.areas = data;
      
    });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.areaSubscription.unsubscribe();
  }

  async saveArea() {

    await this.presentLoading();

    if (this.areaId) {
      try {
        await this.areaservice.updateArea(this.areaId, this.area);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/area');

      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
     
      try {
        
        this.area.diasTrabalhados =0 ;
        this.area.disponibilidade=0;
        this.area.horastrabalhadas=0 ;
        await this.areaservice.addArea(this.area);
        this.area.descricao="";
     
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/area');
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
