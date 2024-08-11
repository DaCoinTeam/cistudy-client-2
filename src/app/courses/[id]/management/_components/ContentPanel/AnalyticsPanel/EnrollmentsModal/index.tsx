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
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Enrollments Details</ModalHeader>
                    <ModalBody className="p-4">
                        <ScrollShadow className="h-[300px]">
                            <Table removeWrapper aria-label="Example table with dynamic content">
                                <TableHeader>
                                    <TableColumn key="user">Learner</TableColumn>
                                    <TableColumn key="priceAtEnrolled">Price At Enrolled</TableColumn>
                                    <TableColumn key="createdAt">Enrolled At</TableColumn>
                                </TableHeader>
                                <TableBody items={enrollments}>
                                    {({ account, enrolledInfoId, createdAt, priceAtEnrolled }) => (
                                        <TableRow key={enrolledInfoId}>
                                            <TableCell><User    
                                                name={account.username}
                                                avatarProps={{
                                                    src: getAvatarUrl({
                                                        avatarId: account.avatarId,
                                                        avatarUrl: account.avatarUrl,
                                                        kind: account.kind
                                                    })
                                                }}
                                            /></TableCell>
                                            <TableCell>
                                                {priceAtEnrolled} STARCI
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(new Date(createdAt)).format("YYYY MMM, DD HH:mm:ss")}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
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
