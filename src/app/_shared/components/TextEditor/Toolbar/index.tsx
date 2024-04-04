import { RemoveFormatting } from "lucide-react"

import {
    BsCode,
    BsCodeSquare,
    BsEraser,
    BsTypeBold,
    BsTypeH1,
    BsTypeH2,
    BsTypeH3,
    BsTypeH4,
    BsTypeH5,
    BsTypeH6,
    BsTypeItalic,
    BsTypeStrikethrough,
} from "react-icons/bs"

import React from "react"
import { useCurrentEditor } from "@tiptap/react"
import { Button } from "@nextui-org/react"
import { ColorPicker } from "./ColorPicker"

interface ToolbarProps {
    className?: string
}

export const Toolbar = (props: ToolbarProps) => {
    const { editor } = useCurrentEditor()
    if (editor === null) return null

    return (
        <div className={props.className}>
            <div className="flex">
                <Button
                    onPress={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    variant={!editor.isActive("bold") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("bold") ? "primary" : undefined}
                >
                    <BsTypeBold className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    variant={!editor.isActive("italic") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("italic") ? "primary" : undefined}
                >
                    <BsTypeItalic className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    variant={!editor.isActive("strike") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("strike") ? "primary" : undefined}
                >
                    <BsTypeStrikethrough className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    variant={!editor.isActive("code") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("code") ? "primary" : undefined}
                >
                    <BsCode className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().toggleCodeBlock().run()}
                    disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                    variant={!editor.isActive("codeBlock") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("codeBlock") ? "primary" : undefined}
                >
                    <BsCodeSquare className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().unsetAllMarks().run()}
                    isIconOnly
                    variant="light"
                >
                    <BsEraser className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() => editor.chain().focus().clearNodes().run()}
                    variant={!editor.isActive("italic") ? "light" : "flat"}
                    isIconOnly
                    color={editor.isActive("italic") ? "primary" : undefined}
                >
                    <RemoveFormatting className="w-4 h-4" />
                </Button>
                <ColorPicker />
            </div>
            <div className="flex">
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 1 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 1 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH1 className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 2 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 2 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH2 className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 3 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 3 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH3 className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 4 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 4 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH4 className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 5 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 5 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH5 className="w-4 h-4" />
                </Button>
                <Button
                    onPress={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleHeading({ level: 6 }).run()
                    }
                    variant={!editor.isActive("heading", { level: 6 }) ? "light" : "flat"}
                    isIconOnly
                    color={
                        editor.isActive("heading", { level: 6 }) ? "primary" : undefined
                    }
                >
                    <BsTypeH6 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
