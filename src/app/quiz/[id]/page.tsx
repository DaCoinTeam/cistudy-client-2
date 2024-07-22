"use client"
import React, { useContext, useRef } from "react"
import { QuizContext, QuizProgressState, QuizTimeState } from "./hooks"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import CountdownTimer from "./components/Countdown"
import { Button, Chip } from "@nextui-org/react"
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa"
import { ConfirmModalRef, ConfirmModalRefSelectors } from "../../_shared"
import { useRouter } from "next/navigation"
import { ResultModalRef, ResultModalRefSelectors } from "./components"
import { ToastRef, ToastRefSelectors, ToastType } from "../../_components"
import { ErrorResponse } from "@common"
import { RootContext } from "../../_hooks"

const Page = () => {
    const quizProgressState: QuizProgressState = JSON.parse(localStorage.getItem("quizProgressState") as string)
    const quizTimeState: QuizTimeState = JSON.parse(localStorage.getItem("quizTimeState") as string)
    const route = useRouter()
    const params = useParams()
    const lessonId = params.id as string
    const timemilliseconds = Number(quizTimeState?.timeLimit) - Number(quizTimeState?.remainingTime)
    const {swrs, reducer} = useContext(QuizContext)!
    const [state, dispatch] = reducer
    const {notify} = useContext(RootContext)!
    const {quizSwr, finishQuizAttemptSwrMutation} = swrs
    const {data} = quizSwr
    const {section, quiz} = {...data}
    const {trigger : finishTrigger, isMutating} = finishQuizAttemptSwrMutation
    const confirmModalRef = useRef<ConfirmModalRefSelectors>(null)
    const resultModalRef = useRef<ResultModalRefSelectors>(null)
    const toastRef = useRef<ToastRefSelectors>(null)

    const handleSelectedAnswer = ({questionIndex, answerIndex} : {questionIndex: number, answerIndex: string}) => {
        const selectedAnswer = {
            questionIndex: questionIndex.toString(),
            answerIndex: [answerIndex],
            isAnswered: true
        }

        dispatch({
            type: "SET_SELECTED_OPTION_FOR_QUESTION",
            payload: [selectedAnswer]
        })
    }

    const handleSubmitQuiz = async() => {
        const quizQuestionAnswerIds = quizProgressState.selectedAnswers.map(a => a.answerIndex).flat()
        try {
            const res = await finishTrigger({
                data: {
                    quizAttemptId: quizProgressState.quizAttemptId,
                    quizQuestionAnswerIds,
                    timeTaken: timemilliseconds
                }
            })
            localStorage.setItem("quizProgressState", JSON.stringify(quizProgressState))
            toastRef.current?.notify({
                data: {
                    message: res.message
                },
                type: ToastType.Success 
            })
            dispatch({
                type: "SET_SCORE",
                payload: res.others.score
            })
            dispatch({
                type: "SET_FINISH_TIME",
                payload: timemilliseconds
            })
            resultModalRef.current?.onOpen()
            localStorage.removeItem("quizProgressState")
            localStorage.removeItem("quizTimeState")
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

    const handleConfirmSubmit = () => {
        confirmModalRef.current?.onOpen()
    }

    const handleNavigateToLesson = () => {
        route.push(`/lessons/${lessonId}`)
    }

    return (
        <div>
            <div className="flex items-center flex-row p-4 border-b-2">
                <div className="flex flex-row ml-7">
                    <div className="flex flex-row items-center cursor-pointer" onClick={handleNavigateToLesson}>
                        <ArrowLeft className="text-primary" size={20} />
                        <span className="text-primary font-semibold ml-4">Back</span>
                    </div>
                    <div className="ml-4">
                        <div className="font-semibold">{section?.title}</div>
                        <div className="opacity-50">{quiz?.timeLimit} min</div>
                    </div>
                </div>
                <div className="ml-auto">
                    <CountdownTimer initialTime={Number(quizTimeState?.remainingTime)} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-1/2">
                    {
                        quiz && quiz.questions?.map((question, questionIndex) => (
                            <div key={question.quizQuestionId} className="mt-16">
                                <div className="flex justify-between">
                                    <div className="text-lg font-semibold line-clamp-3">{questionIndex+1}. {question.question}</div>
                                    <Chip color="default" size="sm">{question.point} points</Chip>
                                </div>
                                <div className="flex flex-col mt-4 gap-4">
                                    {
                                        question.answers.map((answer) => (
                                            <div key={answer.quizQuestionAnswerId} className="flex ml-4 gap-2 cursor-pointer" onClick={() => handleSelectedAnswer({questionIndex, answerIndex: answer.quizQuestionAnswerId})}>
                                                {
                                                    state.selectedAnswers?.some(a => a.questionIndex === questionIndex.toString() && a.answerIndex.includes(answer.quizQuestionAnswerId)) ?
                                                        <FaRegDotCircle size={20} /> :
                                                        <FaRegCircle size={20} color="#D1D5DB" />
                                                }
                                                <div className="font-semibold">{answer.content}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex justify-center mt-16">
                        {isMutating? <Button color="secondary" isLoading>Submitting...</Button> : <Button color="secondary" onClick={handleConfirmSubmit}>Submit</Button>}
                    </div>
                </div>
            </div>
            <ConfirmModalRef ref={confirmModalRef} title="Submit your answers" content="Continue to submit?" onOKPress={handleSubmitQuiz} />
            <ResultModalRef ref={resultModalRef} onOKPress={handleNavigateToLesson} />
            <ToastRef ref={toastRef} />
        </div>
    )
}

export default Page