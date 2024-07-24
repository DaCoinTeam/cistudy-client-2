import { FileIcon } from "lucide-react"
import React, { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import { updateResource } from "@services"
import { SectionContentItemContext } from "../../../.."
import { ManagementContext } from "../../../../../../../../../../_hooks"

export const AddResourcesDropzone = () => {
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const {getRootProps, getInputProps} = useDropzone({onDrop: 
        async (files: Array<File>) => {
            console.log("hentai")
            await updateResource({
                data: {
                    resourceId: sectionContent.sectionContentId
                },
                files
            })
            await mutate()
        }
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="border border-dashed text-primary rounded-medium px-4 py-3 grid place-items-center">
                <div className="flex gap-3 items-center">
                    <FileIcon className="w-5 h-5 text-foreground-400"/>
                    <div className="text-foreground-400 text-sm">
                    Drag file(s) here
                    </div>
                </div>
            </div>
        </div>
    )
}