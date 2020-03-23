import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicial-page',
  templateUrl: './inicial-page.page.html',
  styleUrls: ['./inicial-page.page.scss'],
})
export class InicialPagePage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }
}
