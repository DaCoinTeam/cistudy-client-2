import React, { createContext } from "react"
import { EditorContent, EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./Toolbar"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import ListItem from "@tiptap/extension-list-item"
import ImageResize from "tiptap-extension-resize-image"
import Code from "@tiptap/extension-code"
import Paragraph from "@tiptap/extension-paragraph"
import { Card, CardBody } from "@nextui-org/react"

interface TextEditorProps {
  className?: string;
  content: string;
  setContent: (content: string) => void;
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

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    )
}

export const TextEditor = (props: TextEditorProps) => {
    const { content, setContent } = props

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
          "px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-default/40 text-default-foreground text-small rounded-small",
            },
        }),
        Paragraph.configure({
            HTMLAttributes: {
                class: "text-sm mb-0",
            },
        }),
    ]

    return (
        <Card shadow="none" className="bg-content2">
            <CardBody className="p-4">
                <EditorProvider
                    extensions={extensions}
                    content={content}
                    editable={true}
                    onUpdate={({ editor }) => setContent(editor.getHTML())}
                    slotBefore={
                        <div className="mb-6">
                            <Toolbar />
                        </div>
                    }
                >
                    <WrappedTextEditor />
                </EditorProvider>
            </CardBody>
        </Card>
    )
}
