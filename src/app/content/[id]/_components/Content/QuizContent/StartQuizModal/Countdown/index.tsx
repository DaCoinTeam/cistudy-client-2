import React, { useContext, useEffect, useRef, useState } from "react"
import { ContentDetailsContext } from "../../../../../_hooks"
import { parseDuration } from "@common"

export const CountdownTimer = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data } = sectionContentSwr
    const { quiz } = { ...data }
    const { activeQuizAttempt } = { ...quiz }
    const { timeLeft } = { ...activeQuizAttempt }

    const [displayTimeLeft, setDisplayTimeLeft] = useState(0)
    
    const firstTimeRef = useRef(false)

    useEffect(() => {
        if (!timeLeft) return
        if (firstTimeRef.current) return
        
        setDisplayTimeLeft(timeLeft)
        firstTimeRef.current = true
    }, [timeLeft])

    useEffect(() => {
        if (!displayTimeLeft) return
        const timeout = setTimeout(() => {
            setDisplayTimeLeft(displayTimeLeft - 1000)
        }, 1000)
        return () => {
            if (!displayTimeLeft) return 
            clearInterval(timeout)
        }
    }, [displayTimeLeft])

    return <div>{parseDuration(Math.ceil((displayTimeLeft ?? 0) / 1000))}</div>
}
