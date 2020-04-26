import { createAction, props } from '@ngrx/store';
import { UserData } from '@models';

export enum UserActionTypes {
  LoadUsers = '[USER] Load Users',
  LoadUsersSuccess = '[USER] Load Users Success',
  LoadUsersFailure = '[USER] Load Users Failure',
  LoadUser = '[USER] Load User',
  LoadUserSuccess = '[USER] Load User Success',
  LoadUserFailure = '[USER] Load User Failure',
  CreateUser = '[USER] Create User',
  CreateUserSuccess = '[USER] Create User Success',
  CreateUserFailure = '[USER] Create User Failure',
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

export const loadUser = createAction(
  UserActionTypes.LoadUser,
  props<{ id: number; params: string }>()
);

export const loadUserSuccess = createAction(
  UserActionTypes.LoadUserSuccess,
  props<{ data: UserData }>()
);

export const loadUserFailure = createAction(
  UserActionTypes.LoadUserFailure,
  props<{ error: Error | any }>()
);

export const createUser = createAction(
  UserActionTypes.CreateUser,
  props<{ create: any; }>()
);

export const createUserSuccess = createAction(
  UserActionTypes.CreateUserSuccess,
  props<{ data: UserData }>()
);

export const createUserFailure = createAction(
  UserActionTypes.CreateUserFailure,
  props<{ error: Error | any }>()
);

export const clearUser = createAction(
  UserActionTypes.ClearUser
);

export const fromUserActions = {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  clearUser
};
