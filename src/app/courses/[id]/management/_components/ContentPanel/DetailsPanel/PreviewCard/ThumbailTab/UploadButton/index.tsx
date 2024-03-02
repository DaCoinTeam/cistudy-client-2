import React, { useContext, useRef } from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { ManagementContext } from "../../../../../../_hooks"
import { Button } from "@nextui-org/react"
import { UploadIcon } from "lucide-react"

interface UploadButtonProps {
    className? : string
}

export const UploadButton = (props: UploadButtonProps) => {
    const {className} = props 

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { state, functions } = useContext(ManagementContext)!
    const { courseManagement } = state
    const { fetchAndSetCourseManaged } = functions

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        if (courseManagement === null) return
        const { courseId } = courseManagement

        const response = await updateCourse({
            data: {
                courseId,
                thumbnailIndex: 0,
            },
            files: [file],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourseManaged()
        } else {
            console.log(response)
        }
    }

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    return (
        <>
            <Button
                onPress={onPress}
                className={`bg-content2 ${className}`}
                startContent={<UploadIcon size={20} strokeWidth={4 / 3} />}
            >
          Upload
            </Button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
