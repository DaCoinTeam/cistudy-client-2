import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
} from "react"
import { isErrorResponse } from "@common"
import { updateCourse } from "@services"
import { ManageContext } from "../../../../../../_hooks"

export interface EditThumbnailRefSelectors {
    onOpenDirectoryPress: () => void;
}
export const EditThumbnailRef = forwardRef<EditThumbnailRefSelectors>(
    (_, ref) => {
        const fileInputRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(ref, () => ({
            onOpenDirectoryPress() {
                if (fileInputRef.current) fileInputRef.current.click()
            },
        }))

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

        return (
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        )
    }
)
