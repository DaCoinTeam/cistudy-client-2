import { FolderClosedIcon, FolderOpenIcon } from "lucide-react"
import React, { useContext } from "react"
import { useDropzone } from "react-dropzone"
import { updateResource } from "@services"
import { SectionContentItemContext } from "../../../.."
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"
import { Spacer } from "@nextui-org/react"

export const AddResourcesDropzone = () => {
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop:
            async (files: Array<File>) => {
                const _files = files.slice(0, 5)
                for (const file of _files) {
                    if (file.size > 10 * 1024 * 1024) {
                        notify!({
                            data: {
                                error: "The file size must not exceed 10 MB",
                            },
                            type: ToastType.Error,
                        })
                        return
                    }
                }
                const { message } = await updateResource({
                    data: {
                        resourceId: sectionContent.sectionContentId
                    },
                    files: _files
                })
                await mutate()
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
            },
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="border border-dashed text-primary rounded-medium p-6 grid place-items-center">
                <div className="flex gap-3 items-center">
                    {
                        isDragActive ? <FolderOpenIcon className="w-5 h-5 text-foreground-400" strokeWidth={3 / 2} /> : <FolderClosedIcon className="w-5 h-5 text-foreground-400" strokeWidth={3 / 2} />
                    }
                    <div className="text-foreground-400 text-sm">
                        {
                            isDragActive ? "Dragging..." : "Drag file(s) here"
                        }
                    </div>
                </div>
            </div>
            <Spacer y={2} />
            <div className="text-sm text-warning">
                        The resources file must not exceed 10 MB in size and can contain a
                        maximum of 5 resources
            </div>
        </div>
    )
}