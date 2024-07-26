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
import { CheckIcon } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"

export interface ConfirmModalRefProps {
  onOKPress: () => void;
  title: string;
  content: string;
}

export interface ConfirmModalRefSelectors {
  onOpen: () => void;
}

export const ConfirmModalRef = forwardRef<
  ConfirmModalRefSelectors | null,
  ConfirmModalRefProps
>((props, ref) => {
    const { onOKPress, title, content } = props
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
                            <Button startContent={<CheckIcon size={20} strokeWidth={3/2}/>} color="primary" onPress={() => {
                                onOKPress()
                                onClose()
                            }}>
                OK
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})
