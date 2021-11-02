import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Persona } from 'src/model/Persona';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {

  /**
   * Se declara una variable SQLiteObject y se inicializa en null
   * donde se guardara la instancia de SQLiteObject
   */
  db: SQLiteObject = null;
  
  constructor() { }
  /**
   * Permite guardar un objeto SQLiteObject
   * en la variable db
   */
  setDatabase(db:SQLiteObject) {
    if(this.db===null)
    {
      this.db=db
    };
  }
  /**
   * Crea las tablas necesarias para el funcionamiento
   */
  createTables():Promise<any>{
    let tables=`
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      active INTEGER(1) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS datos_personales
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nombre TEXT,
      apellidos TEXT,
      eduacion TEXT,
      fecha_nacimiento DATE,
      user_name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS experiencia_laboral (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      empresa TEXT,
      ano_inicio DATE,
      trabajando BOOLEAN,
      año termino DATE,
      cargo TEXT,
      user_name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS certificado (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
      nombre TEXT,
      fecha DATE,
      vence BOOLEAN,
      user_name TEXT NOT NULL
    );`;
    return this.db.executeSql(tables);
  };
  

  
  
  /**
   * Retorna si existe un usuario activo o no.
   */
  sesionActive(){
    // Se desarrolla la consulta
    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // Se ejecuta la consulta y no le pasamos parametros [value,value1,...]
    return this.db.executeSql(sql,[])
    // Cuando se ejecute la consulta
    .then(response=>{ // obtenemos lo que devuelve la consulta
      return Promise.resolve(response.rows.item(0)); // Se obtiene el primer item de la consulta y se retorna
    });
  }
  /**
   * Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion:any){
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.Usuario,
      sesion.Password]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });
  }
  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion:any){
    let sql = `INSERT INTO sesion_data(user_name,password,active)
    VALUES(?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario, 
      sesion.Password, sesion.Active]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });;
  }
  updateSesionData(sesion:any){
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.user_name]);
  }

  getSession(){
    let sql = `SELECT * FROM "sesion_data"`
    return this.db.executeSql(sql)
    .then((response)=>{
      return response
    })
    .catch(response=> console.log(response)
    )
  }
  // Crud datos personales
  
  // Datos
  getDatos(user_name:String){
  
      let sql = `SELECT * FROM "datos_personales" WHERE user_name = ?`;
      return this.db.executeSql(sql, [user_name])
        .then((data)=>{
          return data
        })
        .catch((data)=>{
          console.log("no se pudo obtener los datos de usuario");
          
        })
    
    
    
  }
  createDatos(user_name:String, datos:Persona){
    let sql = `INSERT INTO 
    datos_personales(nombre, apellidos, eduacion, fecha_nacimiento, user_name)
    VALUES(?,?,?,?,?)
    `;
    return this.db.executeSql(sql, [datos.nombre, datos.apellido, datos.nivelEducacional.nombre, datos.fechaNacimiento, user_name])
    .then(response=>{
      return console.log("datos creados db");
      })
    .catch(response=>{
      return console.log("No se pudo cargar los datos");
      
    })
    };

  deleteDatos(user_name:String){
    let sql = `DELETE FROM datos_personales WHERE user_name = ?`;
    return this.db.executeSql(sql, [user_name])
      .then(response=>{return console.log("Datos eliminados db")})
      .catch(response=>{return console.log("No se pudo eliminar datos db");
      })
      ;
  }
  // // experiencia laboral
  // getExperiencia(sesion:any){}
  // createExperiencia(sesion:any){}
  // // certificado
  // getCertificados(sesion:any){}
  // createCertificado(sesion:any){}

 

}
