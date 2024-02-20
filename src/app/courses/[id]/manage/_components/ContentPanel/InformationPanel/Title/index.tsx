import { Spacer, Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { updateCourse } from "@services"
import { CourseDetailsContext } from "../../../../../_hooks"
import { isErrorResponse } from "@common"
import * as Yup from "yup"
import { useFormik } from "formik"

export const Title = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course, finishFetch } = state
    const { fetchAndSetCourse } = functions
    const [isEdited, setIsEdited] = useState(false)
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
        }),
        onSubmit: async () => {
            if (!finishFetch) return
            if (course === null) return
            const { courseId } = course
            const response = await updateCourse({
                data: {
                    courseId,
                    title: formik.values.title,
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
        if (course === null) return
        formik.setFieldValue("title", course.title)
    }, [course?.title])

    const onPress = async () => {
        if (isEdited) await formik.submitForm()
        setIsEdited(!isEdited)
    }
    return (
        <div>
            <div className="font-semibold ml-3"> Title </div>
            <Spacer y={1} />
            <Input
                labelPlacement="outside"
                label=""
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
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
