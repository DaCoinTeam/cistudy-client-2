import React, { useContext, useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    FolderIcon,
    MoreVerticalIcon,
    PenLineIcon,
    PlaySquareIcon,
    XIcon,
} from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"
import {
    ResourcesModalRef,
    ResourcesModalRefSelectors,
} from "./ResourcesModalRef"
import { LessonItemContext } from ".."
import { deleteLesson } from "@services"
import { SectionItemContext } from "../.."
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../_shared"
import { LessonModalRef, LessonModalRefSelectors } from "./LessonModalRef"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { props: lessonItemProps } = useContext(LessonItemContext)!
    const { lesson } = lessonItemProps
    const { lessonId } = lesson

    const { swrs } = useContext(SectionItemContext)!
    const { lessonsSwr } = swrs
    const { mutate } = lessonsSwr

    const onDeletePress = async () => {
        await deleteLesson({
            data: {
                lessonId,
            },
        })
        await mutate()
    }

    const { className } = props

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()

    const lessonModalRef = useRef<LessonModalRefSelectors | null>(null)
    const onLessonModalOpen = () => lessonModalRef.current?.onOpen()

    const resourcesModalRef = useRef<ResourcesModalRefSelectors | null>(null)
    const onResourcesModalOpen = () => resourcesModalRef.current?.onOpen()

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
                    <Button
                        className={`${className} bg-transparent`}
                        isIconOnly
                        variant="flat"
                    >
                        <MoreVerticalIcon size={20} strokeWidth={3/2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<FolderIcon size={20} strokeWidth={3/2} />}
                        onPress={onResourcesModalOpen}
                        key="resources"
                    >
            Resources
                    </DropdownItem>
                    <DropdownItem
                        startContent={<PlaySquareIcon size={20} strokeWidth={3/2} />}
                        onPress={onLessonModalOpen}
                        key="lesson"
                    >
            Lesson
                    </DropdownItem>
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
                <ResourcesModalRef ref={resourcesModalRef} />
                <LessonModalRef ref={lessonModalRef} />
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
