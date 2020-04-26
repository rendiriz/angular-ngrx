import { createAction, props } from '@ngrx/store';
import { UserData } from '@models';

export enum UserActionTypes {
  LoadUsers = '[USER] Load Users',
  LoadUsersSuccess = '[USER] Load Users Success',
  LoadUsersFailure = '[USER] Load Users Failure',
  ClearUser = '[USER] Clear Users'
}

export const loadUsers = createAction(
  UserActionTypes.LoadUsers,
  props<{ params: string }>()
);

export const loadUsersSuccess = createAction(
  UserActionTypes.LoadUsersSuccess,
  props<{ data: UserData[] }>()
);

export const loadUsersFailure = createAction(
  UserActionTypes.LoadUsersFailure,
  props<{ error: Error | any }>()
);

// Clear
export const clearUser = createAction(
  UserActionTypes.ClearUser
);

export const fromUserActions = {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  clearUser
};
