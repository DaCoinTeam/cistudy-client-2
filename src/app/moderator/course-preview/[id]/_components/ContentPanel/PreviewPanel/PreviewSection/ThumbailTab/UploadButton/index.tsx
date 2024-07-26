import React, { useContext, useRef } from "react"
import { updateCourse } from "@services"
import { ManagementContext } from "../../../../../../_hooks"
import { Button } from "@nextui-org/react"
import useSWRMutation from "swr/mutation"

interface UploadButtonProps {
    className?: string
}

export const UploadButton = (props: UploadButtonProps) => {
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr
    const { courseId } = { ...courseManagement }

    const uploadThumbnailSwr = useSWRMutation("UPLOAD_THUMBNAIL", async (_: string, { arg } : { arg: { 
        file: File
    } }) => {
        if (!courseId) return
        await updateCourse({data: {
            courseId,
            thumbnailIndex: 0
        },
        files: [arg.file]
        } ) })

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        await uploadThumbnailSwr.trigger({
            file
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
                className={`${className}`}
                isLoading={uploadThumbnailSwr.isMutating}
            >
                {uploadThumbnailSwr.isMutating ? "Uploading" : "Upload"}
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
