import { useReducer } from "react"

export interface RepliesState {
  editedPostCommentReplyId: string | null;
}

export interface SetIsEditedAction {
  type: "SET_EDITED_POST_COMMENT_REPLY_ID";
  payload: string | null;
}

export type RepliesAction = SetIsEditedAction;

export const state: RepliesState = {
    editedPostCommentReplyId: null,
}

export const reducer = (state: RepliesState, action: RepliesAction) => {
    switch (action.type) {
    case "SET_EDITED_POST_COMMENT_REPLY_ID":
        return { ...state, editedPostCommentReplyId: action.payload }
    default:
        return state
    }
}

export const useRepliesReducer = () => {
    return useReducer(reducer, state)
}
