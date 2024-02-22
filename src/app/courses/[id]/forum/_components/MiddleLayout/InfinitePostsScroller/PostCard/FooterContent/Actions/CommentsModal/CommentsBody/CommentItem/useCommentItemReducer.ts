import { useReducer } from "react"
import { PostCommentEntity } from "@common"

export interface CommentItemState {
  postComment: PostCommentEntity | null;
}

export interface SetPostAction {
  type: "SET_POST_COMMENT";
  payload: PostCommentEntity;
}

export type CommentItemAction = SetPostAction

export const state: CommentItemState = {
    postComment: null,
}

export const reducer = (
    state: CommentItemState,
    action: CommentItemAction
) => {
    switch (action.type) {
    case "SET_POST_COMMENT":
        return { ...state, postComment: action.payload }
    default:
        return state
    }
}

export const useCommentItemReducer = () => {
    return useReducer(reducer, state)
}
