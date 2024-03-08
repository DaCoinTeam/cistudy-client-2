import { useReducer } from "react"

export interface ReplyItemState {
  isEdited: boolean;
}

export interface SetIsEditedAction {
  type: "SET_IS_EDITED";
  payload: boolean;
}

export type ReplyItemAction = SetIsEditedAction;

export const state: ReplyItemState = {
    isEdited: false,
}

export const reducer = (state: ReplyItemState, action: ReplyItemAction) => {
    switch (action.type) {
    case "SET_IS_EDITED":
        return { ...state, isEdited: action.payload }
    default:
        return state
    }
}

export const useReplyItemReducer = () => {
    return useReducer(reducer, state)
}
