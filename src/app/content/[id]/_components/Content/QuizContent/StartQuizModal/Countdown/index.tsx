import React, { useState, useEffect, useContext} from "react"
import { ErrorResponse } from "@common"
import { ToastType } from "../../../../../../../_components" 
import { RootContext } from "../../../../../../../_hooks" 
import { StartQuizContext } from "../StartQuizProvider"

const useCountdown = (initialTime : number) => {
    const { notify } = useContext(RootContext)!
    const {swrs} = useContext(StartQuizContext)!
    const {finishQuizAttemptSwrMutation} = swrs
    const { trigger } = finishQuizAttemptSwrMutation
    const [remainingTime, setRemainingTime] = useState(initialTime)
    const quizProgressState = JSON.parse(localStorage.getItem("quizProgressState") ?? "{}")
    const quizTimeState = JSON.parse(localStorage.getItem("quizTimeState") ?? "{}")
    const timemilliseconds = Number(quizTimeState.timeLimit) - Number(quizTimeState.remainingTime)

    useEffect(() => {
        const intervalId = setInterval(async() => {
            setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0))
            quizTimeState.remainingTime = remainingTime.toString()
            localStorage.setItem("quizTimeState", JSON.stringify(quizTimeState))
            if (Number(quizTimeState.remainingTime) === 0) {
                try {
                    await trigger({data: {quizAttemptId: quizProgressState.quizAttemptId, quizQuestionAnswerIds: quizProgressState.quizQuestionAnswerIds, timeTaken: timemilliseconds}})
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
        }, 1000)

        return () => {clearInterval(intervalId)}
    }, [remainingTime])

    return remainingTime
}

const CountdownTimer = ({ initialTime } : { initialTime : number}) => {
    const remainingTime = useCountdown(initialTime)

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
            <div className="text-4xl">{hours.toString().padStart(2, "0")}:</div>
            <div className="text-4xl">{minutes.toString().padStart(2, "0")}:</div>
            <div className="text-4xl">{seconds.toString().padStart(2, "0")}</div>
        </div>
    )
}

export default CountdownTimer