"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import { CheckCircle2, Flag, ThumbsDown, ThumbsUp } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { SectionContentPreviewContext } from "../../../_hooks" 
import { StartQuizModal, StartQuizModalRefSelectors } from "./StartQuizModal"
import { QuizProgressState, QuizTimeState } from "./StartQuizModal/StartQuizProvider"

export const QuizContent = () => {
    const [quizProgressState, setQuizProgressState] = useState<QuizProgressState>(JSON.parse(localStorage.getItem("quizProgressState") ?? "{}"))
    const startQuizModalRef = useRef<StartQuizModalRefSelectors | null>(null)
    const {swrs} = useContext(SectionContentPreviewContext)!
    const {sectionContentSwr} = swrs
    const {data: sectionContentData} = sectionContentSwr
    const {quiz} = {...sectionContentData}

    const handleStartQuiz = async() => {
        if (!quiz) return

        if (!quizProgressState.quizAttemptId) {
            const quizTime: QuizTimeState = {
                timeLimit: (quiz?.timeLimit * 60 * 1000).toString(),
                remainingTime: (quiz?.timeLimit * 60 * 1000).toString()
            }
            localStorage.setItem("quizTimeState", JSON.stringify(quizTime))

            const quizProgressState : QuizProgressState = {
                quizAttemptId: "preview",
                score: 0,
                selectedAnswers: [],
                quizQuestionAnswerIds: []
            }
            localStorage.setItem("quizProgressState", JSON.stringify(quizProgressState))
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
            <Card>
                <CardHeader className="text-3xl font-bold text-primary p-6">{sectionContentData?.title}</CardHeader>
                <CardBody className="mt-16 p-6">
                    <div className="text-primary font-semibold cursor-pointer">Review Learning Object</div>
                    <div className="flex flex-row items-center justify-between mt-16">
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
                    <Divider className="mt-4" />
                    <div className="flex flex-row justify-between mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle2 size={20} color={quiz?.isPassed? "#1F8354":"#03045e"} />
                                <span className="font-semibold">Receive grade</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold">To Pass</div>
                                <span>{quiz?.passingScore}% or Higher</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                            <Divider orientation="vertical" />
                            <div>
                                <div className="font-semibold">Your grade</div>
                                <div className="text-lg text-primary">{quiz?.highestScoreRecorded? `${quiz?.highestScoreRecorded/10*100}%` : "Not yet"}</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-primary font-semibold cursor-pointer">View Feedback</div>
                                <div className="text-xs">We keep your highest score</div>
                            </div>
                        </div>
                    </div>
                    <Divider className="mt-12" />
                </CardBody>
                <CardFooter>
                    <div className="-mt-4">
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
                </CardFooter>
            </Card>
            <StartQuizModal ref={startQuizModalRef} />
        </div>
    )
}