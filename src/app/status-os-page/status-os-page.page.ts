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

@Component({
  selector: 'app-status-os-page',
  templateUrl: './status-os-page.page.html',
  styleUrls: ['./status-os-page.page.scss'],
})
export class StatusOsPagePage implements OnInit {

  private statusOsSubscription: Subscription;
  private ordemSubscription: Subscription

  public statusOs = new Array<StatusOs>();
  public ordem = new Array<Ordem>();
  public cor:any =" dark";

  constructor(
    private falhaService: FalhaService,
    public fbauth: AngularFireAuth,
    public db : AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ordemService: OrdemService,
    private statusService: StatusOsService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.statusOsSubscription = this.statusService.getStatus().subscribe(data =>{
      this.statusOs =data; 
    })
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
