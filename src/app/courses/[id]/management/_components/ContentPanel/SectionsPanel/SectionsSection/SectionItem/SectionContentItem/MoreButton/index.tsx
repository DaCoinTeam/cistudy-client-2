import React, { useContext, useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    MoreVerticalIcon,
    PenLineIcon,
    XIcon,
} from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"

import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../_shared"
import { SectionContentItemContext } from "../index"
import { ManagementContext } from "../../../../../../../_hooks"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { props: sectionContentItemProps } = useContext(SectionContentItemContext)!
    const { sectionContent } = sectionContentItemProps
    const { sectionContentId } = sectionContent

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const onDeletePress = async () => {
        // await deleteLesson({
        //     data: {
        //         lessonId,
        //     },
        // })
        await mutate()
    }

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

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
                    <Button isIconOnly variant="light">
                        <MoreVerticalIcon className="w-5 h-5 text-primary" strokeWidth={3/2}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3/2} />}
                        onPress={onEditModalOpen}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={3/2} />}
                        key="delete"
                        onPress={onConfirmDeleteModalOpen}
                        className="text-danger"
                    >
            Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className="hidden">
                <EditModalRef ref={editModalRef} />
                <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    onDeletePress={onDeletePress}
                    title="Delete Lesson"
                    content="Are you sure you want to delete this lesson? All references will be lost, and you cannot undo this action."
                />
            </div>       
        </>
    )
}
