import { useReducer } from "react"
import { PostEntity } from "@common"

export interface FooterContentState {
  postPartial: PostEntity | null;
}

export interface SetReactPostPartialAction {
  type: "SET_POST_PARTIAL";
  payload: PostEntity;
}

export type FooterContentAction = SetReactPostPartialAction

export const state: FooterContentState = {
    postPartial: null,
}

export const reducer = (
    state: FooterContentState,
    action: FooterContentAction
) => {
    switch (action.type) {
    case "SET_POST_PARTIAL":
        return { ...state, postPartial: action.payload }
    default:
        return state
    }
}

export const useFooterContentReducer = () => {
    return useReducer(reducer, state)
}
