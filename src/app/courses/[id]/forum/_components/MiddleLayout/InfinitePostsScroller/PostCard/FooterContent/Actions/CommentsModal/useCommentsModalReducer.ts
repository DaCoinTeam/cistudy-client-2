import { useReducer } from "react"
import { PostCommentEntity } from "@common"

export interface CommentsModalState {
  postComments: Array<PostCommentEntity>;
}

export interface SetCommentsAction {
  type: "SET_COMMENTS";
  payload: Array<PostCommentEntity>;
}

export type CommentsModalAction = SetCommentsAction

export const state: CommentsModalState = {
    postComments: [],
}

export const reducer = (
    state: CommentsModalState,
    action: CommentsModalAction
) => {
    switch (action.type) {
    case "SET_COMMENTS":
        return { ...state, postComments: action.payload }
    default:
        return state
    }
}

export const useCommentsModalReducer = () => {
    return useReducer(reducer, state)
}
