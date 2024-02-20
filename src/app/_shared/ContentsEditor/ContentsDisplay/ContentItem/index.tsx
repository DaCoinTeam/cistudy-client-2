import React from "react"
import { ContentType } from "@common"
import { Code, Input, Link } from "@nextui-org/react"
import { PostContent } from "../../useContentsEditorReducer"
import { v4 as uuidv4 } from "uuid"
import { Image } from "@nextui-org/react"
import { XCircleIcon } from "@heroicons/react/24/outline"

interface ContentItemProps {
  content: PostContent;
}

export const ContentItem = (props: ContentItemProps) => {
    
    const contentTypeToElement: Record<ContentType, () => JSX.Element> = {
        [ContentType.Text]: () => (
            <Input
                labelPlacement="outside"
                className="whitespace-pre-line text-sm"
                classNames={{
                    inputWrapper: "bg-content1 shadow-none",
                }}
                value={props.content.text}
                endContent={
                    <Link as="button">
                        <XCircleIcon className="w-6 h-6" />
                    </Link>
                }
            />
        ),
        [ContentType.Code]: () => (
            <Code className="whitespace-break-spaces">{props.content.text}</Code>
        ),
        [ContentType.Images]: () => {
            const images = props.content.postContentMedias as Array<File>
            const numberToGridCols: Record<number, string> = {
                1: "grid-cols-1",
                2: "grid-cols-2",
                3: "grid-cols-3",
                4: "grid-cols-4",
            }

            return (
                <div className={`grid ${numberToGridCols[images.length]} gap-2`}>
                    {images.map((image) => (
                        <Image
                            key={uuidv4()}
                            alt="image"
                            className="aspect-video"
                            src={URL.createObjectURL(image)}
                        />
                    ))}
                </div>
            )
        },
        [ContentType.Link]: function (): JSX.Element {
            throw new Error("Function not implemented.")
        },
        [ContentType.Videos]: function (): JSX.Element {
            throw new Error("Function not implemented.")
        },
    }
    return <> {contentTypeToElement[props.content.contentType]()} </>
}
