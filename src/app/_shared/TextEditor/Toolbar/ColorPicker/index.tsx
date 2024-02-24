import { Button } from "@nextui-org/react"
import { useCurrentEditor } from "@tiptap/react"
import React, { useRef } from "react"

import { BsPaintBucket } from "react-icons/bs"
    
export const ColorPicker = () => {
    const { editor } = useCurrentEditor()
    const ref = useRef<HTMLInputElement | null>(null)
    
    if (editor === null) return null

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        editor.chain().focus().setColor(event.target.value).run()

    const onPress = () => {
        if (ref.current === null) return
        ref.current.click()
    }

    return (
        <div>
            <Button
                onPress={onPress}
                isIconOnly
                variant="light"
            >   
                <div className="relative w-full h-full grid place-content-center">
                    <BsPaintBucket className="w-4 h-4"/>
                    <div className="w-5 h-1 absolute bottom-1.5 left-2.5" style={{backgroundColor: ref.current?.value}}/>
                </div>
               
            </Button>
            <input
                ref={ref}
                className="hidden"
                type="color"
                value={editor.getAttributes("textStyle").color}
                onChange={onChange}
            />
        </div>
    )
}
