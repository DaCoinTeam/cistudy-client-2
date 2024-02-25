import { Input, Link, Spacer } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { ManageContext } from "../../../../_hooks"

interface ValidationShape {
    title: string
}

export const Title = () => {
    const { state, dispatch, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions

    const [isEdited, setIsEdited] = useState(false)

    const schema =  Yup.object().shape({
        title: Yup.string().required("Title is required"),
    })

    const shape: ValidationShape = {
        title: courseManaged?.title ?? "",
    }

    const isValid = schema.isValidSync(shape)

    const errors: Partial<ValidationShape> = {}
    try{
        schema.validateSync(shape, {abortEarly: false})
    } catch(ex) {
        const inner = (ex as ValidationError).inner
        for (const { path,  message } of inner) {
            errors[path as "title"] = message
        }
    }

    const onPress = async () => {
        if (isEdited) {
            if (courseManaged === null) return
            const { courseId, title } = courseManaged
            const response = await updateCourse({
                data: {
                    courseId,
                    title,
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

    const onValueChange = (value: string) => {
        if (courseManaged === null) return
        dispatch({
            type: "SET_COURSE_MANAGED",
            payload: {
                ...courseManaged,
                title: value
            }
        })
    }

    return (
        <div>
            <div className="font-semibold ml-3"> Title </div>
            <Spacer y={1} />
            <Input
                labelPlacement="outside"
                label=""
                id="title"
                value={courseManaged?.title}
                onValueChange={onValueChange}
                isInvalid={!isValid}
                errorMessage={errors.title}
                readOnly={!isEdited}
                endContent={
                    <Link
                        color="primary"
                        onPress={onPress}
                        as="button"
                        className="text-sm"
                    >
                        {isEdited ? "Save" : "Edit"}
                    </Link>
                }
            />
        </div>
    )
}
