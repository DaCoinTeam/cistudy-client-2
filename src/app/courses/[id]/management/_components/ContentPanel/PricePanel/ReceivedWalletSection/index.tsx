import React, { useContext, useEffect, useRef, useState } from "react"
import { Input, Spacer } from "@nextui-org/react"
import { DELAY_TIME } from "@config"
import { updateCourse } from "@services"
import { ManagementContext } from "../../../../_hooks"

interface ReceivedWalletSectionProps {
  className?: string;
}

export const ReceivedWalletSection = (props: ReceivedWalletSectionProps) => {
    const { className } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr
    const { courseId, receivedWalletAddress } = { ...courseManagement }

    const [value, setValue] = useState("")
    
    useEffect(() => {
        if (!receivedWalletAddress) return
        setValue(receivedWalletAddress)
    }, [receivedWalletAddress])

    const hasMountRef = useRef(false)
    useEffect(() => {
        if (!hasMountRef.current && value)  {
            hasMountRef.current = true
            return
        }
        const abortController = new AbortController()
        const handleEffect = async () => {
            if (!courseId) return

            await updateCourse({
                data: {
                    courseId,
                    receivedWalletAddress: value
                },
                signal: abortController.signal
            })
            await mutate()
        }
        const delayedHandleEffect = setTimeout(handleEffect, DELAY_TIME)
        return () => {
            abortController.abort()
            clearTimeout(delayedHandleEffect)
        }
    }, [value])

    const onValueChange = (value: string) => setValue(value)

    return (
        <div className={`${className}`}>
            <div className="text-2xl"> Received Wallet </div>
            <Spacer y={4}/>
            <Input
                classNames={{
                    inputWrapper: "input-input-wrapper"
                }} 
                labelPlacement="outside"
                placeholder="Input title here"
                onValueChange={onValueChange}
                value={value}
            />
        </div>
    )
}