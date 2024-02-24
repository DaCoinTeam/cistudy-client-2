import {
    Bold,
    Code,
    CornerDownLeft,
    Eraser,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Italic,
    List,
    ListOrdered,
    Pilcrow,
    Redo,
    RemoveFormatting,
    SquareCode,
    Strikethrough,
    TextQuote,
    Undo,
    WrapText,
} from "lucide-react"
    
import React from "react"
import { useCurrentEditor } from "@tiptap/react"
import { Button } from "@nextui-org/react"
import { ColorPicker } from "./ColorPicker"
import { MediaUploader } from "./MediaUploader"

export const Toolbar = () => {
    const { editor } = useCurrentEditor()
    if (editor === null) return null 
    
    return (
        <div className="flex gap-3">
            <Button
                onPress={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                variant={!editor.isActive("bold") ? "light" :  "flat"}
                isIconOnly
                color={editor.isActive("bold") ? "primary" : undefined}
            >
                <Bold className='w-4 h-4' />
            </Button>
            <Button
                onPress={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                variant={!editor.isActive("italic") ? "light" :  "flat"}
                isIconOnly
                color={editor.isActive("italic") ? "primary" : undefined}
            >
                <Italic className='w-4 h-4' />
            </Button>
            <Button
                onPress={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                variant={!editor.isActive("strike") ? "light" : "flat"}
                isIconOnly
                color={editor.isActive("strike") ? "primary" : undefined}
            >
                <Strikethrough className='w-4 h-4' />
            </Button>
            <Button
                onPress={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                variant={!editor.isActive("code") ? "light" :  "flat"}
                isIconOnly
                color={editor.isActive("code") ? "primary" : undefined}
            >
                <Code className='w-4 h-4' />
            </Button>
            <Button 
                onPress={() => editor.chain().focus().unsetAllMarks().run()}
                isIconOnly
                variant="light"
            >
                <Eraser className='w-4 h-4' />
            </Button>
            <Button 
                onPress={() => editor.chain().focus().clearNodes().run()}
                variant={!editor.isActive("italic") ? "light" :  "flat"}
                isIconOnly
                color={editor.isActive("italic") ? "primary" : undefined}
            >
                <RemoveFormatting className='w-4 h-4' />
            </Button>
            <ColorPicker/>
            <MediaUploader/>
        </div>
    )
}
