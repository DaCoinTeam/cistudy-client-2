import { useReducer } from "react"
import { ContentType } from "@common"


export interface AddContentBoxState {
    contentSelected: ContentType;
}

export interface SetContentTypeAction {
    type: "SET_CONTENT_TYPE";
    payload: ContentType;
}

export type AddContentBoxAction = SetContentTypeAction;

export const state: AddContentBoxState = {
    contentSelected: ContentType.Text
}

export const reducer = (
    state: AddContentBoxState,
    action: AddContentBoxAction
) => {
    switch (action.type) {
    case "SET_CONTENT_TYPE": {
        return {
            ...state,
            contentSelected: action.payload
        }
    }
    default:
        return state
    }
}

export const useAddContentBoxReducer = () => {
    return useReducer(reducer, state)
}
