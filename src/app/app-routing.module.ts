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
        redirectTo: 'test',
        pathMatch: 'full'
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./views/test/test.module').then(
            m => m.TestModule
          )
      }
    ]
  }
];
