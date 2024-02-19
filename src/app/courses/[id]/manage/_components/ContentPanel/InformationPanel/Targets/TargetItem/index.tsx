import { Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import { CourseTargetEntity, Vector2, isErrorResponse } from "@common"
import { useFormik } from "formik"
import * as Yup from "yup"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { deleteCourseTarget, updateCourseTarget } from "@services"

interface TargetItemProps {
  courseTarget: CourseTargetEntity;
}

export const TargetItem = (props: TargetItemProps) => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 })
    const [isEdited, setIsEdited] = useState(false)

    const onPress = () => {
        if (isEdited) formik.handleSubmit()
        setIsEdited(!isEdited)
    }

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: Yup.object({
            content: Yup.string().required("Content is required"),
        }),
        onSubmit: async () => {
            const response = await updateCourseTarget({
                data: {
                    courseTargetId: props.courseTarget.courseTargetId,
                    content: formik.values.content,
                },
            })
            if (!isErrorResponse(response)) {
                // do message
                await fetchAndSetCourse()
            } else {
                console.log(response)
            }
        },
    })

    const courseTarget = course?.courseTargets?.find(
        (courseTarget) =>
            courseTarget?.courseTargetId === props.courseTarget.courseTargetId
    )
    useEffect(() => {
        if (!courseTarget) return
        formik.setFieldValue("content", courseTarget.content)
    }, [courseTarget])

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
        if (!state.finishFetch) return
        const { courseId } = course!
        if (!courseId) return
        const response = await deleteCourseTarget({
            data: {
                courseTargetId: props.courseTarget.courseTargetId,
            },
        })
        if (!isErrorResponse(response)) {
            // do message
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    return (
        <Draggable disabled position={position} onDrag={onDrag} onStop={onStop}>
            <div>
                <Input
                    labelPlacement="outside"
                    label=""
                    id="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.content && formik.errors.content)}
                    errorMessage={formik.touched.content && formik.errors.content}
                    isReadOnly={!isEdited}
                    value={formik.values.content}
                    endContent={
                        <div className="flex gap-4">
                            <Link className="text-sm" as="button" onPress={onPress}>
                                {isEdited ? "Save" : "Edit"}
                            </Link>
                            <Link onPress={onRemovePress} className="text-sm" as="button">
                Remove
                            </Link>
                        </div>
                    }
                />
            </div>
        </Draggable>
    )
}
