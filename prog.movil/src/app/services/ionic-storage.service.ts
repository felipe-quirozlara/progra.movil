import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageService {

  constructor(
    public storage: Storage
  ) { }

  postExperiencia(user:String,data:any){
    this.storage.set('experencia'+user, JSON.stringify(data))
      .then(response=>console.log("Datos guardados"))
      .catch(response=>console.log("No se pudo guardar los datos"))
  }

  postDatos(user:String,data:any){
    this.storage.set('datos'+user, JSON.stringify(data))
      .then(response=>console.log("Datos guardados"))
      .catch(response=>console.log("No se pudo guardar los datos"))
  }
  

}
