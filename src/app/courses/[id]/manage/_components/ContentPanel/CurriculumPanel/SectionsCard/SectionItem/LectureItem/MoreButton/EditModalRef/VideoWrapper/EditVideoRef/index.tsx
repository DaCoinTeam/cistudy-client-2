import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { isErrorResponse } from "@common"
import { updateLecture } from "@services"
import { LectureItemContext } from "../../../.."
import { SectionItemContext } from "../../../../.."

export interface EditVideoRefSelectors {
    onOpenDirectoryPress: () => void;
}
export const EditVideoRef = forwardRef<EditVideoRefSelectors>(
    (_, ref) => {
        const fileInputRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(ref, () => ({
            onOpenDirectoryPress() {
                if (fileInputRef.current) fileInputRef.current.click()
            },
        }))

        const { props } = useContext(LectureItemContext)!
        const { lecture } = props
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
            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        )
    })
