import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGardService } from './services/auth-gard.service';

// Se definen las rutas a nivel de APP
const routes: Routes = [
  {
    // See: HomePageModule
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGardService]
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'api-page',
    loadChildren: () => import('./pages/api-page/api-page.module').then( m => m.ApiPagePageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'qrreader',
    loadChildren: () => import('./qrreader/qrreader.module').then( m => m.QrreaderPageModule)
  },
  {
    // En caso de cualquier error en la ruta se redirecciona al Not Found
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
<<<<<<< Updated upstream
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario-routing.module').then( m => m.RegistroPageRoutingModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  }
=======
 
>>>>>>> Stashed changes

  

  

  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
