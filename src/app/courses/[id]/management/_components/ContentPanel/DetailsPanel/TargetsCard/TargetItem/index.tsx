import { Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { CourseTargetEntity } from "@common"
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

    const { swrs } = useContext(TargetsCardContext)!
    const { courseTargetsSwr } = swrs
    const { mutate } = courseTargetsSwr

    const [value, setValue] = useState("")

    useEffect(() => {
        if (content === null) return
        setValue(content)
    }, [content])

    useEffect(() => {
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

    const onDeletePress = async () => {
        await deleteCourseTarget({
            data: {
                courseTargetId,
            },
        })
        await mutate()
    }

    return (
        <div>
            <Input
                labelPlacement="outside"
                label=""
                classNames={{
                    inputWrapper: "shadow-none border border-divider",
                }}
                variant="bordered"
                onValueChange={onValueChange}
                id="content"
                value={value}
                endContent={
                    <div className="flex gap-4">
                        <Link
                            color="foreground"
                            onPress={onDeletePress}
                            className="text-sm"
                            as="button"
                        >
                            <XIcon size={20} strokeWidth={3/2} />
                        </Link>
                    </div>
                }
            />
        </div>
    )
}
