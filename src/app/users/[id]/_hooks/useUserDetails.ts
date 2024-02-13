import { DeepPartial } from "@apollo/client/utilities"
import { UserEntity } from "@common"
import { useReducer } from "react"

export interface UserDetailsState {
    user: DeepPartial<UserEntity> | null
}

export interface SetUserAction {
  type: "SET_USER"
  payload: DeepPartial<UserEntity>
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
