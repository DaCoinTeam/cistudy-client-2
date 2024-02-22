import React from "react"
import { ContentType, PostContentEntity } from "@common"
import { Code } from "@nextui-org/react"
import { Image } from "@nextui-org/react"
import { getAssetUrl } from "@services"

interface ContentItemProps {
  postContent: PostContentEntity;
}

export const ContentItem = (props: ContentItemProps) => {
    const { postContent } = props

    const contentTypeToElement: Record<ContentType, () => JSX.Element> = {
        [ContentType.Text]: () => (
            <div className="whitespace-pre-line text-sm">
                {postContent.text}
            </div>
        ),
        [ContentType.Code]: () => (
            <Code className="whitespace-break-spaces">
                {postContent.text}
            </Code>
        ),
        [ContentType.Images]: () => {
            const images = postContent.postContentMedias
            const numberToGridCols: Record<number, string> = {
                1: "grid-cols-1",
                2: "grid-cols-2",
                3: "grid-cols-3",
                4: "grid-cols-4",
            }

            return (
                <div className={`grid ${numberToGridCols[images.length]} gap-2`}>
                    {images.map(({postContentMediaId, mediaId}) => (
                        <Image
                            key={postContentMediaId}
                            alt="image"
                            className="aspect-video"
                            src={getAssetUrl(mediaId)}
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
    
    return <> {contentTypeToElement[props.postContent.contentType]()} </>
}
