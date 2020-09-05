import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./user-list/user-list.module').then(m => m.UserListModule)
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./user-add/user-add.module').then(m => m.UserAddModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./user-edit/user-edit.module').then(m => m.UserEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
