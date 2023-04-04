import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/auth-reducer';

export const selectAuth = createFeatureSelector<State>('auth')

export const selectAuthLoading = createSelector(
    selectAuth,
    (auth) => auth.isAuthLoading,
)

export const selectUserInfo = createSelector(
    selectAuth,
    (auth) => auth.userInfo,
)