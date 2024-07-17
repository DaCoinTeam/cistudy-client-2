import React, { useState, useEffect, useContext} from "react"
import { QuizContext } from "../../hooks"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

const useCountdown = (initialTime : number) => {
    const route = useRouter()
    const params = useParams()
    const lessonId = params.id as string
    const {swrs, reducer} = useContext(QuizContext)!
    const [state] = reducer
    const {finishQuizAttemptSwrMutation} = swrs
    const {trigger} = finishQuizAttemptSwrMutation
    const [remainingTime, setRemainingTime] = useState(initialTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0))
            if (remainingTime === 0) {
                trigger({data: {quizAttemptId: state.quizAttemptId, quizQuestionAnswerIds: state.quizQuestionAnswerIds}}).then(() => {
                    route.push(`/lessons/${lessonId}`)
                })
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
            <div className="text-xl">{hours.toString().padStart(2, "0")}:</div>
            <div className="text-xl">{minutes.toString().padStart(2, "0")}:</div>
            <div className="text-xl">{seconds.toString().padStart(2, "0")}</div>
        </div>
    )
}

export default CountdownTimer