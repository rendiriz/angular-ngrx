import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { undo } from 'ngrx-undo';

import { fromUserActions } from '@store/user/user.actions';
import { UserService } from '@services';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUsers),
      switchMap((action) =>
        this.userService.getItems(action.params).pipe(
          map((result: any) =>
            fromUserActions.loadUsersSuccess({ data: result.data })
          ),
          catchError(error =>
            of(
              fromUserActions.loadUsersFailure({ error })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
