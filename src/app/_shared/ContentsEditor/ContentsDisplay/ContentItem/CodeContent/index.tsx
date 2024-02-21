import React, { useContext } from "react"
import { Link, Textarea } from "@nextui-org/react"
import { ContentsEditorContext } from "../../../ContentsEditorProviders"
import { MinusIcon } from "@heroicons/react/24/outline"

interface CodeContentProps {
  postContentIndex: number;
}

export const CodeContent = (props: CodeContentProps) => {
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
                <MinusIcon className="w-6 h-6"/>
            </Link>
            <Textarea
                classNames={{
                    inputWrapper: "!bg-content2 shadow-none px-2 py-1",
                    input: "font-mono",
                }}
                className="flex-1"
                minRows={1}
                value={postContent.text}
                onChange={onChange}
            />
        </div>
        
    )
}
