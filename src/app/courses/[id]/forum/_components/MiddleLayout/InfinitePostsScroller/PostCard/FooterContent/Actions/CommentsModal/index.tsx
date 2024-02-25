import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"
import React from "react"
import { CreateCommentSection } from "./CreateCommentSection"
import { CommentsBody } from "./CommentsBody"
import { CommentsModalProviders } from "./CommentsModalProviders"

export const CommentsModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>  
            <Link as="button" onPress={onOpen}>
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <CommentsModalProviders>
                    <ModalContent>
                        <ModalHeader className="p-6 pb-4">Comments</ModalHeader>
                        <ModalBody className="p-6 overflow-auto">
                            <CommentsBody/>
                        </ModalBody>
                        <ModalFooter className="p-6">
                            <CreateCommentSection />
                        </ModalFooter>
                    </ModalContent>
                </CommentsModalProviders>
            </Modal>
        </>
    )
}