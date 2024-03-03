import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Link,
} from "@nextui-org/react"
import React from "react"
import { CommentsModalProviders } from "./CommentsModalProviders"
import { CommentsBody } from "./CommentsBody"

export const CommentsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Link as="button" onPress={onOpen}>
                <ChatBubbleOvalLeftEllipsisIcon width={24} height={24} />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
                <CommentsModalProviders>
                    <ModalContent>
                        <ModalHeader className="p-4 pb-2 text-xl font-bold">
              Comments
                        </ModalHeader>
                        <ModalBody className="p-4 overflow-auto">
                            <CommentsBody />
                        </ModalBody>
                        <ModalFooter className="p-6"></ModalFooter>
                    </ModalContent>
                </CommentsModalProviders>
            </Modal>
        </>
    )
}
