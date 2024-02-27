import React, { useContext, useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreHorizontal, PenIcon, TrashIcon } from "lucide-react"
import { deleteLecture } from "@services"
import { LectureItemContext } from ".."
import { SectionItemContext } from "../.."
import { isErrorResponse } from "@common"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { className } = props

    const { props: lectureItemProps } = useContext(LectureItemContext)!
    const { lecture } = lectureItemProps
    const { lectureId } = lecture

    const { functions } = useContext(SectionItemContext)!
    const { fetchAndSetLectures } = functions

    const onDeletePress = async () => {
        const response = await deleteLecture({
            data: {
                lectureId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLectures()
        } else {
            console.log(response)
        }
    }

    const editModalRef = useRef<EditModalRefSelectors | null>(null)

    const onEditModalOpen = () => editModalRef.current?.onOpen()

    return (
        <>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button className={`${className}`} isIconOnly variant="flat">
                        <MoreHorizontal size={21} strokeWidth={1.333} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PenIcon size={21} strokeWidth={1.333} />}
                        onPress={onEditModalOpen}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<TrashIcon size={21} strokeWidth={1.333} />}
                        onPress={onDeletePress}
                        key="delete"
                        className="text-danger"
                    >
            Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <EditModalRef ref={editModalRef}/>
        </>
    )
}