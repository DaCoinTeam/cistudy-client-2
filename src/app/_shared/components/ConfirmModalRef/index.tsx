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

export interface ConfirmModalRefProps {
  onOKPress: () => Promise<void>;
  title: string;
  content: string;
  isLoading?: boolean;
}

export interface ConfirmModalRefSelectors {
  onOpen: () => void;
}

export const ConfirmModalRef = forwardRef<
  ConfirmModalRefSelectors | null,
  ConfirmModalRefProps
>((props, ref) => {
    const { onOKPress, title, content, isLoading } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="p-4 pb-2">{title}</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="text-sm">{content}</div>
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <Button variant="bordered" color="primary" onPress={onClose}>
                Cancel
                            </Button>
                            <Button
                                isLoading={isLoading}
                                color="primary"
                                onPress={async () => {
                                    await onOKPress()
                                    onClose()
                                }}
                            >
                OK
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})
