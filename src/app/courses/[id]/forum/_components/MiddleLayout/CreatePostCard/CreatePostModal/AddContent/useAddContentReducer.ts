import { useReducer } from "react"
import { ContentType } from "@common"

export interface AddContentState {
  contentSelected: ContentType;
  text: string;
  code: string;
  link: string;
  images: Array<File>;
  videos: Array<File>;
}

export interface SetContentSelected {
  type: "SET_CONTENT_SELECTED";
  payload: ContentType;
}

export interface SetTextAction {
  type: "SET_TEXT";
  payload: string;
}

export interface SetCodeAction {
  type: "SET_CODE";
  payload: string;
}

export interface SetLinkAction {
  type: "SET_LINK";
  payload: string;
}

export interface SetImageAction {
  type: "SET_IMAGES";
  payload: Array<File>;
}

export interface SetVideoAction {
  type: "SET_VIDEOS";
  payload: Array<File>;
}

export interface ResetAction {
  type: "RESET";
}


export type AddContentAction =
  | SetContentSelected
  | SetTextAction
  | SetCodeAction
  | SetLinkAction
  | SetImageAction
  | SetVideoAction
  | ResetAction;

export const defaultState: AddContentState = {
    contentSelected: ContentType.Text,
    text: "",
    code: "",
    link: "",
    images: [],
    videos: []
}

export const state = defaultState

export const reducer = (state: AddContentState, action: AddContentAction) => {
    switch (action.type) {
    case "SET_CONTENT_SELECTED":
        return { ...state, contentSelected: action.payload}
    case "SET_TEXT":
        return { ...state, text: action.payload}
    case "SET_CODE":
        return { ...state, code: action.payload}
    case "SET_LINK":
        return { ...state, link: action.payload}
    case "SET_IMAGES":
        return { ...state, images: action.payload}
    case "SET_VIDEOS":
        return { ...state, videos: action.payload}
    case "RESET": 
        return defaultState
    default:
        return state
    }
}

export const useAddContentReducer = () => {
    return useReducer(reducer, state)
}
