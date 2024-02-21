import React from "react"
import { ContentType } from "@common"
import { PostContent } from "../../useContentsEditorReducer"
import { CodeContent } from "./CodeContent"
import { ImagesContent } from "./ImagesContent"
import { TextContent } from "./TextContent"

interface ContentItemProps {
  postContent: PostContent;
}

export const ContentItem = (props: ContentItemProps) => {  
    const { postContent } = props
    const { contentType } = postContent

    const contentTypeToElement: Record<ContentType, JSX.Element> = {
        [ContentType.Text]: <TextContent postContent={postContent} />,
        [ContentType.Code]: <CodeContent postContent={postContent} />,
        [ContentType.Images]: <ImagesContent postContent={postContent} />,
        [ContentType.Link]: <CodeContent postContent={postContent} />,
        [ContentType.Videos]: <CodeContent postContent={postContent} />,
    }

    return <> {contentTypeToElement[contentType]} </>
}
