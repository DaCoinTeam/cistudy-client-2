import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"
import React from "react"
import { CreateComment } from "./CreateComment"

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
                        <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                    </ModalBody>
                    <ModalFooter className="p-6">
                        <CreateComment />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}