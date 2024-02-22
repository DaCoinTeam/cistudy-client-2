import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { MinusCircleIcon } from "@heroicons/react/24/outline"
import { Content } from "@common"
import { CreatePostModalContext } from "../../../../CreatePostModalProviders"

interface CodeContentProps {
  content: Content;
}

export const CodeContent = (props: CodeContentProps) => {
    const { functions } = useContext(CreatePostModalContext)!
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
                classNames={{
                    inputWrapper: "!bg-default/40 shadow-none",
                    input: "font-mono",
                    innerWrapper: "p-0",
                }}
                className="flex-1"
                minRows={1}
                value={content.text}
                onChange={onChange}
            />
        </div>
    )
}
