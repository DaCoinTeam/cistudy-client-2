"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"

import { createQuizAttempt, CreateQuizAttemptInput, CreateQuizAttemptOutput, findOneLesson, finishQuizAttempt, FinishQuizAttemptInput, FinishQuizAttemptOutput } from "@services"
import { useParams, useRouter } from "next/navigation"
import { ErrorResponse, LessonEntity } from "@common"
import useSWR, { SWRResponse } from "swr"
import { QuizAction, QuizState, useQuizReducer } from "./useQuizReducer"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { RootContext } from "../../../_hooks"
import { ToastType } from "../../../_components"

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

export const QuizContext =
    createContext<QuizContextValue | null>(null)

const WrappedQuizProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { notify } = useContext(RootContext)!
    const reducer = useQuizReducer()
    const params = useParams()
    const route = useRouter()
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
    // const {data} = quizSwr
    // const {quiz} = {...data}

    // const randomizeQuizQuestions = () => {
    //     quiz?.questions.sort(() => Math.random() - 0.5)
    //     quiz?.questions.map(question => {
    //         question.answers.sort(() => Math.random() - 0.5)
    //     })
    //     console.log(quiz)
    // }

    const handleCreateQuizAttempt = async() => { 
        if (!localStorage.getItem("quizProgressState") && quizSwr.isLoading === false && quizSwr.data) {
            try {
                const res = await trigger({data: {quizId: lessonId}})
                const quizProgressState : QuizProgressState = {
                    quizAttemptId: res.others.quizAttemptId,
                    score: 0,
                    selectedAnswers: [],
                    quizQuestionAnswerIds: []
                }
                const quizTimeState : QuizTimeState = {
                    timeLimit: (quizSwr.data.quiz.timeLimit * 60 * 100).toString(),
                    remainingTime: (quizSwr.data.quiz.timeLimit * 60 * 100).toString()
                }
                localStorage.setItem("quizProgressState", JSON.stringify(quizProgressState))
                localStorage.setItem("quizTimeState", JSON.stringify(quizTimeState))
            } catch (ex) {
                const { message } = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
                route.push(`/lessons/${lessonId}`)
            }
        }
    }

    useEffect(() => {
        handleCreateQuizAttempt()
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
