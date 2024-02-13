import { Spacer, Input, Link } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { updateCourse } from "@services"
import { CourseDetailsContext } from "../../../../_hooks"
import { isErrorResponse } from "@common"
import { FormikContext } from "../FormikProviders"
export const TitleInput = () => {
    const {state, functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions
    const [isEdited, setIsEdited] = useState(false)

    const formik = useContext(FormikContext)!

    const onClick = async () => {
        if (!state.finishFetch) return
        const { course } = state
        const { courseId } = course!
        if (isEdited) {
            const response = await updateCourse({
                data: {
                    courseId,
                    title: formik.values.title
                }
            })
            if (!isErrorResponse(response)) {
                // do message
                await fetchAndSetCourse()
            } else {
                console.log(response)
            }
        }
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
                        onClick={onClick}
                        className="text-sm cursor-pointer"
                    >
                        {isEdited ? "Save" : "Edit"}
                    </Link>
                }
            />
        </div>
    )
}
