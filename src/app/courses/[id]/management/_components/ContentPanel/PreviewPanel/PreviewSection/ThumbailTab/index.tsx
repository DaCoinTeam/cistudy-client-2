import { Button, Image, Spacer } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { getAssetUrl, updateCourse } from "@services"
import { useDropzone } from "react-dropzone"
import { FolderClosedIcon, FolderOpenIcon } from "lucide-react"
import useSWRMutation from "swr/mutation"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"

export const ThumbnailTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr

    const [image, setImage] = useState<File | undefined>()

    const { courseId } = { ...courseManagement }
    const { notify } = useContext(RootContext)!

    const { trigger, isMutating } = useSWRMutation(
        "UPLOAD_THUMBNAIL",
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
                    thumbnailIndex: 0,
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
            setImage(files.at(0))
        },
        multiple: false,
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
                {image ? (
                    <>
                        <Spacer y={4} />
                        <Image alt="thumbnail" src={URL.createObjectURL(image)} className="w-full" />
                    </>
                ) : courseManagement?.thumbnailId ? (
                    <>
                        <Spacer y={4} />
                        <Image alt="thumbnail"
                            src={getAssetUrl(courseManagement?.thumbnailId)}
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
                        if (!image) return
                        await trigger({
                            file: image
                        })
                    }}
                    isDisabled={!image}
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
