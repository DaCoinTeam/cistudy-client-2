import { Skeleton } from "@nextui-org/react"
import React from "react"
import { extensions } from "../TextEditor"
import { EditorContent, useEditor } from "@tiptap/react"
import style from "./style.module.css"

interface TextRendererProps {
  className?: string;
  html?: string;
}

export const TextRenderer = (props: TextRendererProps) => {
    const { className, html } = props
    
    const editor = useEditor({
        extensions,
        editable: false,
        content: html,
        editorProps: {
            attributes: {
                class: style.prose,
            }
        }
    })

    return (
        <div className={className}>
            {html ? (
                <EditorContent editor={editor} />    
            ) : (
                <div className="flex flex-col gap-1">
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-full" />
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-[75%]" />
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-[50%]" />
                </div>
            )}
        </div>
    )
}