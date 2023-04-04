import { createReducer, on } from "@ngrx/store";
import * as authActions from "../actions/auth-action"

export interface State {
    isAuthLoading: boolean
    userInfo: { [key: string]: any }
}

const initialState: State = {
    isAuthLoading: false,
    userInfo: {}
}

export const authReducer = createReducer(
    initialState,
    on(authActions.setAuthLoading, (state, { isAuthLoading }) => {
        console.log('setAuthLoading: ', isAuthLoading)
        return { ...state, isAuthLoading }
    }),
    on(authActions.setUserInfo, (state, userInfo) => {
        console.log('setUserInfo: ', userInfo)
        return { ...state, userInfo: { ...userInfo } }
    })
)