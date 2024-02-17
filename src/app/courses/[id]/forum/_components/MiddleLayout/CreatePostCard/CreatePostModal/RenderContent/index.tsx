import React from "react"
import { ContentType } from "@common"
import { Code } from "@nextui-org/react"

interface RenderContentProps {
  value: string | Array<File>;
  contentType: ContentType;
}

export const RenderContent = (props: RenderContentProps) => {
    const render = () => {
        switch (props.contentType) {
        case ContentType.Text:
            return (
                <div className="whitespace-pre-line"> {props.value as string} </div>
            )
        case ContentType.Code:
            return (
                <Code className="whitespace-break-spaces">
                    {props.value as string}
                </Code>
            )
        }
    }
    return <> {render()} </>
}
