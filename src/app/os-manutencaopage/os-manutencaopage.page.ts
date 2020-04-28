import { Component, OnInit } from '@angular/core';
import { Ordem } from './../model/ordem';
import { Subscription } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { OrdemService } from '../services/ordem.service';

@Component({
  selector: 'app-os-manutencaopage',
  templateUrl: './os-manutencaopage.page.html',
  styleUrls: ['./os-manutencaopage.page.scss'],
})
export class OsManutencaopagePage implements OnInit {
  private ordemId: string = null;
  public ordem = new Array<Ordem>();
  private loading: any;
  private ordemSubscription: Subscription
  
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCrl: ToastController,
    private ordemService: OrdemService,
    ) { 
      this.ordemSubscription = this.ordemService.getOrdens().subscribe(data =>{
        this.ordem = data;
      })
      

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.ordemSubscription) this.ordemSubscription.unsubscribe();
  }

}
