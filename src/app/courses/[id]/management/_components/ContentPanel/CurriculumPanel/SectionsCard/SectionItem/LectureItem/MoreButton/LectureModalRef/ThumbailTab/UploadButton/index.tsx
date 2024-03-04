import React, { useContext, useRef } from "react"
import { updateLecture } from "@services"
import { Button } from "@nextui-org/react"
import { UploadIcon } from "lucide-react"
import { LectureItemContext } from "../../../.."
import { SectionItemContext } from "../../../../.."

interface UploadButtonProps {
    className? : string
}

export const UploadButton = (props: UploadButtonProps) => {
    const {className} = props 

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { props : lectureItemProps } = useContext(LectureItemContext)!
    const { lecture } = lectureItemProps
    const { lectureId } = lecture

    const { swrs } = useContext(SectionItemContext)!
    const { lecturesSwr } = swrs
    const { mutate } = lecturesSwr

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        await updateLecture({
            data: {
                lectureId,
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
                className={`bg-content2 ${className}`}
                startContent={<UploadIcon size={20} strokeWidth={3/2} />}
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
