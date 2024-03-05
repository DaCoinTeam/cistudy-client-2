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
import { InfiniteCommentsScroller } from "./InfiniteCommentsScroller"
import { CreateCommentSection } from "./CreateCommentSection"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { CommentsModalProviders } from "./CommentsModalProviders"

export const CommentsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Link as="button" onPress={onOpen}>
                <ChatBubbleOvalLeftEllipsisIcon height={24} width={24} />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <CommentsModalProviders>
                    <ModalContent>
                        <ModalHeader className="p-4 pb-2 text-xl  font-bold">
              Comments
                        </ModalHeader>
                        <ModalBody className="p-4 overflow-auto">
                            <InfiniteCommentsScroller />
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
