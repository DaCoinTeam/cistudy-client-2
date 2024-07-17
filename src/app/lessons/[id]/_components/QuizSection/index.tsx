"use client"
import { Button, Divider, Spacer } from "@nextui-org/react"
import { useContext } from "react"
import { LessonDetailsContext } from "../../_hooks"
import { parseISODateString } from "@common"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export const QuizSection = () => {
    const isWatched = true
    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { data: lesson } = lessonsSwr
    const { quiz } = { ...lesson }

    const router = useRouter()

    return (
        <div>
            <div className="text-2xl font-bold">Quiz</div>
            <Spacer y={4} />
            <div className="bg-content2 rounded-large p-4">
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="font-bold text-base">Quiz Details</div>
                        <div className="p-4">
                            <div className="flex">
                                <li className="font-semibold">Number of Questions: {quiz?.questions.length}</li>
                            </div>
                            <Spacer y={2} />
                            <div className="flex">
                                <li className="font-semibold">Time Limit: {quiz?.timeLimit} minutes</li>
                            </div>
                            <Spacer y={2} />
                            <div className="flex">
                                <li className="font-semibold">Created on: {parseISODateString(quiz?.createdAt)}</li>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="font-bold text-base">Your Performance</div>
                        <div className="p-4">
                            <div className="flex">
                                <li className="font-semibold">Last Attempt Score: {(quiz?.lastAttemptScore ?? 0) >= 0 && (quiz?.lastAttemptScore ?? 0) < 10 ? `${quiz?.lastAttemptScore ?? 0}/10` : "You have not taken the quiz yet"}</li>
                            </div>
                            <Spacer y={2} />
                            <div className="flex">
                                <li className="font-semibold">Number of Attempts: {(quiz?.totalNumberOfAttempts ?? 0) >= 0 ? quiz?.totalNumberOfAttempts : 0}</li>
                            </div>
                            <Spacer y={2} />
                            <div className="flex">
                                <li className="font-semibold">Highest Score: {quiz?.highestScoreRecorded ? (
                                    <span>
                                        {quiz?.highestScoreRecorded}/10
                                    </span>
                                ) : (
                                    <span>
                                        You have not taken the quiz yet
                                    </span>
                                )}</li>
                            </div>
                        </div>
                    </div>
                </div>

                <div>

                    <div>
                        <Divider />
                        <Spacer y={4} />
                        <div className = "flex gap-2 items-center">
                            <Button onPress={() => router.push(`/quiz/${quiz?.quizId}`)} startContent={!isWatched ? <LockClosedIcon className="w-5 h-5" /> : undefined} isDisabled={!isWatched} color="secondary">
                                Take Quiz
                            </Button>
                            {
                                !isWatched ? <div className="text-danger text-sm">Please watch the course first.</div> : null
                            }                     
                        </div>             
                    </div>
                </div>
            </div>
        </div>
    )
}