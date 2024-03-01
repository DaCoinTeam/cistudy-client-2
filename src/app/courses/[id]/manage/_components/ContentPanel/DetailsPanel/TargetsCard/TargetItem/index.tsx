import { Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { CourseTargetEntity, isErrorResponse } from "@common"
import { deleteCourseTarget, updateCourseTarget } from "@services"
import { XIcon } from "lucide-react"
import { DELAY_TIME } from "@config"
import { TargetsCardContext } from "../TargetsCardProviders"

interface TargetItemProps {
  courseTarget: CourseTargetEntity;
}

export const TargetItem = (props: TargetItemProps) => {
    const { courseTarget } = props
    const { courseTargetId, content } = courseTarget

    const { functions } = useContext(TargetsCardContext)!
    const { fetchAndSetCourseTargets } = functions

    const [value, setValue] = useState("")

    useEffect(() => {
        if (content === null) return
        setValue(content)
    }, [content])

    useEffect(() => {
        const abortController = new AbortController()
        const handleEffect = async () => {
            const response = await updateCourseTarget({
                data: {
                    courseTargetId,
                    content: value
                },
                signal: abortController.signal
            })
            if (!isErrorResponse(response)) {
                await fetchAndSetCourseTargets()
            } else {
                console.log(response)
            }
        }
        const delayedHandleEffect = setTimeout(handleEffect, DELAY_TIME)
        return () => {
            abortController.abort()
            clearTimeout(delayedHandleEffect)
        }
    }, [value])

    const onValueChange = (value: string) => setValue(value)

    const onRemovePress = async () => {
        const response = await deleteCourseTarget({
            data: {
                courseTargetId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourseTargets()
        } else {
            console.log(response)
        }
    }

    return (
        <div>
            <Input
                labelPlacement="outside"
                label=""
                variant="bordered"
                classNames={{
                    inputWrapper: "border shadow-none",
                }}
                onValueChange={onValueChange}
                id="content"
                value={value}
                endContent={
                    <div className="flex gap-4">
                        <Link
                            color="foreground"
                            onPress={onRemovePress}
                            className="text-sm"
                            as="button"
                        >
                            <XIcon size={20} strokeWidth={4 / 3} />
                        </Link>
                    </div>
                }
            />
        </div>
    )
}
