import { useReducer } from "react"
import { QuizProgressState } from "./StartQuizProvider"

const ISSERVER = typeof window === "undefined"
let quizProgressState: QuizProgressState = !ISSERVER ? JSON.parse(localStorage.getItem("quizProgressState") ?? "{}") : {}
export interface QuizAnswer {
    questionIndex: string
    answerIndex: string[]
    isAnswered: boolean
}

export interface QuizState {
    currentQuestionIndex: number
    selectedAnswers: QuizAnswer[]
    score: number
    finishTime: number,
    isLoading: boolean
}

export interface SetCurrentQuestionIndex {
    type: "SET_CURRENT_QUESTION_INDEX"
    payload: number
}

export interface SetSelectedOptionForQuestionAction {
    type: "SET_SELECTED_OPTION_FOR_QUESTION"
    payload: QuizAnswer[]
}

export interface SetScore {
    type: "SET_SCORE"
    payload: number
}

export interface SetFinishTime {
    type: "SET_FINISH_TIME"
    payload: number
}

export interface SetReset {
    type: "RESET"
}

export interface SetLoading {
    type: "SET_LOADING",
    payload: boolean
}

export type QuizAction = SetCurrentQuestionIndex | SetSelectedOptionForQuestionAction | SetScore | SetFinishTime | SetReset | SetLoading

export const state: QuizState = {
    currentQuestionIndex: 0,
    selectedAnswers: quizProgressState?.selectedAnswers ?? [],
    score: 0,
    finishTime: 0,
    isLoading: false
}

export const reducer = (state: QuizState, action: QuizAction): QuizState => {
    
    switch (action.type) {
    case "SET_CURRENT_QUESTION_INDEX":
        return {
            ...state,
            currentQuestionIndex: action.payload,
        }
    case "SET_SELECTED_OPTION_FOR_QUESTION": {
        quizProgressState = JSON.parse(localStorage.getItem("quizProgressState") ?? "{}")
        const getUpdatedSelectedAnswer = () => {
            const updatedSelectedAnswers = state.selectedAnswers.map(answer => {
                const payloadAnswer = action.payload.find(p => p.questionIndex === answer.questionIndex)
                return payloadAnswer ? payloadAnswer : answer
            })

            action.payload.forEach(payloadAnswer => {
                if (!state.selectedAnswers.some(answer => answer.questionIndex === payloadAnswer.questionIndex)) {
                    updatedSelectedAnswers.push(payloadAnswer)
                }
            })

            return {
                ...state,
                selectedAnswers: updatedSelectedAnswers
            }
        }

        const updatedQuizProgressState: QuizProgressState = {
            ...quizProgressState,
            selectedAnswers: getUpdatedSelectedAnswer().selectedAnswers
        }

        localStorage.setItem("quizProgressState", JSON.stringify(updatedQuizProgressState))
        return getUpdatedSelectedAnswer()
    }

    case "SET_SCORE":
        return {
            ...state,
            score: action.payload
        }
    case "SET_FINISH_TIME":
        return {
            ...state,
            finishTime: action.payload
        }
    case "RESET":
        return {
            ...state,
            currentQuestionIndex: 0,
            selectedAnswers: [],
            score: 0,
            finishTime: 0
        }
    case "SET_LOADING": {
        return {
            ...state,
            isLoading: action.payload
        }
    }
    default:
        return state
    }
}

export const useQuizReducer = () => {
    return useReducer(reducer, state)
}