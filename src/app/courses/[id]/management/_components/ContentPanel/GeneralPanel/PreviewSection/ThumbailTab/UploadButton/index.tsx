import React, { useContext, useRef } from "react"
import { updateCourse } from "@services"
import { ManagementContext } from "../../../../../../_hooks"
import { Button } from "@nextui-org/react"
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"

interface UploadButtonProps {
    className?: string
}

export const UploadButton = (props: UploadButtonProps) => {
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate, isLoading } = courseManagementSwr

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
                thumbnailIndex: 0,
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
                color="secondary"
                className={`${className}`}
                startContent={isLoading ? "" : <ArrowUpTrayIcon height={20} width={20} />}
                isLoading={isLoading}
            >
                {isLoading ? "Uploading" : "Upload"}
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
