//
//CONTROLADOR
//
import { Component, OnInit } from '@angular/core';
// Las clases Router y NavigationExtras son necesarias para que la página login le pase el nombre de usuario a la página home
import { Router, NavigationExtras } from '@angular/router';
// La clase ToastController sirve para mostrar mensajes emergente que duran un par de segundos
import { AnimationController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 

  public usuario: Usuario;
 
  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {
    //metodos de animación
    const image = this.animationCtrl.create()
      .addElement(document.querySelector('.qrImage'))
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        {offset: 0, transform: 'scale(1)'},
        {offset: 0.5, transform: 'scale(1.1)'},
        {offset: 1, transform: 'scale(1)'},

        
      ]);

    image.play();

    
     this.usuario.nombreUsuario = 'cgomez';
     this.usuario.password = '1234';
    //  this.ingresar();
  }

  public restablecer(): void {
    this.router.navigate(['/restablecer']);
  }; 

  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');


    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
  }

 
  public validarUsuario(usuario: Usuario): boolean {

    const mensajeError = usuario.validarUsuario();

    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  toggled: boolean = false;
  emojitext: string;
  
  handleSelection(event) {
    this.emojitext = this.emojitext + " " + event.char;
  }
  public limpiar(){
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

}