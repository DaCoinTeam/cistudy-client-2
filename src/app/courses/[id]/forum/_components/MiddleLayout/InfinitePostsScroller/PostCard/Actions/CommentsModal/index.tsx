import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Link,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { InfiniteCommentsScroller } from "./InfiniteCommentsScroller"
import { CreateCommentSection } from "./CreateCommentSection"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { CommentsModalProviders } from "./CommentsModalProviders"
import { PostCardContext } from "../.."

export const CommentsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { numberOfComments } = post

    return (
        <>
            <div className="flex items-center gap-1">
                <Link as="button" onPress={onOpen}>
                    <ChatBubbleOvalLeftEllipsisIcon height={24} width={24} />
                </Link>
                <div className="text-primary"> {numberOfComments} </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <CommentsModalProviders>
                    <ModalContent>
                        <ModalHeader className="p-4 pb-2 text-lg  font-bold">
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
