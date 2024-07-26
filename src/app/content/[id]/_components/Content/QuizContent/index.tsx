"use client"
import { Button, Divider, Spacer } from "@nextui-org/react"
import { CheckCircle2, Flag, ThumbsDown, ThumbsUp } from "lucide-react"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { ContentDetailsContext } from "../../../_hooks"
import { StartQuizModal, StartQuizModalRefSelectors } from "./StartQuizModal"
import { QuizProgressState, QuizTimeState } from "./StartQuizModal/StartQuizProvider"
import { createQuizAttempt, CreateQuizAttemptInput } from "@services"
import useSWRMutation from "swr/mutation"
import { ErrorResponse } from "@common"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../../_components"

export const QuizContent = () => {
    const [quizProgressState, setQuizProgressState] = useState<QuizProgressState>(JSON.parse(localStorage.getItem("quizProgressState") ?? "{}"))
    const startQuizModalRef = useRef<StartQuizModalRefSelectors | null>(null)
    const {notify} = useContext(RootContext)!
    const {swrs} = useContext(ContentDetailsContext)!
    const {sectionContentSwr} = swrs
    const {data: sectionContentData} = sectionContentSwr
    const {quiz} = {...sectionContentData}

    const fetchCreateQuizAttemptSwrMutation = useCallback(async (_: string, { arg } : {arg : CreateQuizAttemptInput}) => {
        return await createQuizAttempt(arg)
    }, [])

    const createQuizAttemptSwrMutation = useSWRMutation("CREATE_QUIZ_ATTEMPT", fetchCreateQuizAttemptSwrMutation)
    const { trigger } = createQuizAttemptSwrMutation


    const handleStartQuiz = async() => {
        if (!quiz) return

        if (!quizProgressState.quizAttemptId) {
            const quizTime: QuizTimeState = {
                timeLimit: (quiz?.timeLimit * 60 * 1000).toString(),
                remainingTime: (quiz?.timeLimit * 60 * 1000).toString()
            }
            localStorage.setItem("quizTimeState", JSON.stringify(quizTime))

            try {
                const res = await trigger({data: {quizId: quiz?.quizId as string}})
                const quizProgressState : QuizProgressState = {
                    quizAttemptId: res.others.quizAttemptId,
                    score: 0,
                    selectedAnswers: [],
                    quizQuestionAnswerIds: []
                }
                localStorage.setItem("quizProgressState", JSON.stringify(quizProgressState))
            } catch (ex) {
                const { message } = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
            }
        }
        startQuizModalRef.current?.onOpen()
    }

    useEffect(() => {
        window.addEventListener("storage", () => {
            setQuizProgressState(JSON.parse(localStorage.getItem("quizProgressState") ?? "{}"))
        })
    }, [])

    return (
        <div className="w-full">
            <div className="text-2xl">{sectionContentData?.title}</div>
            <Spacer y={12}/>
            <div>
                <div className="text-primary font-semibold cursor-pointer">Review Learning Object</div>
                <Spacer y={8}/>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <CheckCircle2 size={20} color={quiz?.isPassed? "#1F8354":"#03045e"}  />
                            <span className="font-semibold">Submit your assignment</span>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold">Time Limit</div>
                                <span>{quiz?.timeLimit} minutes</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold">Attempts</div>
                                <span>3 every 8 hours</span>
                            </div>
                        </div>
                    </div>
                    <Button 
                        color="primary" 
                        size="lg" 
                        className="w-52 text-white"
                        onPress={() => handleStartQuiz()}
                    >
                        {
                            quizProgressState.quizAttemptId? "Continue Quiz" : "Start Quiz"
                        }
                    </Button>
                </div>
                <Spacer y={4}/>
                <Divider  />
                <Spacer y={4}/>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <CheckCircle2 size={20} color={quiz?.isPassed? "#1F8354":"#03045e"} />
                            <span className="font-semibold">Receive grade</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-semibold">To Pass</div>
                            <span>{`${quiz?.passingScore ?? 0}/10`} or Higher</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-6">
                        <Divider orientation="vertical" />
                        <div>
                            <div className="font-semibold">Your grade</div>
                            <div className="text-lg text-primary">{quiz?.highestScoreRecorded? `${quiz?.highestScoreRecorded}/10` : "Not yet"}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-primary font-semibold cursor-pointer">View Feedback</div>
                            <div className="text-xs">We keep your highest score</div>
                        </div>
                    </div>
                </div>
            </div>
            <Spacer y={4}/>
            <Divider  />
            <Spacer y={4}/>
            <div>
                <Button
                    startContent={<ThumbsUp size={20} />}
                    className="bg-transparent text-primary"
                >
                        Like
                </Button>
                <Button
                    startContent={<ThumbsDown size={20} />}
                    className="bg-transparent text-primary"
                >
                        Dislike
                </Button>
                <Button
                    startContent={<Flag size={20} />}
                    className="bg-transparent text-primary"
                >
                        Report an issue
                </Button>
            </div>
            <StartQuizModal ref={startQuizModalRef} />
        </div>
    )
}