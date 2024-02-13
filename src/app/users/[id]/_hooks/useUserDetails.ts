import { DeepPartial } from "@apollo/client/utilities"
import { UserEntity } from "@common"
import { useReducer } from "react"

export interface IUserDetailsState {
    user: DeepPartial<UserEntity> | null
}

export interface ISetUserAction {
  type: "SET_USER"
  payload: DeepPartial<UserEntity>
}

export type UserDetailsAction = ISetUserAction;

export const state: IUserDetailsState = {
    user: null,
}

export const reducer = (
    state: IUserDetailsState,
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
