import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAddComponent } from './user-add.component';

export const routes: Routes = [
  {
    path: '',
    component: UserAddComponent
  }
];

@NgModule({
  declarations: [UserAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],

  bootstrap: [UserAddComponent]
})
export class UserAddModule {}
