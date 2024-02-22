import { useReducer } from "react"
import { PostEntity } from "@common"

export interface PostCardState {
  post: PostEntity | null;
}

export interface SetPostAction {
  type: "SET_POST";
  payload: PostEntity;
}

export type PostCardAction = SetPostAction

export const state: PostCardState = {
    post: null,
}

export const reducer = (
    state: PostCardState,
    action: PostCardAction
) => {
    switch (action.type) {
    case "SET_POST":
        return { ...state, post: action.payload }
    default:
        return state
    }
}

export const usePostCardReducer = () => {
    return useReducer(reducer, state)
}
