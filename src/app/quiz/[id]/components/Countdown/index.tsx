import React, { useState, useEffect, useContext} from "react"
import { QuizContext, QuizProgressState, QuizTimeState } from "../../hooks"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ErrorResponse } from "@common"
import { ToastType } from "../../../../_components"
import { RootContext } from "../../../../_hooks"

const useCountdown = (initialTime : number) => {
    const route = useRouter()
    const params = useParams()
    const lessonId = params.id as string
    const {swrs} = useContext(QuizContext)!
    const { notify } = useContext(RootContext)!
    const {finishQuizAttemptSwrMutation} = swrs
    const {trigger} = finishQuizAttemptSwrMutation
    const quizProgressState: QuizProgressState = JSON.parse(localStorage.getItem("quizProgressState") as string)
    const quizTimeState: QuizTimeState = JSON.parse(localStorage.getItem("quizTimeState") as string)
    const timemilliseconds = Number(quizTimeState?.timeLimit) - Number(quizTimeState?.remainingTime)
    const [remainingTime, setRemainingTime] = useState(initialTime)

    useEffect(() => {
        const intervalId = setInterval(async() => {
            setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0))
            quizTimeState.remainingTime = remainingTime.toString()
            localStorage.setItem("quizTimeState", JSON.stringify(quizTimeState))
            if (Number(quizTimeState.remainingTime) === 0) {
                try {
                    await trigger({data: {quizAttemptId: quizProgressState.quizAttemptId, quizQuestionAnswerIds: quizProgressState.quizQuestionAnswerIds, timeTaken: timemilliseconds}})
                    route.push(`/lessons/${lessonId}`)
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
        }, 1000)

        return () => {clearInterval(intervalId)}
    }, [remainingTime])

    return remainingTime
}

const CountdownTimer = ({ initialTime } : { initialTime : number}) => {
    const convertedInitialTime = initialTime
    const remainingTime = useCountdown(convertedInitialTime)

    const getTimeComponents = (time : number) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24))
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((time % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds } 
    }

    const { days, hours, minutes, seconds } = getTimeComponents(remainingTime)

    return (
        <div className="flex flex-row mr-7">
            {days > 0 && <div className="text-xl">{days}d </div>}
            {hours > 0 || days > 0 && <div>:</div>}
            <div className="text-xl">{hours.toString().padStart(2, "0")}:</div>
            <div className="text-xl">{minutes.toString().padStart(2, "0")}:</div>
            <div className="text-xl">{seconds.toString().padStart(2, "0")}</div>
        </div>
    )
}

export default CountdownTimer