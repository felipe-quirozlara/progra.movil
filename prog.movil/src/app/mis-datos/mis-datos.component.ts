import { Component, NgModule, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NivelEducacional } from 'src/model/NivelEducacional';
import { Persona } from 'src/model/Persona';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})


export class MisDatosComponent implements OnInit {

  

  ngOnInit() {}
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
  constructor(public alertController: AlertController) {

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

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
