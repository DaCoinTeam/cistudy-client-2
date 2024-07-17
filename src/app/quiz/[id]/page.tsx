"use client"
import React, { useContext, useRef } from "react"
import { QuizContext } from "./hooks"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import CountdownTimer from "./components/Countdown"
import { Button, Chip } from "@nextui-org/react"
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa"
import { ConfirmModalRef, ConfirmModalRefSelectors } from "../../_shared"
import { useRouter } from "next/navigation"


const Page = () => {
    const route = useRouter()
    const params = useParams()
    const lessonId = params.id as string
    const {reducer, swrs} = useContext(QuizContext)!
    const [state, dispatch] = reducer
    const {quizSwr, finishQuizAttemptSwrMutation} = swrs
    const {data} = quizSwr
    const {trigger : finishTrigger, isMutating} = finishQuizAttemptSwrMutation
    const confirmModalRef = useRef<ConfirmModalRefSelectors>(null)

    if (!data) return null

    const handleSelectedAnswer = ({questionIndex, answerIndex} : {questionIndex: number, answerIndex: string}) => {
        console.log(questionIndex, answerIndex)
        const answer = [{
            questionIndex: questionIndex.toString(),
            answerIndex: [answerIndex],
            isAnswered: true
        }]

        dispatch({
            type: "SET_SELECTED_OPTION_FOR_QUESTION",
            payload: answer
        })
    }

    const handleSubmitQuiz = () => {
        const quizQuestionAnswerIds = state.answer.map(a => a.answerIndex).flat()
        finishTrigger({
            data: {
                quizAttemptId: state.quizAttemptId,
                quizQuestionAnswerIds
            }
        }).then(() => {
            route.push(`/lessons/${lessonId}`)
        })
    }

    const handleConfirmSubmit = () => {
        confirmModalRef.current?.onOpen()
    }

    // window.onbeforeunload = () => {
    //     handleSubmitQuiz()
    //     return true
    // }

    return (
        <div>
            <div className="flex items-center flex-row p-4 border-b-2">
                <div className="flex flex-row">
                    <div className="flex flex-row items-center cursor-pointer" onClick={handleConfirmSubmit}>
                        <ArrowLeft className="text-primary" size={20} />
                        <span className="ml-2 text-primary font-semibold">Back</span>
                    </div>
                    <div className="ml-2">
                        <div className="font-semibold">{data.section.title}</div>
                        <div className="opacity-50">{data.quiz.timeLimit} min</div>
                    </div>
                </div>
                <div className="ml-auto">
                    <CountdownTimer initialTime={data.quiz.timeLimit * 60 * 1000} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-1/2">
                    {
                        data.quiz.questions.map((question, questionIndex) => (
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
                                                    state.answer.some(a => a.questionIndex === questionIndex.toString() && a.answerIndex.includes(answer.quizQuestionAnswerId)) ?
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
        </div>
    )
}

export default Page