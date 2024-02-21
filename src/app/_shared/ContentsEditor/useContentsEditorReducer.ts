import { useReducer } from "react"
import { AppendKey, ContentType, WithKey } from "@common"
import { v4 as uuidv4 } from "uuid"


export interface PostContentData {
    contentType: ContentType;
    text?: string;
    postContentMedias?: Array<WithKey<File>>;
}

export type PostContent = AppendKey<PostContentData>

export interface ContentsEditorState {
    postContents: Array<PostContent>;
}

export interface AppendPostContentAction {
    type: "APPEND_POST_CONTENT";
    payload: PostContentData;
}

export interface UpdatePostContentAction {
    type: "UPDATE_POST_CONTENT";
    payload: PostContent;
}

export interface DeletePostContentAction {
    type: "DELETE_POST_CONTENT";
    payload: PostContent;
}

export type ContentsEditorAction = AppendPostContentAction | UpdatePostContentAction | DeletePostContentAction;

export const state: ContentsEditorState = {
    postContents: [],
}

export const reducer = (
    state: ContentsEditorState,
    action: ContentsEditorAction
) => {
    switch (action.type) {
    case "APPEND_POST_CONTENT": {
        const postContent: PostContent = {
            key: uuidv4(),
            ...action.payload
        }
        return {
            ...state,
            postContents: [...state.postContents, postContent],
        }
    }

    case "UPDATE_POST_CONTENT": {
        const postContents = state.postContents.map(postContent => {
            if (postContent.key === action.payload.key) {
                return action.payload
            }
            return postContent
        })
        return {
            ...state,
            postContents
        }
    }

    case "DELETE_POST_CONTENT": {
        const postContents = state.postContents.filter(postContent => postContent.key !== action.payload.key)
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
