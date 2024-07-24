"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useMemo,
} from "react"

import {finishQuizAttempt, FinishQuizAttemptInput, FinishQuizAttemptOutput } from "@services"
import { ErrorResponse } from "@common"
import { QuizAction, QuizState, useQuizReducer } from "./useStartQuizReducer"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"

export interface StartQuizContextValue {
    reducer: [QuizState, React.Dispatch<QuizAction>];
    swrs: {
        finishQuizAttemptSwrMutation: SWRMutationResponse<FinishQuizAttemptOutput, ErrorResponse, "FINISH_QUIZ_ATTEMPT", FinishQuizAttemptInput>
    }
}

export interface QuizResponse {
    message: string
    others: {
        quizAttemptId: string
    }
}

export interface QuizAnswer {
    questionIndex: string
    answerIndex: string[]
    isAnswered: boolean
}

export interface QuizProgressState {
    quizAttemptId: string
    score: number
    selectedAnswers: QuizAnswer[]
    quizQuestionAnswerIds: string[]
}

export interface QuizTimeState {
    timeLimit: string
    remainingTime: string
}

export const StartQuizContext =
    createContext<StartQuizContextValue | null>(null)

const WrappedStartQuizProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const reducer = useQuizReducer()

    const fetchFinishQuizAttemptSwrMutation = useCallback(async (_: string, { arg } : {arg : FinishQuizAttemptInput}) => {
        return await finishQuizAttempt(arg)
    }, [])

    const finishQuizAttemptSwrMutation = useSWRMutation("FINISH_QUIZ_ATTEMPT", fetchFinishQuizAttemptSwrMutation)

    const startQuizContextValue: StartQuizContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                finishQuizAttemptSwrMutation,
            },
        }),
        [reducer, finishQuizAttemptSwrMutation]
    )

    return (
        <StartQuizContext.Provider value={startQuizContextValue}>
            {children}
        </StartQuizContext.Provider>
    )
}

export const StartQuizProvider = ({ children }: { children: ReactNode }) => (
    <WrappedStartQuizProvider>{children}</WrappedStartQuizProvider>
)
