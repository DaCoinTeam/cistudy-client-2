import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { ContentsEditorContext } from "../../../ContentsEditorProviders"
import { MinusCircleIcon } from "@heroicons/react/24/outline"
import { PostContent } from "../../../useContentsEditorReducer"

interface CodeContentProps {
  postContent: PostContent;
}

export const CodeContent = (props: CodeContentProps) => {
    const { postContent } = props
    const { dispatch } = useContext(ContentsEditorContext)!

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        postContent.text = event.target.value
        dispatch({
            type: "UPDATE_POST_CONTENT",
            payload: postContent,
        })
    }

    const onDeletePress = () => {
        dispatch({
            type: "DELETE_POST_CONTENT",
            payload: postContent,
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Link as="button" color="danger" onPress={onDeletePress}>
                <MinusCircleIcon className="w-6 h-6" />
            </Link>
            <Textarea
                classNames={{
                    inputWrapper: "!bg-content2 shadow-none",
                    input: "font-mono",
                    innerWrapper: "p-0",
                }}
                className="flex-1"
                minRows={1}
                value={postContent.text}
                onChange={onChange}
            />
        </div>
    )
}
