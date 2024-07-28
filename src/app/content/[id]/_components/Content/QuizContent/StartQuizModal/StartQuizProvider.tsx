"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {finishQuizAttempt, FinishQuizAttemptInput, FinishQuizAttemptOutput, updateQuizAttemptAnswers } from "@services"
import { ErrorResponse } from "@common"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { StartQuizAction, StartQuizState, useStartQuizReducer } from "./useStartQuizReducer"
import { ContentDetailsContext } from "../../../../_hooks"

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
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContentData } = sectionContentSwr
    const { quiz } = { ...sectionContentData }
    const { activeQuizAttempt, quizId, questions } = { ...quiz }
    const { currentQuestionPosition } = {
        ...activeQuizAttempt,
    }
    const { quizQuestionId } = {
        ...questions?.find(({position}) => position === currentQuestionPosition)
    }

    const reducer = useStartQuizReducer()

    const fetchFinishQuizAttemptSwrMutation = useCallback(async (_: string, { arg } : {arg : FinishQuizAttemptInput}) => {
        await updateQuizAttemptAnswers({
            data: {
                quizAttemptId: arg.data.quizAttemptId,
                quizId: quizId ?? "",
                quizQuestionAnswerIds: reducer[0].chosenValues,
                quizQuestionId: quizQuestionId ?? ""
            }
        })
        return await finishQuizAttempt(arg)
    }, [reducer, swrs])

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
