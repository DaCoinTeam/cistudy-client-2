import React, {
    useContext,
    useRef,
} from "react"
import { isErrorResponse } from "@common"
import { updateLecture } from "@services"
import { LectureItemContext } from "../../../../.."
import { SectionItemContext } from "../../../../../.."
import { Button } from "@nextui-org/react"
import { PlaySquareIcon } from "lucide-react"

interface EditVideoButtonProps{
    className?: string
}

export const EditVideoButton = (props: EditVideoButtonProps) => {
    const { className } = props
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

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

    return (
        <>
            <Button className={`${className} bg-content2`} onPress={onPress} startContent={<PlaySquareIcon size={20} strokeWidth={4/3}/>}> Edit Video </Button>
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
