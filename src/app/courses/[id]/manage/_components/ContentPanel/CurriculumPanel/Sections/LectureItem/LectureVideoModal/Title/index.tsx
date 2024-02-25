import { Spacer, Input, Link } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { isErrorResponse } from "@common"
import { LectureItemContext } from "../../index"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { updateLecture } from "@services"

interface ValidationShape {
  title: string;
}

export const Title = () => {
    const { state, dispatch, functions } = useContext(LectureItemContext)!
    const { lecture } = state

    const { fetchAndSetLecture } = functions

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
        if (lecture === null) return
        const { lectureId, title } = lecture
        if (isEdited) {
            const response = await updateLecture({
                data: {
                    lectureId,
                    title,
                },
            })
            if (!isErrorResponse(response)) {
                await fetchAndSetLecture()
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
                value={lecture?.title}
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
