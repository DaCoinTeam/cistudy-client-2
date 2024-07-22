"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import { CheckCircle2, Flag, ThumbsDown, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const Page = () => {
    const quizId = "1"
    let quizProgressState
    let quizTimeState

    useEffect(() => {
        quizProgressState = JSON.parse(localStorage.getItem("quizProgressState") as string)
        quizTimeState = JSON.parse(localStorage.getItem("quizTimeState") as string)
    }, [])

    return (
        <div className="p-6 m-0">
            <Card>
                <CardHeader className="font-semibold text-2xl p-6">Module 1</CardHeader>
                <CardBody className="mt-16 p-6">
                    <div className="text-primary font-semibold cursor-pointer">Review Learning Object</div>
                    <div className="flex flex-row items-center justify-between mt-16">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle2 size={20} color="#03045e" />
                                <span className="font-semibold">Submit your assignment</span>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-2">
                                    <div className="font-semibold">Due Date</div>
                                    <span>07/22/2024</span>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="font-semibold">Attempts</div>
                                    <span>3 every 8 hours</span>
                                </div>
                            </div>
                        </div>
                        <Link href={`/quiz/${quizId}`}>
                            <Button 
                                color="primary" 
                                size="lg" 
                                className="w-52 text-white"
                            >
                                {
                                    quizProgressState && quizTimeState ? "Continue Quiz" : "Start Quiz"
                                }
                            </Button>
                        </Link>
                    </div>
                    <Divider className="mt-4" />
                    <div className="flex flex-row justify-between mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle2 size={20} color="#03045e" />
                                <span className="font-semibold">Receive grade</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold">To Pass</div>
                                <span>70% or Higher</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                            <Divider orientation="vertical" />
                            <div>
                                <div className="font-semibold">Your grade</div>
                                <div className="text-lg text-primary">100%</div>
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
        </div>
    )
}

export default Page