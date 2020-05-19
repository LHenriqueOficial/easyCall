import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { bindCallback } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  public appPages = [
    {
      title: 'Pagina Inicial',
      url: '/home-page',
      icon: 'home',
    },
    {
      title: 'Abrir Ordem de Serviço',
      url: '/abrir-os-page',
      icon: 'newspaper'
    },
    {
      title: 'Mensagens Usuários',
      url: '/menssagem-page',
      icon: 'send',
      
    },
    {
      title: 'Status Ordem de Serviço',
      url: '/status-os-page',
      icon: 'git-compare'
    },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fbauth: AngularFireAuth,
    public navCtrl : NavController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logOut(){
    this.fbauth.auth.signOut();
    this.navCtrl.navigateForward('inicial-page')
  }
}
