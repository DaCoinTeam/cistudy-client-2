"use client"
import { Button, Divider, Spacer } from "@nextui-org/react"
import { Flag, ThumbsDown, ThumbsUp } from "lucide-react"
import { useCallback, useContext, useRef } from "react"
import { ContentDetailsContext } from "../../../_hooks"
import { StartQuizModal, StartQuizModalRefSelectors } from "./StartQuizModal"
import { createQuizAttempt, CreateQuizAttemptInput } from "@services"
import useSWRMutation from "swr/mutation"
import numeral from "numeral"
import dayjs from "dayjs"
import { AttemptsModal } from "./AttemptsModal"

export const QuizContent = () => {
    const startQuizModalRef = useRef<StartQuizModalRefSelectors | null>(null)
    const {swrs} = useContext(ContentDetailsContext)!
    const {sectionContentSwr} = swrs
    const {data: sectionContentData, mutate} = sectionContentSwr
    const {quiz} = {...sectionContentData}
    const { activeQuizAttempt } = { ...quiz }

    const createQuizAttemptFn = useCallback(async (_: string, { arg } : {arg : CreateQuizAttemptInput}) => {
        const response = await createQuizAttempt(arg)
        await mutate()
        return response
    }, [sectionContentSwr])

    const createQuizAttemptSwrMutation = useSWRMutation("CREATE_QUIZ_ATTEMPT", createQuizAttemptFn)
    const { trigger, isMutating  } = createQuizAttemptSwrMutation

    return (
        <div className="w-full">
            <div className="text-2xl">{sectionContentData?.title}</div>
            <div className="text-foreground-400">{quiz?.description}</div>
            <Spacer y={12}/>
            <div>
                <div className="flex flex-row items-end justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-semibold text-xl text-primary">Quiz Overview</span>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-2 w-[250px]">
                                    <div className="font-semibold">Questions</div>
                                    <span>{quiz?.questions.length} questions</span>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="font-semibold">Total points</div>
                                    <span>{quiz?.questions.reduce(((acc, { point }) => acc + point), 0)}</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-2 w-[250px]">
                                    <div className="font-semibold">Time limit</div>
                                    <span>{dayjs(quiz?.timeLimit).format("mm:ss")}</span>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="font-semibold">Attempts</div>
                                    <span>3 every 8 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button 
                        isLoading={isMutating}
                        color="primary" 
                        className="w-52 text-white"
                        onPress={async () =>
                        {
                            if (!activeQuizAttempt) {
                                await trigger({data: {quizId: quiz?.quizId as string}})
                            }
                            startQuizModalRef.current?.onOpen()
                        }}
                    >
                        {
                            activeQuizAttempt ? "Continue Quiz" : "Start Quiz"
                        }
                    </Button>
                </div>
                <Spacer y={4}/>
                <Divider  />
                <Spacer y={4}/>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-semibold text-xl text-primary">Condition</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-semibold">To pass</div>
                            <span>{`${quiz?.passingPercent ?? 0}%`} or higher</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-6">
                        <Divider orientation="vertical" />
                        <div className="grid place-items-center gap-2">
                            <div className="font-semibold">Your best attempt</div>
                            {
                                quiz?.highestScoreRecorded !== null ? (
                                    <div className="grid gap-1 place-items-center">
                                        <div className={`text-2xl ${quiz?.isPassed ? "text-success" : "text-danger"}`}>
                                            {numeral(quiz?.highestScoreRecorded).format("0.00")}%
                                        </div>
                                        <div>
                                            <div className="text-sm">Last attempt: {numeral(quiz?.lastAttemptScore).format("0.00")}%</div>
                                            <div className="text-sm">Attempts: {quiz?.totalNumberOfAttempts} times</div>
                                        </div>
                                    </div>
                                ) : <div className="text-primary text-2xl">Not yet</div>
                            }  
                            <Spacer y={2}/>
                            <AttemptsModal/>
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