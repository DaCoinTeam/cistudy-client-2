import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"
import React from "react"
import { CreateCommentSection } from "./CreateCommentSection"
import { CommentsBody } from "./CommentsBody"

export const CommentsModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>  
            <Link as="button" onPress={onOpen}>
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
                <ModalContent>
                    <ModalHeader className="p-6">Comments</ModalHeader>
                    <ModalBody>
                        <CommentsBody/>
                    </ModalBody>
                    <ModalFooter className="p-6">
                        <CreateCommentSection />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}