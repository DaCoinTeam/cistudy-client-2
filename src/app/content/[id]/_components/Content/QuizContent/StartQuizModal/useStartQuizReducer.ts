import { useReducer } from "react"

export interface StartQuizState {
    isPassed: boolean
    receivedPercent: number
    timeTaken: number,
    isLoading?: boolean
}

export interface SetState {
    type: "SET_STATE"
    payload: StartQuizState
}

export interface SetLoading {
    type: "SET_LOADING"
    payload: boolean
}


export type StartQuizAction = SetState | SetLoading

export const state: StartQuizState = {
    isPassed: false,
    receivedPercent: 0,
    timeTaken: 0
}

export const reducer = (state: StartQuizState, action: StartQuizAction): StartQuizState => {
    
    switch (action.type) {
    case "SET_STATE":
        return {
            ...state,
            isPassed: action.payload.isPassed,
            receivedPercent: action.payload.receivedPercent,
            timeTaken: action.payload.timeTaken
        }
    case "SET_LOADING": 
        return {
            ...state,
            isLoading: action.payload
        }
    default:
        return state
    }
}

export const useStartQuizReducer = () => {
    return useReducer(reducer, state)
}