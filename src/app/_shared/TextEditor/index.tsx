import React, { createContext, useEffect } from "react"
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

interface TextEditorProps {
  className?: string;
  html: string;
  setHtml: (html: string) => void;
}

interface TextEditorContextValue {
  props: TextEditorProps;
}

export const TextEditorContext = createContext<TextEditorContextValue | null>(
    null
)

export const WrappedTextEditor = (props: TextEditorProps) => {
    const { html } = props
    const { editor } = useCurrentEditor()

    useEffect(() => {
        editor?.commands.setContent(html)
    }, [html])

    if (editor === null) return null

    return <EditorContent editor={editor} />
}

export const TextEditor = (props: TextEditorProps) => {
    const { html, setHtml } = props
    return (
        <div className="bg-content2 p-3 rounded-large">
            <EditorProvider
                extensions={extensions}
                content={html}
                editable={true}
                onUpdate={({ editor }) => setHtml(editor.getHTML())}
                slotBefore={<Toolbar className="mb-3" />}
            >
                <WrappedTextEditor {...props} />
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
        "px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-default/40 text-default-foreground text-small rounded-small",
        },
    }),
    CodeBlock.configure({
        HTMLAttributes: {
            class:
        "px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-default/40 text-default-foreground text-small rounded-small w-full",
        },
    }),
    Paragraph.configure({
        HTMLAttributes: {
            class: "text-sm",
        },
    }),
]
