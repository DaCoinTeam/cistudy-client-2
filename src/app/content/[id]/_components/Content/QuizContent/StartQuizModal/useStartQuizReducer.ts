import { useReducer } from "react"

export interface StartQuizState {
    isPassed: boolean
    receivedPercent: number
    timeTaken: number,
    isLoading?: boolean,
    receivedPoints: number,
    totalPoints: number,
    chosenValues: Array<string>
}

export interface SetState {
    type: "SET_STATE"
    payload: Partial<StartQuizState>
}

export interface SetLoading {
    type: "SET_LOADING"
    payload: boolean
}

export interface SetChosenValues {
    type: "SET_CHOSEN_VALUES",
    payload: Array<string>
}

export type StartQuizAction = SetState | SetLoading | SetChosenValues

export const state: StartQuizState = {
    isPassed: false,
    receivedPercent: 0,
    timeTaken: 0,
    receivedPoints: 0,
    totalPoints: 0,
    chosenValues: []
}

export const reducer = (state: StartQuizState, action: StartQuizAction): StartQuizState => {
    
    switch (action.type) {
    case "SET_STATE":
        return {
            ...state,
            ...action.payload,
        }
    case "SET_LOADING": 
        return {
            ...state,
            isLoading: action.payload
        }
    case "SET_CHOSEN_VALUES": 
        return {
            ...state,
            chosenValues: action.payload
        }
    default:
        return state
    }
}

export const useStartQuizReducer = () => {
    return useReducer(reducer, state)
}