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
import { forwardRef, useImperativeHandle } from "react"

export interface ConfirmDeleteModalRefProps {
  onDeletePress: () => void;
  title: string;
  content: string;
  isLoading?: boolean
}

export interface ConfirmDeleteModalRefSelectors {
  onOpen: () => void;
}

export const ConfirmDeleteModalRef = forwardRef<
  ConfirmDeleteModalRefSelectors | null,
  ConfirmDeleteModalRefProps
>((props, ref) => {
    const { onDeletePress, title, content, isLoading } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="p-4 pb-2 text-2xl">{title}</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="text-sm">{content}</div>
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <Button variant="light" onPress={onClose}>
                Cancel
                            </Button>
                            <Button isLoading={isLoading} color="danger" onPress={onDeletePress}>
                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})
