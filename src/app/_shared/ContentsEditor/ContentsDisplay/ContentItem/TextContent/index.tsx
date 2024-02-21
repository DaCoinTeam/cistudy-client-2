import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { ContentsEditorContext } from "../../../ContentsEditorProviders"
import { TrashIcon } from "@heroicons/react/24/outline"

interface TextContentProps {
  postContentIndex: number;
}

export const TextContent = (props: TextContentProps) => {
    const { state, dispatch } = useContext(ContentsEditorContext)!

    const { postContentIndex } = props
    const postContent = state.postContents[postContentIndex]

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "UPDATE_POST_CONTENT",
            payload: {
                ...postContent,
                text: event.target.value,
            },
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Link as="button" color="danger">
                <TrashIcon className="w-6 h-6" />
            </Link>
            <Textarea
                className="flex-1"
                labelPlacement="outside"
                classNames={{
                    inputWrapper: "!bg-transparent shadow-none p-0",
                }}
                minRows={1}
                value={postContent.text}
                onChange={onChange}
            />
        </div>
    )
}
