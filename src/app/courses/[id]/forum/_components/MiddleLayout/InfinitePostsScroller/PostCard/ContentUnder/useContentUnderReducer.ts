import { useReducer } from "react"
import { PostEntity } from "@common"

export interface ContentUnderState {
  postPartial: PostEntity | null;
}

export interface SetReactPostPartialAction {
  type: "SET_POST_PARTIAL";
  payload: PostEntity;
}

export type ContentUnderAction = SetReactPostPartialAction;

export const state: ContentUnderState = {
    postPartial: null,
}

export const reducer = (state: ContentUnderState, action: ContentUnderAction) => {
    switch (action.type) {
    case "SET_POST_PARTIAL":
        return { ...state, postPartial: action.payload }
    default:
        return state
    }
}

export const useContentUnderReducer = () => {
    return useReducer(reducer, state)
}
