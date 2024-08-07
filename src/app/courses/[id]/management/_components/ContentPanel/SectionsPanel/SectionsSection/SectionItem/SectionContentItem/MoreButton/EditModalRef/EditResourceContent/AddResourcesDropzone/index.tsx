import { FolderClosedIcon, FolderOpenIcon } from "lucide-react"
import React, { useContext } from "react"
import { useDropzone } from "react-dropzone"
import { updateResource } from "@services"
import { SectionContentItemContext } from "../../../.."
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"

export const AddResourcesDropzone = () => {
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const {getRootProps, getInputProps, isDragActive } = useDropzone({onDrop: 
        async (files: Array<File>) => {
            const { message } = await updateResource({
                data: {
                    resourceId: sectionContent.sectionContentId
                },
                files
            })
            await mutate()
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
        }
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="border border-dashed text-primary rounded-medium p-6 grid place-items-center">
                <div className="flex gap-3 items-center">
                    {
                        isDragActive ? <FolderOpenIcon className="w-5 h-5 text-foreground-400" strokeWidth={3/2}/> : <FolderClosedIcon className="w-5 h-5 text-foreground-400" strokeWidth={3/2}/> 
                    }
                    <div className="text-foreground-400 text-sm">
                        {
                            isDragActive ? "Dragging..." : "Drag file(s) here" 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}