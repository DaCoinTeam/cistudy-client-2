import { Input } from "@nextui-org/react"
import React, { useContext, useEffect, useRef, useState } from "react"
import { CourseTargetEntity } from "@common"
import { updateCourseTarget } from "@services"
import { DELAY_TIME } from "@config"
import { TargetsSectionContext } from "../TargetsSectionProvider"

interface TargetItemProps {
  courseTarget: CourseTargetEntity;
}

export const TargetItem = (props: TargetItemProps) => {
    const { courseTarget } = props
    const { courseTargetId, content } = courseTarget

    const { swrs } = useContext(TargetsSectionContext)!
    const { courseTargetsSwr } = swrs
    const { mutate } = courseTargetsSwr

    const [value, setValue] = useState("")

    useEffect(() => {
        if (content === null) return
        setValue(content)
    }, [content])

    const hasMountRef = useRef(false)
    useEffect(() => {
        if (!hasMountRef.current && value)  {
            hasMountRef.current = true
            return
        }
        const abortController = new AbortController()
        const handleEffect = async () => {
            await updateCourseTarget({
                data: {
                    courseTargetId,
                    content: value
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
        <div>
            <Input
                labelPlacement="outside"
                label=""
                className="py-1.5"
                classNames={{
                    inputWrapper: "px-4 shadow-none !bg-transparent",
                }}
                onValueChange={onValueChange}
                id="content"
                value={value}
                isReadOnly
            />
        </div>
    )
}
