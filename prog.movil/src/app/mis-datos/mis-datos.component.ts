import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/model/NivelEducacional';
import { Persona } from 'src/model/Persona';
import { Storage } from '@ionic/storage';
import { DBTaskService } from '../services/dbtask.service';



@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
@Injectable({
  providedIn: 'root'
})

export class MisDatosComponent implements OnInit {

  

  ngOnInit() {
    this.getUser();
    this.getDatos();
    this.dbtaskService.getSession();
  }
  usuario:String;
  constructor(
    public alertController: AlertController,
    private storage: Storage,
    public dbtaskService: DBTaskService,
    ) {

  }
  public nivelesEducacionales: NivelEducacional[] = [
    {id: 1, nombre: 'Básica Incompleta'},
    {id: 2, nombre: 'Básica Completa'},
    {id: 3, nombre: 'Media Incompleta'},
    {id: 4, nombre: 'Media Completa'},
    {id: 5, nombre: 'Superior Incompleta'},
    {id: 6, nombre: 'Superior Completa'}
  ];

  public data: Persona = new Persona();
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
    
    // console.log(this.data);
    
  }

  getUser(){
    this.storage.get("USER_DATA").
    then((response)=>{
      this.usuario = response.user_name;
      
    })
  }

  postDatos(){
    this.dbtaskService.createDatos(this.usuario, this.data).
      then((response)=>{
        console.log("logrado");
        
      })
      .catch((response)=>{
        console.log(response);
        
      })
  }

  getDatos(){
    this.dbtaskService.getDatos(this.usuario).
      then((response)=>{
        console.log("datos obtenidos");
        console.log(response);
        
        
      })
      .catch((response)=>{
        
        console.log("no se obtuvo los datos");
        
        
      })
  }

  deleteDatos(){
    this.dbtaskService.deleteDatos(this.usuario)
      .then(()=>{
        console.log("Datos eliminados");
        
      })
      .catch(()=>{
        console.log("No se pudo eliminar datos");
        
      })
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
