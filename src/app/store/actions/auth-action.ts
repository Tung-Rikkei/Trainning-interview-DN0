import { createAction, props } from '@ngrx/store';

export const setAuthLoading = createAction(
    '[Auth Component] setAuthLoading',
    props<{ isAuthLoading: boolean }>()
)

export const setUserInfo = createAction(
    '[Auth Component] setUserInfo',
    props<{ [key: string]: any }>()
)