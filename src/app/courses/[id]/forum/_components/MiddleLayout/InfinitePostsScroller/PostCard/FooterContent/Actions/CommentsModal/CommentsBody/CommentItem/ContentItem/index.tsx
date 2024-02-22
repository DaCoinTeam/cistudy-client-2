import React from "react"
import { ContentType, PostCommentContentEntity } from "@common"
import { Code } from "@nextui-org/react"
import { Image } from "@nextui-org/react"
import { getAssetUrl } from "@services"

interface ContentItemProps {
  postCommentContent: PostCommentContentEntity;
}

export const ContentItem = (props: ContentItemProps) => {
    const { postCommentContent } = props

    const contentTypeToElement: Record<ContentType, () => JSX.Element> = {
        [ContentType.Text]: () => (
            <div className="whitespace-pre-line text-sm">
                {postCommentContent.text}
            </div>
        ),
        [ContentType.Code]: () => (
            <Code className="whitespace-break-spaces">
                {postCommentContent.text}
            </Code>
        ),
        [ContentType.Images]: () => {
            const images = postCommentContent.postCommentContentMedias
            const numberToGridCols: Record<number, string> = {
                1: "grid-cols-1",
                2: "grid-cols-2",
                3: "grid-cols-3",
                4: "grid-cols-4",
            }

            return (
                <div className={`grid ${numberToGridCols[images.length]} gap-2`}>
                    {images.map(({postCommentContentMediaId, mediaId}) => (
                        <Image
                            key={postCommentContentMediaId}
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
    
    return <> {contentTypeToElement[props.postCommentContent.contentType]()} </>
}
