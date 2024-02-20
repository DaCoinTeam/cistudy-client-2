import { useReducer } from "react"
import { ContentType } from "@common"

export interface PostContent {
    contentType: ContentType,
    text?: string, 
    postContentMedias?: Array<File>
}

export interface ContentsEditorState {
  postContents: Array<PostContent>;
}

export interface AppendPostContentsAction {
  type: "APPEND_POST_CONTENT";
  payload: PostContent;
}

export type ContentsEditorAction = AppendPostContentsAction;

export const defaultState: ContentsEditorState = {
    postContents: [],
}

export const state = defaultState

export const reducer = (
    state: ContentsEditorState,
    action: ContentsEditorAction
) => {
    switch (action.type) {
    case "APPEND_POST_CONTENT":
        return {
            ...state,
            postContents: [...state.postContents, action.payload],
        }
    default:
        return state
    }
}

export const useContentsEditorReducer = () => {
    return useReducer(reducer, state)
}
