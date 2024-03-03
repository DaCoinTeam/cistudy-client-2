import React, { useContext, useRef } from "react"
import { updateCourse } from "@services"
import { ManagementContext } from "../../../../../../_hooks"
import { Button } from "@nextui-org/react"
import { UploadIcon } from "lucide-react"

interface UploadButtonProps {
    className? : string
}

export const UploadButton = (props: UploadButtonProps) => {
    const {className} = props 

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement, mutate } = courseManagementSwr

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        if (!courseManagement) return
        const { courseId } = courseManagement

        await updateCourse({
            data: {
                courseId,
                previewVideoIndex: 0,
            },
            files: [file],
        })

        await mutate()
    }

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    return (
        <>
            <Button
                onPress={onPress}
                color="primary"
                className={`text-secondary-foreground ${className}`}
                startContent={<UploadIcon size={20} strokeWidth={4 / 3} />}
            >
          Upload
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
