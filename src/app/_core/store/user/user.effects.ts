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

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUser),
      switchMap(action =>
        this.userService.getItem(action.id, action.params).pipe(
          map((res: any) => {
            return fromUserActions.loadUserSuccess({
              data: res.data
            });
          }),
          catchError(error => {
            return of(
              fromUserActions.loadUserFailure({
                error
              })
            );
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.createUser),
      switchMap(action => {
        return this.userService.createItem(action.create).pipe(
          switchMap(res => [
            fromUserActions.createUserSuccess({
              data: res.data
            })
          ]),
          catchError(error => {
            return of(
              fromUserActions.createUserFailure({
                error
              }),
              undo(action)
            );
          })
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.updateUser),
      switchMap(action =>
        this.userService.updateItem(action.id, action.update).pipe(
          map((res: any) => {
            return fromUserActions.updateUserSuccess({
              data: res.data
            });
          }),
          catchError(error => {
            return of(
              fromUserActions.updateUserFailure({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
