import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Tooltip,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { InfiniteCommentsScroller } from "./InfiniteCommentsScroller"
import { CreateCommentSection } from "./CreateCommentSection"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { CommentsModalProvider } from "./CommentsModalProvider"
import { PostCardContext } from "../.."
import { GiftIcon } from "lucide-react"

export const CommentsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { numberOfComments, isCompleted, isRewardable, numberOfRewardableCommentsLeft } =
    post

    return (
        <>
            <Tooltip
                isDisabled={isCompleted || !isRewardable || numberOfRewardableCommentsLeft === 0}
                content={
                    <div className='px-1 py-2'>
                        <div className='text-small font-bold text-yellow-500 flex'>
                            {" "}
                            <GiftIcon size={18} className='mr-1 ' />
              Comment now to claim your prize!
                        </div>
                        <div className='text-tiny '>
                This post still has {numberOfRewardableCommentsLeft} comments
                left to earn a reward.
                        </div>
                    </div>
                }
            >
                <Button
                    color='primary'
                    variant='light'
                    className='min-w-0 px-2.5'
                    startContent={
                        <ChatBubbleOvalLeftEllipsisIcon height={20} width={20} />
                    }
                    onPress={onOpen}
                >
                    <div className='text-sm'> {numberOfComments}</div>
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
                <CommentsModalProvider>
                    <ModalContent>
                        <ModalHeader className='p-4 pb-2 text-xl'>Comments</ModalHeader>
                        <ModalBody className='p-4 overflow-auto'>
                            <InfiniteCommentsScroller />
                        </ModalBody>
                        {!isCompleted && (
                            <ModalFooter className='p-4 pt-2'>
                                <CreateCommentSection />
                            </ModalFooter>
                        )}
                    </ModalContent>
                </CommentsModalProvider>
            </Modal>
        </>
    )
}
