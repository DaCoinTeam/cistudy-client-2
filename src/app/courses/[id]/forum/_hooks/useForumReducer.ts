import { useReducer } from "react"
import { PostEntity } from "@common"

export interface ForumState {
  posts : Array<PostEntity>
}

export interface SetPostsAction {
  type: "SET_POSTS";
  payload: Array<PostEntity>
}

export type ForumAction = SetPostsAction;

export const state: ForumState = {
    posts: [],
}

export const reducer = (
    state: ForumState,
    action: ForumAction
) => {
    switch (action.type) {
    case "SET_POSTS":
        return { ...state, posts: action.payload }
    default:
        return state
    }
}

export const useForumReducer = () => {
    return useReducer(reducer, state)
}
