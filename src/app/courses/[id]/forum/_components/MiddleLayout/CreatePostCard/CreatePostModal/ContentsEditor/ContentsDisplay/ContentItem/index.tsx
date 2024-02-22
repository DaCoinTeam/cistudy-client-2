import React from "react"
import { ContentType, Content } from "@common"
import { CodeContent } from "./CodeContent"
import { ImagesContent } from "./ImagesContent"
import { TextContent } from "./TextContent"

interface ContentItemProps {
  content: Content;
}

export const ContentItem = (props: ContentItemProps) => {  
    const { content } = props
    const { contentType } = content

    const contentTypeToElement: Record<ContentType, JSX.Element> = {
        [ContentType.Text]: <TextContent content={content} />,
        [ContentType.Code]: <CodeContent content={content} />,
        [ContentType.Images]: <ImagesContent content={content} />,
        [ContentType.Link]: <CodeContent content={content} />,
        [ContentType.Videos]: <CodeContent content={content} />,
    }

    return <> {contentTypeToElement[contentType]} </>
}
