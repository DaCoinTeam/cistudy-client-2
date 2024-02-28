import { UserEntity } from "@common"
import { useReducer } from "react"

export interface FollowersTabContentState {
    followers: Array<UserEntity>
}

export interface SetFollowersAction {
  type: "SET_FOLLOWERS"
  payload: Array<UserEntity>
}

export type FollowersTabContentAction = SetFollowersAction;

export const state: FollowersTabContentState = {
    followers: [],
}

export const reducer = (
    state: FollowersTabContentState,
    action: FollowersTabContentAction
) => {
    switch (action.type) {
    case "SET_FOLLOWERS":
        return { ...state, followers: action.payload }
    default:
        return state
    }
}

export const useFollowersTabContentReducer = () => {
    return useReducer(reducer, state)
}
