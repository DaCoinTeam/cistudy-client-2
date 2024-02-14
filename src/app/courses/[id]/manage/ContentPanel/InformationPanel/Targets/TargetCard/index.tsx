import { Card, CardBody, Link } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import { CourseTargetEntity, Vector2, isErrorResponse } from "@common"
import { useFormik } from "formik"
import * as Yup from "yup"
import { CourseDetailsContext } from "../../../../../_hooks"
import { DeepPartial } from "@apollo/client/utilities"

interface TargetCardProps {
   courseTarget: DeepPartial<CourseTargetEntity>
}

export const TargetCard = (props: TargetCardProps) => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 })
    const [isEdited, setIsEdited] = useState(false)

    const formik = useFormik({
        initialValues: {
            target: "",
        },
        validationSchema: Yup.object({
            target: Yup.string().required("Target is required"),
        }),
        onSubmit: async () => {
            // if (!state.finishFetch) return
            // const { courseId } = course!
            // const response = await updateCourse({
            //     data: {
            //         courseId,
            //         targets: formik.values.target,
            //     },
            // })
            // if (!isErrorResponse(response)) {
            //     // do message
            //     await fetchAndSetCourse()
            // } else {
            //     console.log(response)
            // }
        },
    })

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

    return (
        <Draggable position={position} onDrag={onDrag} onStop={onStop}>
            <Card className="bg-content2 cursor-move" shadow="none">
                <CardBody>
                    {" "}
                    <div className="flex justify-between items-center">
                        <div className="text-sm"> {props.courseTarget.content}</div>
                        <div className="flex gap-4">
                            <Link className="text-sm" as="button">
                Edit
                            </Link>
                            <Link className="text-sm" as="button">
                Remove
                            </Link>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Draggable>
    )
}
