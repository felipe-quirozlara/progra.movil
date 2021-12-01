import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CertificacionesComponent } from '../certificaciones/certificaciones.component';
import { ExperienciaLaboralComponent } from '../experiencia-laboral/experiencia-laboral.component';
import { CommonModule } from '@angular/common';
// Se declaran las rutas hijas que se cargaran al interior de Page Home
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'certificaciones',
        component: CertificacionesComponent
      },
      {
        path:'experiencias',
        component: ExperienciaLaboralComponent
      },
      // {
      //   path:'perfil',
      //   component: MisDatosComponent
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
