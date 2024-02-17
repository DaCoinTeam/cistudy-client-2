import { Spacer, Link, Textarea } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { CourseDetailsContext } from "../../../../../_hooks"
import * as Yup from "yup"
import { useFormik } from "formik"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"

export const Description = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course, finishFetch } = state
    const { fetchAndSetCourse } = functions

    const [isEdited, setIsEdited] = useState(false)

    const formik = useFormik({
        initialValues: {
            description: "",
        },
        validationSchema: Yup.object({
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async () => {
            if (!finishFetch) return

            if (course === null) return
            const { courseId } = course

            const response = await updateCourse({
                data: {
                    courseId,
                    description: formik.values.description,
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

    useEffect(() => {
        if (!course?.description) return
        formik.setFieldValue("description", course?.description)
    }, [course?.description])

    const onPress = async () => {
        if (isEdited) await formik.submitForm()
        setIsEdited(!isEdited)
    }
    return (
        <div>
            <div className="font-semibold ml-3"> Description </div>
            <Spacer y={1} />
            <Textarea
                labelPlacement="outside"
                label=""
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                    !!(formik.touched.description && formik.errors.description)
                }
                errorMessage={formik.touched.description && formik.errors.description}
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