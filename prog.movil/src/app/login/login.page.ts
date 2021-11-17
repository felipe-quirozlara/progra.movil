import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, AnimationController } from '@ionic/angular';

import { DBTaskService } from '../services/dbtask.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  
  // Modelo user que permite obtener y setear información para el login
  login:any={
    Usuario:"",
    Password:""
  }
  // variable para mostrar el campo faltante
  field:string="";
  // Constructor que llama al toastController para su uso
  constructor(public toastController: ToastController,
    public dbtaskService: DBTaskService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public authenticationSerive:AuthenticationService,
    private animationCtrl: AnimationController,
    public fb: FormBuilder) {
      this.formularioLogin = this.fb.group({
        'nombre': new FormControl("",Validators.required),
        'password': new FormControl("",Validators.required)
      })
    }

  ngOnInit() {
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
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.nombre == f.nombre && usuario.password == f.password){
      console.log('Ingresado');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }

  /**
   * Función que permite el inicio de sesión y acceder
   * al Home
   */
  
  registrar(){
    this.createSesionData(this.login);
  }
  /**
   * Función que genera (registra) una nueva sesión
   * @param login 
   */
  createSesionData(login: any) {
    if(this.validateModel(login)){ // Se valida que se ingresen todos los datos
      /**
       * Se hace una copia del login, se hace así ya que
       * el operador '=' no haceuna copia de los datos, si no
       * que crea una nueva referencia a los mismos datos.
       * Por eso se utiliza el Object.assign
       */
      let copy = Object.assign({},login);
      copy.Active=1; // Se agrega el valor active = 1 a la copia
      this.dbtaskService.createSesionData(copy) // la copia se le apsa a la función para crear la sesion
      .then((data)=>{ // si la sentencia se ejecuto correctamente
        this.presentToast("Bienvenido"); // Se muestra el mensaje de bienvenido
        this.storage.set("USER_DATA",data);  // Se setea el USER_DATA en el storage
        this.router.navigate(['home']); // Se navega hasta el home
      })
      .catch((error)=>{
        this.presentToast("El usuario ya existe");
      })
    }
    else{
      this.presentToast("Falta: "+this.field);
    }
  }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value=="") {
        // Se asigna el campo faltante
        this.field=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
  /**
   * Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }

  deleteData(){
    for (const [key, value] of Object.entries(this.login)) {
  
      Object.defineProperty(this.login, key, {value: ''});
    }
    
    
  }

  restablecer(){
    this.router.navigate(['/restablecer']);
  }
  /**
   * Función parte del ciclo de vida de un componente
   */
  ionViewWillEnter(){
    console.log('ionViewDidEnter');
      // Se valida que exista una sesión activa
      this.dbtaskService.sesionActive()
      .then((data)=>{
        if(data!=undefined){
          this.storage.set("USER_DATA",data); 
          this.router.navigate(['home']);
        }
      })
      .catch((error)=>{
        console.error(error);
        this.router.navigate(['login']);
      })
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message: 'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.login)
          }
        }
      ]
    });

    await alert.present();
  }
}
