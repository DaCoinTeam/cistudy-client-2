import { Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { ManageContext } from "../../../../../_hooks"
import { SaveIcon, PencilIcon } from "lucide-react"

interface ValidationShape {
    title: string
}

export const Title = () => {
    const { state, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions

    const [isEdited, setIsEdited] = useState(false)
    const [title, setTitle] = useState("")

    useEffect(() => { 
        if (!courseManaged) return
        const { title } = courseManaged
        setTitle(title)
    }, [courseManaged?.title])

    const schema =  Yup.object().shape({
        //title: Yup.string().required("Title is required"),
    })

    const shape: ValidationShape = {
        title,
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
            const { courseId } = courseManaged
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

    const onValueChange = (value: string) => setTitle(value)

    return (
        <Input
            label="Title"
            value={title}
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
                    {isEdited ? <SaveIcon size={20} strokeWidth={4/3}/> : <PencilIcon size={20} strokeWidth={4/3}/>}
                </Link>
            }
        />
    )
}
