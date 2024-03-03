"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalFooter,
    Button,
} from "@nextui-org/react"
import { ArrowLeftIcon, XIcon } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"

export interface ConfirmDeleteModalRefProps {
  onDeletePress: () => void;
  title: string;
  content: string;
}

export interface ConfirmDeleteModalRefSelectors {
  onOpen: () => void;
}

export const ConfirmDeleteModalRef = forwardRef<
  ConfirmDeleteModalRefSelectors | null,
  ConfirmDeleteModalRefProps
>((props, ref) => {
    const { onDeletePress, title, content } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="p-4 pb-2 text-xl font-bold">{title}</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="text-sm">{content}</div>
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <Button startContent={<ArrowLeftIcon size={20} strokeWidth={4/3}/>} variant="bordered" className="border" onPress={onClose}>
                Cancel
                            </Button>
                            <Button startContent={<XIcon size={20} strokeWidth={4/3}/>} color="danger" onPress={onDeletePress}>
                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})
