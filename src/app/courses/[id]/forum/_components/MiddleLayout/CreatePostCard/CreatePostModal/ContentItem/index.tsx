import React from "react"
import { ContentType } from "@common"
import { Code } from "@nextui-org/react"
import { PostContent } from "../FormikProviders"
import { v4 as uuidv4 } from "uuid"
import { Image } from "@nextui-org/react"

interface ContentItemProps {
  content: PostContent;
}

export const ContentItem = (props: ContentItemProps) => {
    const contentTypeToElement: Record<ContentType, () => JSX.Element> = {
        [ContentType.Text]: () => (
            <div className="whitespace-pre-line text-sm">
                {props.content.value as string}
            </div>
        ),
        [ContentType.Code]: () => (
            <Code className="whitespace-break-spaces">
                {props.content.value as string}
            </Code>
        ),
        [ContentType.Images]: () => {
            const images = props.content.value as Array<File>
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
