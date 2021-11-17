import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  constructor(
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  login(){
    this.presentToast("Se ha enviado un correo electrónico para recuperar la contraseña");
    this.router.navigate(['/login'])
  }

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
}
