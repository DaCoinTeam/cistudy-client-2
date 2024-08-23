import {
    AlertCircleIcon,
    FolderClosedIcon,
    FolderOpenIcon,
} from "lucide-react"
import React, { useContext } from "react"
import { useDropzone } from "react-dropzone"
import { Spacer } from "@nextui-org/react"
import { EditLessonContentContext } from "../EditLessionContentProvider"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"

export const AddVideoDropzone = () => {
    const { formik } = useContext(EditLessonContentContext)!
    const { notify } = useContext(RootContext)!

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            if (!files) return
            formik.setFieldValue("lessonVideo", files.at(0))
      notify!({
          data: {
              message:
            "Upload successfully. Please switch to preview page to see result.",
          },
          type: ToastType.Success,
      })
        },
        multiple: false,
        accept: {
            "video/*": [".mp4", ".webm", ".mkv", ".avi", ".mov"],
        }
    })

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="border border-dashed text-primary rounded-medium p-6 py-12 grid place-items-center">
                    <div className="flex gap-3 items-center">
                        {isDragActive ? (
                            <FolderOpenIcon
                                className="w-5 h-5 text-foreground-400"
                                strokeWidth={3 / 2}
                            />
                        ) : (
                            <FolderClosedIcon
                                className="w-5 h-5 text-foreground-400"
                                strokeWidth={3 / 2}
                            />
                        )}
                        <div className="text-foreground-400 text-sm">
                            {isDragActive ? "Dragging..." : "Drag or upload video here"}
                        </div>
                    </div>
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex gap-2 items-center">
                <AlertCircleIcon className="w-4 h-4 text-warning" strokeWidth={3 / 2} />
                <div className="text-xs text-warning">
                    {" "}
          When the upload is complete, the server will require some time to
          process the video into adaptive bitrate streams.{" "}
                </div>
            </div>
        </div>
    )
}
