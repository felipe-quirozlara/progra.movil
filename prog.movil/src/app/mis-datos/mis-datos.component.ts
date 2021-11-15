import { Component, NgModule, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NivelEducacional } from 'src/model/NivelEducacional';
import { Persona } from 'src/model/Persona';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicStorageService } from '../services/ionic-storage.service';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})


export class MisDatosComponent implements OnInit {

  

  ngOnInit() {
    this.getUser();
  }
  usuario:String;
  public niveles:NivelEducacional[]=[
    {id: 1, nombre: 'Básica Incompleta'},
    {id: 2, nombre: 'Básica Completa'},
    {id: 3, nombre: 'Media Incompleta'},
    {id: 4, nombre: 'Media Completa'},
    {id: 5, nombre: 'Superior Incompleta'},
    {id: 6, nombre: 'Superior Completa'}
  ]
  public data: Persona = new Persona();
  constructor(public alertController: AlertController,private router: Router,private storage:Storage, private ionicStorage:IonicStorageService) {

  }
  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */
  limpiar(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    // IF
    (this.data.nombre!="" && this.data.apellido!="") &&
    // THEN 
    this.presentAlert("Usuario","Su nombre es "+this.data.nombre+" "+this.data.apellido) ||
    // ELSE 
    this.presentAlert("Usuario","No ingreso nada");
  }

  goApipage(){
    this.router.navigate(['/api-page']);
  }

  getUser(){
    this.storage.get("USER_DATA")
      .then((data)=>{
        this.usuario = data.user_name
      })
  }

  saveUser(){
    this.ionicStorage.postExperiencia(this.usuario, this.data);
  }

  getUserdata(){
    this.storage.get("USER_DATA")
    .then(response=>{
      this.storage.get('datos'+response.user_name)
        .then(cal=>{
          let datos = JSON.parse(cal)
          this.data.nombre = datos.nombre;
          this.data.apellido = datos.apellido;
          this.data.fechaNacimiento = datos.fechaNacimiento;
          this.data.nivelEducacional = datos.nivelEducacional;
                   
        })
        .catch(err=>console.log()
        )
      
      this.usuario = response.user_name;
      
    })
  }

  deleteData(){
    this.storage.remove('datos'+this.usuario)
    .then(cal=>console.log("Datos removido"))
    .catch(cal=>console.log("No se pudo eliminar datos"))
    for (const [key, value] of Object.entries(this.data)) {
  
      Object.defineProperty(this.data, key, {value: ''});
    }
  }

  goQRpage(){
    this.router.navigate(['/qrreader']);
  }

  go404(){
    this.router.navigate(['/sdfsd'])
  }

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
