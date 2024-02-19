import { useReducer } from "react"
import { PostEntity } from "@common"

export interface ContentUnderState {
  reactPostPartial: PostEntity | null;
}

export interface SetReactPostPartialAction {
  type: "SET_REACT_POST_PARTIAL";
  payload: PostEntity;
}

export type ContentUnderAction = SetReactPostPartialAction;

export const state: ContentUnderState = {
    reactPostPartial: null,
}

export const reducer = (state: ContentUnderState, action: ContentUnderAction) => {
    switch (action.type) {
    case "SET_REACT_POST_PARTIAL":
        return { ...state, reactPostPartial: action.payload }
    default:
        return state
    }
}

export const useContentUnderReducer = () => {
    return useReducer(reducer, state)
}
