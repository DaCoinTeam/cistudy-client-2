import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { ContentsEditorContext } from "../../../ContentsEditorProviders"
import { MinusCircleIcon } from "@heroicons/react/24/outline"
import { Content } from "../../../useContentsEditorReducer"

interface TextContentProps {
  content: Content;
}

export const TextContent = (props: TextContentProps) => {
    const { dispatch } = useContext(ContentsEditorContext)!
    const { content } = props

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        content.text = event.target.value
        dispatch({
            type: "UPDATE_CONTENT",
            payload: content,
        })
    }

    const onDeletePress = () => {
        dispatch({
            type: "DELETE_CONTENT",
            payload: content,
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Link as="button" color="danger" onPress={onDeletePress}>
                <MinusCircleIcon className="w-6 h-6" />
            </Link>
            <Textarea
                className="flex-1"
                classNames={{
                    inputWrapper: "!bg-transparent shadow-none",
                    innerWrapper: "p-0",
                }}
                minRows={1}
                value={content.text}
                onChange={onChange}
            />
        </div>
    )
}
