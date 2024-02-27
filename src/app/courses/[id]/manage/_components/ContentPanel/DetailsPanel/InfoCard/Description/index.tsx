import { Link, Textarea } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { ManageContext } from "../../../../../_hooks"

interface ValidationShape {
  description: string;
}

export const Description = () => {
    const { state, dispatch, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions


    const [isEdited, setIsEdited] = useState(false)

    const schema = Yup.object().shape({
        description: Yup.string().required("Description is required"),
    })

    const shape: ValidationShape = {
        description: courseManaged?.description ?? "",
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
        if (courseManaged === null) return
        dispatch({
            type: "SET_COURSE_MANAGED",
            payload: {
                ...courseManaged,
                description: value,
            },
        })
    }

    const onPress = async () => {
        if (isEdited) {
            if (courseManaged === null) return
            const { courseId, description } = courseManaged
            const response = await updateCourse({
                data: {
                    courseId,
                    description,
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

    return (
        <Textarea
            label="Description"
            id="description"
            value={courseManaged?.description}
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
    )
}