import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    User,
    ScrollShadow,
} from "@nextui-org/react"
import { EnrolledInfoEntity } from "@common"
import { getAvatarUrl } from "@services"
import dayjs from "dayjs"

interface EnrollmentsModalProps {
    enrollments: Array<EnrolledInfoEntity>
}

export const EnrollmentsModal = ({ enrollments }: EnrollmentsModalProps) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    return (
        <>
            <Button color="primary" onPress={onOpen}>Details</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Enrollments Details</ModalHeader>
                    <ModalBody className="p-4">
                        <ScrollShadow className="h-[300px]">
                            {
                                <div className="gap-4 grid">
                                    {
                                        enrollments.map(({ account, createdAt }) => (
                                            <div key={account.accountId} className="flex justify-between items-center">
                                                <User    
                                                    name={account.username}
                                                    avatarProps={{
                                                        src: getAvatarUrl({
                                                            avatarId: account.avatarId,
                                                            avatarUrl: account.avatarUrl,
                                                            kind: account.kind
                                                        })
                                                    }}
                                                />
                                                <div className="text-sm text-foreground-400">{dayjs(new Date(createdAt)).format("YYYY MMM, DD HH:mm:ss")}</div>
                                            </div> 
                                        ))
                                    }
                                </div> 
                            }
                        </ScrollShadow>
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button color="primary" variant="bordered" onPress={onClose}>
              Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
