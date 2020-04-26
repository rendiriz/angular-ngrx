import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { handleUndo } from 'ngrx-undo';

import { UserEffects } from '@store/user/user.effects';
import { UserReducer } from '@store/user/user.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        user: UserReducer
      },
      {
        metaReducers: [handleUndo]
      }
    ),
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  exports: [StoreModule, EffectsModule, StoreDevtoolsModule]
})
export class NgrxModule {}
