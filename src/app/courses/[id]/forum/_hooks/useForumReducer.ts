import { useReducer } from "react"
import { PostEntity } from "@common"

export interface ForumState {
  posts: Array<PostEntity>;
  endOfPosts: boolean;
}

export interface SetPostsAction {
  type: "SET_POSTS";
  payload: Array<PostEntity>;
}

export interface SetEndOfPostsAction {
    type: "SET_END_OF_POSTS_ACTION";
    payload: boolean;
  }

export interface AppendPostsAction {
  type: "APPEND_POSTS";
  payload: Array<PostEntity>;
}

export type ForumAction = SetPostsAction | AppendPostsAction | SetEndOfPostsAction;

export const state: ForumState = {
    posts: [],
    endOfPosts: false
}

export const reducer = (state: ForumState, action: ForumAction) => {
    switch (action.type) {
    case "SET_POSTS":
        return { ...state, posts: action.payload }
    case "APPEND_POSTS":
        return { ...state, posts: [...state.posts, ...action.payload] }
    case "SET_END_OF_POSTS_ACTION":
        return { ...state, endOfPosts: action.payload}
    default:
        return state
    }
}

export const useForumReducer = () => {
    return useReducer(reducer, state)
}
