"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useMemo,
} from "react"

import {finishQuizAttempt, FinishQuizAttemptInput, FinishQuizAttemptOutput } from "@services"
import { ErrorResponse } from "@common"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { StartQuizAction, StartQuizState, useStartQuizReducer } from "./useStartQuizReducer"

export interface StartQuizContextValue {
    reducer: [StartQuizState, React.Dispatch<StartQuizAction>];
    swrs: {
        finishQuizAttemptSwrMutation: SWRMutationResponse<FinishQuizAttemptOutput, ErrorResponse, "FINISH_QUIZ_ATTEMPT", FinishQuizAttemptInput>
    }
}

export const StartQuizContext =
    createContext<StartQuizContextValue | null>(null)

const WrappedStartQuizProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const reducer = useStartQuizReducer()

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
