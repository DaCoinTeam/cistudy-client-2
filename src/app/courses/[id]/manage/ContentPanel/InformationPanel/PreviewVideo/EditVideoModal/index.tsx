import { VideoCameraIcon } from "@heroicons/react/24/solid"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

export const EditVideoModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const onDrop = useCallback( (files: Array<File>) => {
        // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
            <Button
                onPress={onOpen}
                startContent={<VideoCameraIcon className="w-6 h-6" />}
                color="primary"
            >
        Edit video
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-6 pb-4">Edit Video</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="container">
                                    <div {...getRootProps({className: "dropzone"})}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                  Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
