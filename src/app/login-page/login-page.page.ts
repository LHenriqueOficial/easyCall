import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/model/Usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  usuario:Usuarios;
  private loading: any;
  constructor(public fbauth: AngularFireAuth,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public fbstore:AngularFirestore, 
    public AlertCtrl :AlertController, public navCtrl : NavController) { 
    this.usuario=new Usuarios()
  }

  ngOnInit() {

    this.fbauth.authState.subscribe(user=>{
      if (user)
      {
        console.log("autenticado: " + user.uid)
      }
      else{
        console.log("nao autenticado")
      }
    })
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }


  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.usuario);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }
  // loginUsuario(){
  //   this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(()=>{
  //     this.showScreen('home-page')

  //   })
  //   .catch(async ()=>{
  //     const alert = await this.AlertCtrl.create({
  //       header:'Menssagem',
  //       subHeader:"",
  //       message:'Login ou Senha está incorreto',
  //       buttons:['Ok']
  //     });
  //     await alert.present();
  //   })
  // };
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
