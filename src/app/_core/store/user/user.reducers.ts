import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { UserData } from '@models';
import { fromUserActions } from '@store/user/user.actions';

export const ENTITY_FEATURE_KEY = 'user';

export interface State extends EntityState<UserData> {
  isLoadingList: boolean;
  isLoadingCreate: boolean;
  isLoadingRead: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  error?: Error | any;
}

export const adapter: EntityAdapter<UserData> = createEntityAdapter<
UserData
>({
  selectId: item => item.id
});

export interface EntityPartialState {
  readonly [ENTITY_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
  isLoadingList: true,
  isLoadingCreate: true,
  isLoadingRead: true,
  isLoadingUpdate: true,
  isLoadingDelete: true,
  error: null
});

const reducer = createReducer(
  initialState,
  on(fromUserActions.loadUsers, state => {
    return {
      ...state,
      isLoadingList: true
    };
  }),
  on(
    fromUserActions.loadUsersSuccess, (state, { data }) => {
      return adapter.setAll(data, {
        ...state,
        isLoadingList: false
      });
    }
  ),
  on(
    fromUserActions.loadUsersFailure, (state, { error }) => {
      return {
        ...state,
        isLoadingList: false,
        error
      };
    }
  ),
  on(fromUserActions.loadUser, state => {
    return {
      ...state,
      isLoadingRead: true
    };
  }),
  on(fromUserActions.loadUserSuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      isLoadingRead: false
    });
  }),
  on(fromUserActions.loadUserFailure, (state, { error }) => {
    return {
      ...state,
      error
    };
  }),
  on(fromUserActions.createUser, state => {
    return {
      ...state,
      isLoadingCreate: true
    };
  }),
  on(fromUserActions.createUserSuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      isLoadingCreate: false
    });
  }),
  on(fromUserActions.createUserFailure, (state, { error }) => {
    return {
      ...state,
      error
    };
  }),
  on(fromUserActions.clearUser, state => {
    return adapter.removeAll({ ...state });
  })
);

export function UserReducer(
  state: State | undefined,
  action: Action
) {
  return reducer(state, action);
}
