import React, { useContext, useRef } from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { ManageContext } from "../../../../../../_hooks"
import { Button } from "@nextui-org/react"
import { PlaySquare } from "lucide-react"

interface EditPreviewVideoButtonProps {
    className? : string
}

export const EditPreviewVideoButton = (props: EditPreviewVideoButtonProps) => {
    const {className} = props 

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { state, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        if (courseManaged === null) return
        const { courseId } = courseManaged

        const response = await updateCourse({
            data: {
                courseId,
                previewVideoIndex: 0,
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
                className={`${className} bg-content2`}
                onPress={onPress}
                startContent={<PlaySquare  size={20} strokeWidth={4/3} />}
            >
               Edit Video
            </Button>
            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
