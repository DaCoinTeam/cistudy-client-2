import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useCurrentEditor } from "@tiptap/react"
import { ImageIcon } from "lucide-react"
import React from "react"
import Dropzone from "react-dropzone"

export const MediaUploader = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const { editor } = useCurrentEditor()

    if (editor === null) return null

    const onDrop = (files: Array<File>) => {
        const file = files.at(0)
        if (!file) return 
        const url = URL.createObjectURL(file)
        editor.chain().focus().setImage({ src: url }).run()
    }

    return (
        <>
            <Button
                onPress={onOpen}
                isIconOnly
                variant="light"
            >   
                <ImageIcon className="w-4 h-4"/>
            </Button>
            
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
                closeButton: "right-4 top-4"
            }}>
                <ModalContent>
                    <ModalHeader className="p-6 pb-0">Upload Media</ModalHeader>
                    <ModalBody className="p-6">
                        <Dropzone onDrop={onDrop} multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />   
                                        <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-content-center">
                                            <div className="grid place-items-center gap-1">
                                                <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                                <div className="text-sm text-foreground-500">
                      Upload image/video
                                                </div>
                                            </div>
                                        </div>                    
                                    </div>
                                </section>
                            )} 
                        </Dropzone>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}