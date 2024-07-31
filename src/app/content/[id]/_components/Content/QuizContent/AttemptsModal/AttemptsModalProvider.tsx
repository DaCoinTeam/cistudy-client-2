"use client"
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from "react"

import {
    FindManyQuizAttemptsOutputData,
    findManyQuizAttempts,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    AttemptsModalAction,
    AttemptsModalState,
    useAttemptsModalReducer,
} from "./useAttemptsModalReducer"
import { ContentDetailsContext } from "../../../../_hooks"

export interface AttemptsModalContextValue {
  reducer: [
    AttemptsModalState,
    React.Dispatch<AttemptsModalAction>
  ];
  swrs: {
    quizAttemptsSwr:  SWRResponse<FindManyQuizAttemptsOutputData, ErrorResponse>
  };
}

export const ROWS_PER_PAGE = 5

export const AttemptsModalContext =
  createContext<AttemptsModalContextValue | null>(null)

const WrappedAttemptsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useAttemptsModalReducer()
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs

    const fetchQuizAttempts = useCallback(
        async ([key]: [number, string]) => {
            return await findManyQuizAttempts(
                {   
                    params: {
                        quizId: sectionContentSwr.data?.sectionContentId ?? "",
                    },
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        quizAttemptId: true,
                        accountId: true,
                        observedAt: true,
                        receivedPercent: true,
                        receivedPoints: true,
                        totalPoints: true,
                        isPassed: true,
                        quiz: {
                            quizId: true,
                            questions: {
                                quizQuestionId: true,
                                question: true,
                                corrected: true,
                                position: true,
                                answers: {  
                                    quizQuestionAnswerId: true,
                                    position: true,
                                    content: true,
                                    selected: true,
                                }
                            }
                        },
                        createdAt: true,
                        updatedAt: true
                    },
                    metadata: {
                        count: true
                    }   
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const quizAttemptsSwr = useSWR(
        [page, "QUIZ_ATTEMPTS"],
        fetchQuizAttempts,
        {
            keepPreviousData: true,
        }
    )

    const attemptsModalContextValue: AttemptsModalContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                quizAttemptsSwr,
            },
        }),
        [reducer, quizAttemptsSwr]
    )

    return (
        <AttemptsModalContext.Provider
            value={attemptsModalContextValue}
        >
            {children}
        </AttemptsModalContext.Provider>
    )
}

export const AttemptsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedAttemptsModalProvider>
            {children}
        </WrappedAttemptsModalProvider>
    </SWRConfig>
)
