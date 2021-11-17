import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DBTaskService } from 'src/app/services/dbtask.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register:any={
    Usuario:"",
    Password:"",
    Password2:""

  }
  field:string="";
  constructor(
    public dbtaskService: DBTaskService,
    public toastController: ToastController,
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  guardar(){
    this.createSesionData(this.register);
    
  }

  validateModel(model:any){
    console.log(model.Password2);
    if(model.Password != model.Password2){
      this.presentToast("Las contraseñas deben ser iguales");
      return false;
    } else{
      // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
      for (var [key, value] of Object.entries(model)) {
        // Si un valor es "" se retornara false y se avisara de lo faltante
        if (value=="") {
          // Se asigna el campo faltante
          this.field=key;
          // Se retorna false
          this.presentToast("Falta completar los datos");
          return false;
        }
      }
      this.router.navigate(["/login"]);
      return true;
    }
  }

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
