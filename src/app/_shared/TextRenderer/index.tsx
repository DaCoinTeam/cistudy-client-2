import { Skeleton } from "@nextui-org/react"
import React, { useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import CodeBlock from "@tiptap/extension-code-block"
import Color from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import Paragraph from "@tiptap/extension-paragraph"
import TextStyle from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"
import ImageResize from "tiptap-extension-resize-image"
import Code from "@tiptap/extension-code"
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
                class: style.probe,
            }
        }
    })

    useEffect(() => {
        if (editor === null) return
        if (!html) return
        editor.commands.setContent(html)
    }, [html])

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

const extensions = [
    StarterKit,
    ImageResize.configure({
        inline: true,
    }),
    TextStyle,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    Code.configure({
        HTMLAttributes: {
            class:
      "px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-content3 text-default-foreground text-small rounded-small",
        },
    }),
    CodeBlock.configure({
        HTMLAttributes: {
            class:
      "px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-content3 text-default-foreground text-small rounded-small w-full",
        },
    }),
    Paragraph.configure({
        HTMLAttributes: {
            class: "text-sm",
        },
    }),
]
