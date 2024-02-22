import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { CreateCommentModalContext } from "../../../../CreateCommentModalProviders"
import { MinusCircleIcon } from "@heroicons/react/24/outline"
import { Content } from "@common"

interface TextContentProps {
  content: Content;
}

export const TextContent = (props: TextContentProps) => {
    const { functions } = useContext(CreateCommentModalContext)!
    const { updateContent, deleteContent } = functions
    const { content } = props

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        content.text = event.target.value
        updateContent(content)
    }

    const onDeletePress = () => {
        deleteContent(content.key)
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
