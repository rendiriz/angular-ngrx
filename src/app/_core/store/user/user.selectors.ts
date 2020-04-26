import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  adapter,
  ENTITY_FEATURE_KEY
} from '@store/user/user.reducers';

// Lookup feature state managed by NgRx
const getState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

// get the selectors
const { selectIds, selectAll } = adapter.getSelectors();

// select the array of ids
export const selectUserIds = createSelector(
  getState,
  selectIds
);

// select the array
export const selectUsers = createSelector(
  getState,
  selectAll
);

// select list single
export const selectUser = createSelector(
  getState,
  (state: State, prop: { id: number }) => state.entities[prop.id]
);

// select loaded flag
export const selectIsLoadingList = createSelector(
  getState,
  state => state.isLoadingList
);

// select error
export const selectError = createSelector(getState, state => state.error);
