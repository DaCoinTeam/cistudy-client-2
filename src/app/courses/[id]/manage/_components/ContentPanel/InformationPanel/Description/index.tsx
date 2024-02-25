import { Spacer, Link, Textarea } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { CourseDetailsContext } from "../../../../../_hooks"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"

interface ValidationShape {
  description: string;
}

export const Description = () => {
    const { state, dispatch, functions } = useContext(CourseDetailsContext)!
    const { course, finishFetch } = state
    const { fetchAndSetCourse } = functions

    const [isEdited, setIsEdited] = useState(false)

    const schema = Yup.object().shape({
        description: Yup.string().required("Description is required"),
    })

    const shape: ValidationShape = {
        description: course?.description ?? "",
    }

    const isValid = schema.isValidSync(shape)

    const errors: Partial<ValidationShape> = {}
    try {
        schema.validateSync(shape, { abortEarly: false })
    } catch (ex) {
        const inner = (ex as ValidationError).inner
        for (const { path, message } of inner) {
            errors[path as "description"] = message
        }
    }

    const onValueChange = (value: string) => {
        if (course === null) return
        dispatch({
            type: "SET_COURSE",
            payload: {
                ...course,
                description: value,
            },
        })
    }

    const onPress = async () => {
        if (isEdited) {
            if (!finishFetch) return
            if (course === null) return
            const { courseId, description } = course
            const response = await updateCourse({
                data: {
                    courseId,
                    description,
                },
            })
            if (!isErrorResponse(response)) {
                await fetchAndSetCourse()
            } else {
                console.log(response)
            }
        }
        setIsEdited(!isEdited)
    }

    return (
        <div>
            <div className="font-semibold ml-3"> Description </div>
            <Spacer y={1} />
            <Textarea
                label=""
                labelPlacement="outside"
                id="description"
                value={course?.description}
                onValueChange={onValueChange}
                isInvalid={!isValid}
                errorMessage={errors.description}
                readOnly={!isEdited}
                endContent={
                    <Link
                        color="primary"
                        onPress={onPress}
                        className="text-sm"
                        as="button"
                        type={isEdited ? "submit" : undefined}
                    >
                        {isEdited ? "Save" : "Edit"}
                    </Link>
                }
            />
        </div>
    )
}
