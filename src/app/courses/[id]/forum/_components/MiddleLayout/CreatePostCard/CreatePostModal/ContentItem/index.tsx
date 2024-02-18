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
    console.log(props)
    const render = () => {
        switch (props.content.contentType) {
        case ContentType.Text:
            return (
                <div className="whitespace-pre-line">
                    {props.content.value as string}
                </div>
            )
        case ContentType.Code:
            return (
                <Code className="whitespace-break-spaces">
                    {props.content.value as string}
                </Code>
            )

        case ContentType.Images:
            return (
                <div className="grid grid-cols-4 gap-2">
                    {(props.content.value as Array<File>).map((image) => (
                        <Image
                            key={uuidv4()}
                            alt="image"
                            className="aspect-video"
                            src={URL.createObjectURL(image)}
                        />
                    ))}
                </div>
            )
        }
    }
    return <> {render()} </>
}
