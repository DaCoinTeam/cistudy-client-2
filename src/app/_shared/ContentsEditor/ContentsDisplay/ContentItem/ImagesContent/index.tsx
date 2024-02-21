import React, { useContext } from "react"
import { Badge, Link, Image } from "@nextui-org/react"
import { ContentsEditorContext } from "../../../ContentsEditorProviders"
import { XMarkIcon, MinusCircleIcon } from "@heroicons/react/24/outline"
import { v4 as uuidv4 } from "uuid"
import { PostContent } from "../../../useContentsEditorReducer"
import { ImageDropzone } from "./ImageDropzone"

interface ImagesContentProps {
  postContentIndex: number;
}

export const ImagesContent = (props: ImagesContentProps) => {
    const { state, dispatch } = useContext(ContentsEditorContext)!

    const { postContentIndex } = props
    const postContent = state.postContents.at(postContentIndex) as PostContent

    const onDrop = (files: Array<File>) => {
        postContent.postContentMedias?.push(...files)
        console.log(postContent)
        dispatch({
            type: "UPDATE_POST_CONTENT",
            payload: postContent,
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Link as="button" color="danger">
                <MinusCircleIcon className="w-6 h-6" />
            </Link>
            <div className="grid grid-cols-4 gap-2 w-full">
                {postContent.postContentMedias?.map((image, index) => (
                    <Badge
                        isOneChar
                        key={uuidv4()}
                        as="button"
                        content={<XMarkIcon />}
                        shape="circle"
                        color="danger"
                        onClick={() => {
                            postContent.postContentMedias?.splice(index, 1)
                            console.log(postContent.postContentMedias)
                            dispatch({
                                type: "UPDATE_POST_CONTENT",
                                payload: postContent,
                            })
                        }}
                    >
                        <Image
                            className="aspect-video"
                            alt="image"
                            src={URL.createObjectURL(image)}
                        />
                    </Badge>
                ))}
                <ImageDropzone
                    onDrop={onDrop}
                />
            </div>
        </div>
    )
}
