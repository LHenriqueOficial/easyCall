import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, } from '@ionic-native/push/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from 'angularfire2/';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';



var firebaseConfig = {
  apiKey: "AIzaSyB2psULi-javvihmMxt6Y4JAcayqkjjrcI",
  authDomain: "projeto-easycall.firebaseapp.com",
  databaseURL: "https://projeto-easycall.firebaseio.com",
  projectId: "projeto-easycall",
  storageBucket: "projeto-easycall.appspot.com",
  messagingSenderId: "939457695907",
  appId: "1:939457695907:web:64c15bcedbf25b7875af16",
  measurementId: "G-XFZBL4KTKJ"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,AngularFirestoreModule, AngularFireAuthModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
