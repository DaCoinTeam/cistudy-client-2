import React, { createContext } from "react"
import { EditorContent, EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./Toolbar"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import ListItem from "@tiptap/extension-list-item"
import ImageResize from "tiptap-extension-resize-image"
import Code from "@tiptap/extension-code"
import CodeBlock from "@tiptap/extension-code-block"
import Paragraph from "@tiptap/extension-paragraph"
import { Divider, Spacer } from "@nextui-org/react"

interface TextEditorProps {
  className?: string;
  html?: string;
  setHtml: (html: string) => void;
}

interface TextEditorContextValue {
  props: TextEditorProps;
}

export const TextEditorContext = createContext<TextEditorContextValue | null>(
    null
)

export const WrappedTextEditor = () => {
    const { editor } = useCurrentEditor()
    if (editor === null) return null
    return <EditorContent editor={editor} />
}

export const TextEditor = (props: TextEditorProps) => {
    const { html, setHtml } = props
    return (
        <div className="border border-divider rounded-medium p-3">
            <EditorProvider
                extensions={extensions}
                content={html}
                editable={true}
                onUpdate={({ editor }) => setHtml(editor.getHTML())}
                slotBefore={
                    <>
                        <Toolbar />
                        <Spacer y={3}/>                         
                        <Divider />
                        <Spacer y={3}/> 
                    </>             
                }
            >
                <WrappedTextEditor />
            </EditorProvider>
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
        "px-2 py-1 my-2 h-fit font-mono font-normal inline-block whitespace-nowrap bg-content3 text-default-foreground text-small rounded-small w-full",
        },
    }),
    Paragraph.configure({
        HTMLAttributes: {
            class: "text-sm",
        },
    }),
]
