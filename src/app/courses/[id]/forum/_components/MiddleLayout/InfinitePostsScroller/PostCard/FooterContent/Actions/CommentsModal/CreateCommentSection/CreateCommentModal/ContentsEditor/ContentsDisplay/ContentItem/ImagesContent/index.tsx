import React, { useContext } from "react"
import { Badge, Link, Image } from "@nextui-org/react"
import {
    XMarkIcon,
    MinusCircleIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline"
import { v4 as uuidv4 } from "uuid"
import { Content } from "@common"
import Dropzone from "react-dropzone"
import { CreateCommentModalContext } from "../../../../CreateCommentModalProviders"

interface ImagesContentProps {
  content: Content;
}

export const ImagesContent = (props: ImagesContentProps) => {
    const { functions } = useContext(CreateCommentModalContext)!
    const { updateContent, deleteContent } = functions
    const { content } = props

    const onDrop = (files: Array<File>) => {
        content.contentMedias?.push(
            ...files.map((file) => ({
                key: uuidv4(),
                data: file,
            }))
        )
        updateContent(content)
    }

    const onDeletePress = () => {
        deleteContent(content.key)
    }

    return (
        <div className="flex items-center gap-4">
            <Link as="button" color="danger" onPress={onDeletePress}>
                <MinusCircleIcon className="w-6 h-6" />
            </Link>
            <div className="grid grid-cols-4 gap-2 w-full">
                {content.contentMedias?.map((image) => (
                    <Badge
                        isOneChar
                        key={image.key}
                        as="button"
                        content={<XMarkIcon />}
                        shape="circle"
                        color="danger"
                        onClick={() => {
                            const contentMedias = content.contentMedias?.filter(
                                ({ key }) => image.key !== key
                            )
                            content.contentMedias = contentMedias
                            updateContent(content)
                        }}
                    >
                        <Image
                            className="aspect-video"
                            alt="image"
                            src={URL.createObjectURL(image.data)}
                        />
                    </Badge>
                ))}
                <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="aspect-video">
                            <div {...getRootProps({ className: "h-full" })}>
                                <input {...getInputProps()} />
                                {
                                    <div className="cursor-pointer border-dashed rounded-large border-4 grid place-content-center h-full">
                                        <PhotoIcon className="w-10 h-10 text-foreground-500" />
                                    </div>
                                }
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}
