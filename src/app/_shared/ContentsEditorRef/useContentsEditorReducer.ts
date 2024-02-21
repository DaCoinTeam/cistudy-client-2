import { useReducer } from "react"
import { AppendKey, ContentType, WithKey } from "@common"
import { v4 as uuidv4 } from "uuid"


export interface ContentData {
    contentType: ContentType;
    text?: string;
    contentMedias?: Array<WithKey<File>>;
}

export type Content = AppendKey<ContentData>

export interface ContentsEditorState {
    contents: Array<Content>;
}

export interface AppendPostContentAction {
    type: "APPEND_CONTENT";
    payload: ContentData;
}

export interface UpdatePostContentAction {
    type: "UPDATE_CONTENT";
    payload: Content;
}

export interface DeletePostContentAction {
    type: "DELETE_CONTENT";
    payload: Content;
}

export type ContentsEditorAction = AppendPostContentAction | UpdatePostContentAction | DeletePostContentAction;

export const state: ContentsEditorState = {
    contents: [],
}

export const reducer = (
    state: ContentsEditorState,
    action: ContentsEditorAction
) => {
    switch (action.type) {
    case "APPEND_CONTENT": {
        const postContent: Content = {
            key: uuidv4(),
            ...action.payload
        }
        return {
            ...state,
            contents: [...state.contents, postContent],
        }
    }

    case "UPDATE_CONTENT": {
        const postContents = state.contents.map(content => {
            if (content.key === action.payload.key) {
                return action.payload
            }
            return content
        })
        return {
            ...state,
            postContents
        }
    }

    case "DELETE_CONTENT": {
        const postContents = state.contents.filter(content => content.key !== action.payload.key)
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
