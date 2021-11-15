import { Component, OnInit } from '@angular/core';
import { IonicStorageService } from '../services/ionic-storage.service';
import { Storage } from '@ionic/storage';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent implements OnInit {

  constructor(
    public storageIonic:IonicStorageService,
    public dbtask:DBTaskService,
    private storage:Storage
  ) {}

  ngOnInit() {
    this.usuario
    
  }
  
  usuario:String;
  data:any={
    nombreEmpresa:"",
    cargo:"",
    anio:0,
    trabajando:0,
    ano_fin:0
  };

  getUser(){
    this.storage.get("USER_DATA")
      .then((data)=>{
        this.usuario = data.user_name
      })
  }

  

  deleteData(){
    for (const [key, value] of Object.entries(this.data)) {
  
      Object.defineProperty(this.data, key, {value: ''});
    }
    
    
  }

  
  

  

}
