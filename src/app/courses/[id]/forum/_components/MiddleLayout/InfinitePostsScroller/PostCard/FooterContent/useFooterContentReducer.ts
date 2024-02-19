import { useReducer } from "react"
import { PostEntity } from "@common"

export interface FooterContentState {
  postPartial: PostEntity | null;
  isCommentsOpen: boolean;
}

export interface SetReactPostPartialAction {
  type: "SET_POST_PARTIAL";
  payload: PostEntity;
}

export interface SetIsCommentsOpenAction {
  type: "SET_IS_COMMENTS_OPEN";
  payload: boolean;
}

export type FooterContentAction =
  | SetReactPostPartialAction
  | SetIsCommentsOpenAction;

export const state: FooterContentState = {
    postPartial: null,
    isCommentsOpen: false,
}

export const reducer = (
    state: FooterContentState,
    action: FooterContentAction
) => {
    switch (action.type) {
    case "SET_POST_PARTIAL":
        return { ...state, postPartial: action.payload }
    case "SET_IS_COMMENTS_OPEN":
        return { ...state, isCommentsOpen: action.payload }
    default:
        return state
    }
}

export const useFooterContentReducer = () => {
    return useReducer(reducer, state)
}
