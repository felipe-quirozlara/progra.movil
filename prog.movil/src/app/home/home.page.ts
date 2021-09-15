import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { NivelEducacional } from 'src/model/NivelEducacional';
import { Persona } from 'src/model/Persona';
import { Animation, AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public usuario: Usuario;

  public nivelesEducacionales: NivelEducacional[] = [
    {id: 1, nombre: 'Básica Incompleta'},
    {id: 2, nombre: 'Básica Completa'},
    {id: 3, nombre: 'Media Incompleta'},
    {id: 4, nombre: 'Media Completa'},
    {id: 5, nombre: 'Superior Incompleta'},
    {id: 6, nombre: 'Superior Completa'}
  ];

  public persona: Persona = new Persona();

  /*
    En el constructor del HomePage se ponen como parametros los siguientes objetos:
      (1) activeroute (del tipo de dato ActivatedRoute) y router (del tipo de dato Router),
      que se usarán para obtener los datos enviados por la página que invocó a "home".
      (2) alertController (del tipo de dato AlertController), que se usará para mostrar
      mensajes emergentes en la pantalla.

    Nótese que los parámetros tuvieron que declararse con "private", y esto es necesario
    para que los parámetros pasen a considerarse automáticamente como propiedades
    de la clase "HomePage" y de este modo puedan usarse dentro de los otros métodos.
   */
   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationCtrl: AnimationController) {

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validar que tenga datos extras

        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

      } else {
        /*
          Si no vienen datos extra desde la página anterior, quiere decir que el usuario
          intentó entrar directamente a la página home sin pasar por el login,
          de modo que el sistema debe enviarlo al login para que inicie sesión.
        */
        this.router.navigate(['/login']);
      }
   });
  }

public ngOnInit() {
  this.persona.nombre = 'Cristián';
  this.persona.apellido = 'Gómez';
  this.persona.nivelEducacional.id = 6;
  this.persona.fechaNacimiento = '1972-12-26';

}

public limpiarFormulario(): void {
  /*
    El método limpiar recorre cada uno de los campos de la propiedad persona,
    de modo que la variable "key" va tomando el nombre de dichos campos (nombre,
    apellido, etc.) y "value" adopta el valor que tiene en ese momento el
    campo asociado a key.
  */
  for (const [key, value] of Object.entries(this.persona)) {
    /*
      Con la siguiente instrucción se cambia el valor de cada campo
      de la propiedad persona, y como los controles gráficos están
      asociados a dichos nombres de campos a través de ngModel, entonces
      al limpiar el valor del campo, también se limpia el control gráfico.
    */
      Object.defineProperty(this.persona, key, {value: ''});
    }
  }

  public mostrarDatosPersona(): void {

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    const mensaje =
        '<br>Usuario: ' + this.usuario.nombreUsuario
      + '<br>Nombre: ' + this.persona.nombre
      + '<br>Apellido: ' + this.persona.apellido
      + '<br>Educación: ' + this.persona.nivelEducacional.id + ' - '
      + this.nivelesEducacionales.find(
          n => n.id === this.persona.nivelEducacional.id).nombre
      + '<br>Nacimiento: ' + this.persona.fechaNacimiento;

    this.presentAlert('Datos personales', mensaje);
  }

  // Este método sirve para mostrar el mensaje emergente
  //en el formulario la que te dice los datos como el nombre y apellido
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public animacionTitulo(animationCtrl: AnimationController){
    const animation: Animation =  this.animationCtrl.create()
   .addElement(document.querySelector('.titulo'))
   .duration(2500)
   .iterations(Infinity)
   .fromTo('transform', 'translateX(0px)', 'translateX(250px)')
   .fromTo('opacity', '1', '0.2');
   document.querySelector('#play').addEventListener('click', () => {
    animation.play();

  });
  }

}