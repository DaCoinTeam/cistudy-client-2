import { Input, Link } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import { CourseTargetEntity, Vector2, isErrorResponse } from "@common"
import { deleteCourseTarget, updateCourseTarget } from "@services"
import { ManageContext } from "../../../../../_hooks"
import { CheckCheckIcon, PencilIcon, SaveIcon, TrashIcon } from "lucide-react"

interface TargetItemProps {
  courseTarget: CourseTargetEntity;
}

export const TargetItem = (props: TargetItemProps) => {
    const { courseTarget } = props
    const { courseTargetId, content } = courseTarget 

    const { state, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions

    const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 })
    const [isEdited, setIsEdited] = useState(false)

    const onPress = async () => {
        if (isEdited) {
            const response = await updateCourseTarget({
                data: {
                    courseTargetId,
                    content,
                },
            })
            if (!isErrorResponse(response)) {
                await fetchAndSetCourseManaged()
            } else {
                console.log(response)
            }
        }
        setIsEdited(!isEdited)
    }

    const onDrag = (_: DraggableEvent, ui: DraggableData) => {
        setPosition({
            x: position.x + ui.deltaX,
            y: position.y + ui.deltaY,
        })
        console.log(ui)
    }

    const onStop = () => {
        setPosition({
            x: 0,
            y: 0,
        })
    }

    const onRemovePress = async () => {
        if (courseManaged === null) return
        const { courseId } = courseManaged
        if (!courseId) return
        const response = await deleteCourseTarget({
            data: {
                courseTargetId: props.courseTarget.courseTargetId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourseManaged()
        } else {
            console.log(response)
        }
    }

    return (
        <Draggable disabled position={position} onDrag={onDrag} onStop={onStop}>
            <div>
                <Input
                    startContent={<CheckCheckIcon size={20} strokeWidth={4/3}/>}
                    labelPlacement="outside"
                    label=""
                    id="content"
                    isReadOnly={!isEdited}
                    value={content}
                    endContent={
                        <div className="flex gap-4">
                            <Link className="text-sm" as="button" onPress={onPress}>
                                {isEdited ? <SaveIcon size={20} strokeWidth={4/3}/> : <PencilIcon size={20} strokeWidth={4/3}/>}
                            </Link>
                            <Link onPress={onRemovePress} className="text-sm" as="button">
                                <TrashIcon size={20} strokeWidth={4/3}/>
                            </Link>
                        </div>
                    }
                />
            </div>
        </Draggable>
    )
}
