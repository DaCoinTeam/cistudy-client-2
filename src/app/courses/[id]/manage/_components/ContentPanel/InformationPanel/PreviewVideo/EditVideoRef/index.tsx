import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { CourseDetailsContext } from "../../../../../../_hooks"

export interface EditVideoRefSelectors {
    onPressOpenDirectory : () => void
}

export const EditVideoRef = forwardRef<EditVideoRefSelectors>((_, ref
) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({ 
        onPressOpenDirectory () {
            if (fileInputRef.current) fileInputRef.current.click()
        }
    }))

    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return
        
        if (course === null) return 
        const { courseId } = course

        const response = await updateCourse({
            data: {
                courseId,
                previewVideoIndex: 0,
            },
            files: [file],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    return (
        <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
        />
    )   
})
