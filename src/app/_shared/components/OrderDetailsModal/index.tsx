"use client"

import React from "react"
import { OrderEntity } from "@common"
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Link, User, Spacer, Divider } from "@nextui-org/react"
import { EyeIcon } from "@heroicons/react/24/outline"
import { getAvatarUrl } from "../../../../services/server"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

interface OrderDetailsModalProps {
    order: OrderEntity
}
export const OrderDetailsModal = ({ order }: OrderDetailsModalProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const router = useRouter()
    return (
        <>
            <Link onPress={onOpen} as="button" className="w-5 h-5">
                <EyeIcon/>
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Order Details</ModalHeader>
                    <ModalBody className="p-4">
                        <div>
                            <div className="text-primary font-semibold">Buyer</div>
                            <Spacer y={2}/>
                            <User classNames={{
                                name: "text-sm line-clamp-1",
                                description: "w-[70px]"
                            }} avatarProps={{
                                src: getAvatarUrl({
                                    avatarUrl: order.account.avatarUrl,
                                    avatarId: order.account.avatarId,
                                    kind: order.account.kind
                                })
                            }} name={order.account.username}/>
                            <Spacer y={4}/>
                            <div className="text-sm text-foreground-400">
                                Created At: {dayjs(order.createdAt).format("YYYY MMM, DD HH:mm:ss")}
                            </div> 
                            <Spacer y={4}/>
                            <div className="text-primary font-semibold">Details</div>
                            <Spacer y={2}/>
                            <Divider/>
                            <Spacer y={2}/>
                            <div className="grid gap-2">
                                {
                                    order.orderCourses.map(({course, orderCourseId, discountedPrice }) => (
                                        <div className="flex items-center justify-between text-sm" key={orderCourseId}>
                                            <Link size="sm" onPress={() => router.push(`/courses/${course.courseId}`)}>
                                                {course.title}
                                            </Link>
                                            <div>{discountedPrice} STARCI</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Spacer y={2}/>
                            <Divider/>
                            <Spacer y={2}/>
                            <div className="flex flex-row-reverse text-sm font-semibold">
                                {
                                    order.orderCourses.reduce((sum, {discountedPrice}) => sum + discountedPrice, 0)
                                } STARCI
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}