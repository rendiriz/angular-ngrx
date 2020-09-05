import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserEditComponent } from './user-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: UserEditComponent
  }
];

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],

  bootstrap: [UserEditComponent]
})
export class UserEditModule {}
