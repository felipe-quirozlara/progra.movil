import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiPagePage } from './api-page.page';

const routes: Routes = [
  {
    path: '',
    component: ApiPagePage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiPagePageRoutingModule {}
