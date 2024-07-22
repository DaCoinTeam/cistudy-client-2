import { useReducer } from "react"
import { QuizProgressState } from "./QuizProvider"

const quizProgressState: QuizProgressState = JSON.parse(localStorage.getItem("quizProgressState") as string)

export interface QuizAnswer {
    questionIndex: string
    answerIndex: string[]
    isAnswered: boolean
}

export interface QuizState {
    selectedAnswers: QuizAnswer[]
    score: number
    finishTime: number
}

export interface SetSelectedOptionForQuestionAction {
    type: "SET_SELECTED_OPTION_FOR_QUESTION"
    payload: QuizAnswer[]
}

export interface setScore {
    type: "SET_SCORE"
    payload: number
}

export interface setFinishTime {
    type: "SET_FINISH_TIME"
    payload: number
}

export type QuizAction = SetSelectedOptionForQuestionAction | setScore | setFinishTime

export const state: QuizState = {
    selectedAnswers: quizProgressState?.selectedAnswers ?? [],
    score: 0,
    finishTime: 0
}

export const reducer = (state: QuizState, action: QuizAction): QuizState => {
    
    switch (action.type) {
    case "SET_SELECTED_OPTION_FOR_QUESTION": {
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

        const updatedQuizProgressState = {
            ...quizProgressState,
            selectedAnswers: getUpdatedSelectedAnswer().selectedAnswers
        }

        console.log(updatedQuizProgressState)

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
    default:
        return state
    }
}

export const useQuizReducer = () => {
    return useReducer(reducer, state)
}