import { UserEntity } from "@common"
import { useReducer } from "react"

export interface UserDetailsState {
    user: UserEntity | null
}

export interface SetUserAction {
  type: "SET_USER"
  payload: UserEntity
}

export type UserDetailsAction = SetUserAction;

export const state: UserDetailsState = {
    user: null,
}

export const reducer = (
    state: UserDetailsState,
    action: UserDetailsAction
) => {
    switch (action.type) {
    case "SET_USER":
        return { ...state, user: action.payload }
    default:
        return state
    }
}

export const useUserDetailsReducer = () => {
    return useReducer(reducer, state)
}
