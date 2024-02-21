import { useReducer } from "react"
import { ContentType } from "@common"

export interface PostContent {
    index: number;
    contentType: ContentType;
    text?: string;
    postContentMedias?: Array<File>;
}

export interface ContentsEditorState {
    postContents: Array<PostContent>;
}

export interface AppendPostContentAction {
    type: "APPEND_POST_CONTENT";
    payload: Pick<PostContent, "contentType" | "postContentMedias" | "text">;
}

export interface UpdatePostContentAction {
    type: "UPDATE_POST_CONTENT";
    payload: PostContent;
}

export type ContentsEditorAction = AppendPostContentAction | UpdatePostContentAction;

export const defaultState: ContentsEditorState = {
    postContents: [],
}

export const state = defaultState

export const reducer = (
    state: ContentsEditorState,
    action: ContentsEditorAction
) => {
    switch (action.type) {
    case "APPEND_POST_CONTENT": {
        const postContent: PostContent = {
            index: state.postContents.length,
            ...action.payload
        }
        return {
            ...state,
            postContents: [...state.postContents, postContent],
        }
    }
    case "UPDATE_POST_CONTENT": {
        console.log(state.postContents)
        const postContents = state.postContents.map(postContent => {
            if (postContent.index === action.payload.index) {
                console.log("2323")
                return action.payload
            }
            console.log("false")
            return postContent
        })
        console.log(postContents)
        return {
            ...state,
            postContents
        }
    }
    default:
        return state
    }
}

export const useContentsEditorReducer = () => {
    return useReducer(reducer, state)
}
