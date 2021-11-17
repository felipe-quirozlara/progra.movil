import { Component, OnInit } from '@angular/core';
import { IonicStorageService } from '../services/ionic-storage.service';
import { Storage } from '@ionic/storage';
import { DBTaskService } from '../services/dbtask.service';
import { APIClientService } from '../services/apiclient.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent {

  selectedUserId: number;
  usuario:String;

  usuarios: any;

  publicacion: any = {
    userId: 1,
    id: null,
    title: '',
    body: '',
    name: ''
  };

  publicaciones: any;

  publicacionSeleccionada: string;

  constructor(
    private api: APIClientService,
    private toastController: ToastController,
    private storage:Storage) {
  }


  ionViewWillEnter() {
    this.selectedUserId = null;
    this.setPublicacion(null, null, '', '', '');
    this.getUsuarios();
    this.getPublicaciones();
    this.getUser();
    
  }

  getUser(){
    this.storage.get("USER_DATA")
      .then((data)=>{
        this.usuario = data.user_name
      })
  }


  cambiarUsuario($event: number) {
    this.setPublicacion($event, null, '', '', '');
  }


  limpiarPublicacion() {
    this.setPublicacion(this.selectedUserId, null, '', '', '');
  }

  setPublicacion(userId, pubId, title, body, name) {

    // Establecer los datos de la publicación

    this.publicacion.userId = 1;
    this.publicacion.id = pubId;
    this.publicacion.title = title;
    this.publicacion.body = body;
    this.publicacion.name = name;

    // mostrar los datos de control, que sirven para saber si se trata de una
    // nueva pubicación o de una ya existente que se está editando actualmente.

    const uid = userId === null? 'no seleccionado' : userId;
    const pid = pubId === null? 'nueva' : pubId;
    this.publicacionSeleccionada = `(userId: ${uid} - pubId: ${pid})`;
  }


  getUsuarios() {
    this.api.getUsuarios().subscribe(data => this.usuarios = data);
  }


  getPublicaciones() {

    this.api.getPublicaciones().subscribe((publicaciones) => {

      
      this.api.getUsuarios().subscribe((usuarios) => {
        // Recorrer las publicaciones para actualizar el nombre del usuario
        publicaciones.forEach(publicacion => {
          publicacion.name = usuarios.find(u => u.id === publicacion.userId).name;
        });
        // Invertir la lista de publicaciones para que muestre desde la más nueva a la más antigua
        publicaciones.reverse();
        // Actualizar lista de publicaciones
        this.publicaciones = publicaciones;
      });
    });
  }


  guardarPublicacion() {
    if (this.publicacion.userId === null) {
      this.mostrarMensaje('Antes de hacer una publicación debe seleccionar un usuario.');
      return;
    }
    if (this.publicacion.title.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.body.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el cuerpo.');
      return;
    }
    if (this.publicacion.id === null) {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }


  crearPublicacion() {
    this.api.createPublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION CREADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE CREAR LA PUBLICACION.', error)
    );
  }


  actualizarPublicacion() {
    this.api.updatePublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ACTUALIZADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ACTUALIZAR LA PUBLICACION.', error)
    );
  }


  editarPublicacion($event){
    const pub = $event;
    this.setPublicacion(pub.userId, pub.id, pub.title, pub.body, pub.name);
    document.getElementById('topOfPage').scrollIntoView({block: 'end', behavior: 'smooth'});
  }


  eliminarPublicacion($event){
    const pubId = $event.id;
    this.api.deletePublicacion(pubId).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ELIMINADA CORRECTAMENTE: ${pubId}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ELIMINAR LA PUBLICACION.', error)
    );
  }


  getIdentificadorItemPublicacion(index, item) {
    return item.id;
  }

  // El siguiente método sirve para mostrar un mensaje informativo al usuario

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }


  async mostrarError(mensaje, error) {
    console.log(mensaje);
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
    throw error;
  }
}
