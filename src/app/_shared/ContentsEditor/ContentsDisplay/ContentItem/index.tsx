import React from "react"
import { ContentType } from "@common"
import { TextContent } from "./TextContent"
import { PostContent } from "../../useContentsEditorReducer"
import { CodeContent } from "./CodeContent"
import { ImagesContent } from "./ImagesContent"

interface ContentItemProps {
  postContent: Pick<PostContent, "contentType" | "index">;
}

export const ContentItem = (props: ContentItemProps) => {
    const { postContent } = props
    const { contentType, index } = postContent
    const contentTypeToElement: Record<ContentType, JSX.Element> = {
        [ContentType.Text]: <TextContent postContentIndex={index} />,
        [ContentType.Code]: <CodeContent postContentIndex={index} />,
        [ContentType.Images]: <ImagesContent postContentIndex={index} />,
        [ContentType.Link]: <TextContent postContentIndex={index} />,
        [ContentType.Videos]: <TextContent postContentIndex={index} />,
    }
    return <> {contentTypeToElement[contentType]} </>
}
