import { Button, Spacer } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { VideoPlayer } from "../../../../../../../../_shared"
import { getAssetUrl, updateCourse } from "@services"
import { useDropzone } from "react-dropzone"
import { FolderClosedIcon, FolderOpenIcon } from "lucide-react"
import useSWRMutation from "swr/mutation"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"

export const VideoTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr

    const [video, setVideo] = useState<File | undefined>()

    const { courseId } = { ...courseManagement }
    const { notify } = useContext(RootContext)!

    const { trigger, isMutating } = useSWRMutation(
        "UPLOAD_VIDEO",
        async (
            _: string,
            {
                arg,
            }: {
        arg: {
          file: File;
        };
      }
        ) => {
            if (!courseId) return
            const { message } = await updateCourse({
                data: {
                    courseId,
                    previewVideoIndex: 0,
                },
                files: [arg.file],
            })
            await mutate()
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
        }
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            setVideo(files.at(0))
        },
        multiple: false,
        accept: {
            "video/*": [".mp4", ".webm", ".mkv", ".avi", ".mov"],
        }
    })

    return (
        <div>
            <div className="w-[600px]">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="border border-dashed text-primary rounded-medium p-6 grid place-items-center">
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
                                {isDragActive ? "Dragging..." : "Drag media here"}
                            </div>
                        </div>
                    </div>
                </div>
                {video ? (
                    <>
                        <Spacer y={4} />
                        <VideoPlayer src={URL.createObjectURL(video)} className="w-full" />
                    </>
                ) : courseManagement?.previewVideoId ? (
                    <>
                        <Spacer y={4} />
                        <VideoPlayer
                            src={getAssetUrl(courseManagement?.previewVideoId)}
                            className="w-full"
                        />
                    </>
                ) : null}
            </div>
            <Spacer y={6} />
            <div className="gap-2 flex items-center">
                <Button
                    color="primary"
                    onPress={async () => {
                        if (!video) return
                        await trigger({
                            file: video
                        })
                    }}
                    isDisabled={!video}
                    isLoading={isMutating}
                >
                    Upload
                </Button>
                <Button color="primary" variant="bordered">
          Cancel
                </Button>
            </div>
        </div>
    )
}
