import { useReducer } from "react"

export interface QuizAnswer {
    questionIndex: string
    answerIndex: string[]
    isAnswered: boolean
}

export interface QuizState {
    answer: QuizAnswer[]
    quizAttemptId: string
    quizQuestionAnswerIds: string[]
}

export interface SetSelectedOptionForQuestionAction {
    type: "SET_SELECTED_OPTION_FOR_QUESTION"
    payload: QuizAnswer[]
}

export interface SetQuizAttemptIdAction {
    type: "SET_QUIZ_ATTEMPT_ID"
    payload: string
}

export interface SetQuizQuestionAnswerIdsAction {
    type: "SET_QUIZ_QUESTION_ANSWER_IDS"
    payload: string[]
}

export type QuizAction = SetSelectedOptionForQuestionAction | SetQuizAttemptIdAction | SetQuizQuestionAnswerIdsAction

export const state: QuizState = {
    answer: [],
    quizAttemptId: "",
    quizQuestionAnswerIds: []
}

export const reducer = (state: QuizState, action: QuizAction): QuizState => {
    switch (action.type) {
    case "SET_SELECTED_OPTION_FOR_QUESTION":
        return {
            ...state,
            answer: state.answer.some(answer => answer.questionIndex === action.payload[0].questionIndex) ?
                state.answer.map(answer => answer.questionIndex === action.payload[0].questionIndex ? action.payload[0] : answer) :
                [...state.answer, action.payload[0]]
        }
    case "SET_QUIZ_ATTEMPT_ID":
        return {
            ...state,
            quizAttemptId: action.payload
        }
    case "SET_QUIZ_QUESTION_ANSWER_IDS":
        return {
            ...state,
            quizQuestionAnswerIds: action.payload
        }
    default:
        return state
    }
}

export const useQuizReducer = () => {
    return useReducer(reducer, state)
}