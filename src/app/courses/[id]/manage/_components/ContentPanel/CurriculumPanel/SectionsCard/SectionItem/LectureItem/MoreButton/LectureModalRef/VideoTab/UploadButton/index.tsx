import React, { useContext, useRef } from "react"
import { updateLecture } from "@services"
import { isErrorResponse } from "@common"
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

    const { functions } = useContext(SectionItemContext)!
    const { fetchAndSetLectures } = functions

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        const response = await updateLecture({
            data: {
                lectureId,
                lectureVideoIndex: 0,
            },
            files: [file],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLectures()
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
                accept="video/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
