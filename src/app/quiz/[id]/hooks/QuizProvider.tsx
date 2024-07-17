"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"

import { createQuizAttempt, CreateQuizAttemptInput, CreateQuizAttemptOutput, findOneLesson, finishQuizAttempt, FinishQuizAttemptInput, FinishQuizAttemptOutput } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, LessonEntity } from "@common"
import useSWR, { SWRResponse } from "swr"
import { QuizAction, QuizState, useQuizReducer } from "./useQuizReducer"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"

export interface QuizContextValue {
    reducer: [QuizState, React.Dispatch<QuizAction>];
    swrs: {
        quizSwr: SWRResponse<LessonEntity, ErrorResponse>
        createQuizAttemptSwrMutation: SWRMutationResponse<CreateQuizAttemptOutput, ErrorResponse, "CREATE_QUIZ_ATTEMPT", CreateQuizAttemptInput>
        finishQuizAttemptSwrMutation: SWRMutationResponse<FinishQuizAttemptOutput, ErrorResponse, "FINISH_QUIZ_ATTEMPT", FinishQuizAttemptInput>
    };
}

export interface QuizResponse {
    message: string
    others: {
        quizAttemptId: string
    }
}

export const QuizContext =
    createContext<QuizContextValue | null>(null)

const WrappedQuizProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const reducer = useQuizReducer()
    const [, dispatch] = reducer
    const params = useParams()
    const lessonId = params.id as string

    const fetchQuiz = useCallback(async () => {
        return await findOneLesson(
            {
                params: {
                    lessonId,
                },
            },
            {
                lessonId: true,
                section: {
                    sectionId: true,
                    title: true,
                },
                quiz: {
                    quizId: true,
                    timeLimit: true,
                    questions: {
                        quizQuestionId: true,
                        question: true,
                        point: true,
                        answers: {
                            quizQuestionAnswerId: true,
                            content: true,
                            isCorrect: true,
                        }
                    },
                }
            }
        )
    }, [lessonId])

    const fetchCreateQuizAttemptSwrMutation = useCallback(async (_: string, { arg } : {arg : CreateQuizAttemptInput}) => {
        return await createQuizAttempt(arg)
    }, [lessonId])

    const fetchFinishQuizAttemptSwrMutation = useCallback(async (_: string, { arg } : {arg : FinishQuizAttemptInput}) => {
        return await finishQuizAttempt(arg)
    }, [lessonId])

    const quizSwr = useSWR(["QUIZ"], fetchQuiz)
    const createQuizAttemptSwrMutation = useSWRMutation("CREATE_QUIZ_ATTEMPT", fetchCreateQuizAttemptSwrMutation)
    const finishQuizAttemptSwrMutation = useSWRMutation("FINISH_QUIZ_ATTEMPT", fetchFinishQuizAttemptSwrMutation)

    const {trigger} = createQuizAttemptSwrMutation

    useEffect(() => {
        if (quizSwr.isLoading === false && quizSwr.data) {
            trigger({data: {quizId: lessonId}}).then((res) => {
                dispatch({type: "SET_QUIZ_ATTEMPT_ID", payload: res.others.quizAttemptId})
            })
        }
    }, [quizSwr.isLoading === false && quizSwr.data])

    const quizContextValue: QuizContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                quizSwr,
                createQuizAttemptSwrMutation,
                finishQuizAttemptSwrMutation,
            },
        }),
        [reducer,quizSwr, createQuizAttemptSwrMutation, finishQuizAttemptSwrMutation]
    )

    return (
        <QuizContext.Provider value={quizContextValue}>
            {children}
        </QuizContext.Provider>
    )
}

export const QuizProvider = ({ children }: { children: ReactNode }) => (
    <WrappedQuizProvider>{children}</WrappedQuizProvider>
)
