import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// PUBLIC
import { PageComponent as PublicPageComponent } from '@templates/public/container/page/page.component';

const routes: Routes = [];

export const AppRoutingModule: Routes = [
  // PUBLIC
  {
    path: '',
    component: PublicPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/user/user.module').then(
            m => m.UserModule
          )
      }
    ]
  }
];
