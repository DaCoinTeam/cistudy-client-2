import { Input, Link } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { isErrorResponse } from "@common"
import { LectureItemContext } from "../../.."
import * as Yup from "yup"
import { ValidationError } from "yup"
import { updateLecture } from "@services"
import { SectionItemContext } from "../../../.."

interface ValidationShape {
  title: string;
}

export const Title = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId, title } = lecture

    const { state, dispatch } = useContext(SectionItemContext)!
    console.log(state)

    const [isEdited, setIsEdited] = useState(false)

    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
    })

    const shape: ValidationShape = {
        title: lecture?.title ?? "",
    }

    const isValid = schema.isValidSync(shape)

    const errors: Partial<ValidationShape> = {}
    try {
        schema.validateSync(shape, { abortEarly: false })
    } catch (ex) {
        const inner = (ex as ValidationError).inner
        for (const { path, message } of inner) {
            errors[path as "title"] = message
        }
    }

    const onPress = async () => {
        if (isEdited) {
            const response = await updateLecture({
                data: {
                    lectureId,
                    title,
                },
            })
            if (!isErrorResponse(response)) {
                //
            } else {
                console.log(response)
            }
        }
        setIsEdited(!isEdited)
    }

    const onValueChange = (value: string) => {
        dispatch({
            type: "UPDATE_LECTURE",
            payload: {
                ...lecture,
                title: value
            }
        })
    }

    return (
        <Input
            label="Title"
            id="title"
            value={lecture.title}
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
    )
}
