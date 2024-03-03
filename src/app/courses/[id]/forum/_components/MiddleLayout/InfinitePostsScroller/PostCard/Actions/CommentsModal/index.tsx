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
import { CreateCommentSection } from "./CreateCommentSection"
import { MessageSquareMore } from "lucide-react"

export const CommentsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Link as="button" onPress={onOpen}>
                <MessageSquareMore size={24} strokeWidth={4/3} />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <CommentsModalProviders>
                    <ModalContent>
                        <ModalHeader className="p-4 pb-2 text-xl leading-none font-bold">
              Comments
                        </ModalHeader>
                        <ModalBody className="p-4 overflow-auto">
                            <CommentsBody />
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <CreateCommentSection />
                        </ModalFooter>
                    </ModalContent>
                </CommentsModalProviders>
            </Modal>
        </>
    )
}
