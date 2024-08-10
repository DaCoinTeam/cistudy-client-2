"use client"

import React, { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import {
    FolderClosedIcon,
    FolderOpenIcon,
} from "lucide-react"
import { Badge, Image, Link, Spacer } from "@nextui-org/react"
import { MediaType, isFileImage } from "@common"
import { getAssetUrl } from "@services"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { EditQuizQuestionModalContext } from ".."
import { EditQuizQuestionContext } from "../EditQuizQuesitonModalProvider"
import { VideoPlayer } from "../../../../../../../../../../../../../../_shared"

export const DropzonePreview = () => {
    const onDrop = useCallback((files: Array<File>) => {
        formik.setFieldValue("mediaFile", files.at(0))
        formik.setFieldValue("deleteMedia", false)
    }, [])

    const { formik } = useContext(EditQuizQuestionContext)!
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    })

    const { props } = useContext(EditQuizQuestionModalContext)!
    const { question: _question } = props
    const { mediaId, mediaType } = _question

    const type = formik.values.mediaFile
        ? isFileImage(formik.values.mediaFile)
            ? MediaType.Image
            : MediaType.Video
        : mediaType
  
    const src = formik.values.mediaFile
        ? URL.createObjectURL(formik.values.mediaFile)
        : getAssetUrl(mediaId)

    return (
        <div>
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
            {(formik.values.mediaFile || mediaId) && !formik.values.deleteMedia ? (
                <>
                    <Spacer y={4} />
                    <div className="flex justify-between items-center">
                        <div className="text-sm">Preview</div>
                        <div>
                            <Badge
                                classNames={{
                                    badge: "p-0"
                                }}
                                color="danger"
                                content={
                                    <Link
                                        as="button"
                                        className="text-white w-5 h-5"
                                        onPress={() => {
                                            formik.setFieldValue("deleteMedia", true)
                                        }}
                                    >
                                        <XMarkIcon/>
                                    </Link>
                                }
                                size="lg"
                                className="top-0 right-0"
                                shape="circle"
                            >
                                {type === MediaType.Image ? (
                                    <Image
                                        removeWrapper
                                        src={src}
                                        alt="media"
                                        className="w-[300px] aspect-video"
                                    />
                                ) : (
                                    <VideoPlayer src={src} className="w-[300px] aspect-video" />
                                )}
                            </Badge>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}
