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
    MoreVertical,
    PenLineIcon,
    PlaySquare,
    XIcon,
} from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"
import {
    ResourcesModalRef,
    ResourcesModalRefSelectors,
} from "./ResourcesModalRef"
import { LectureModalRef, LectureModalRefSelectors } from "./LectureModalRef"
import { LectureItemContext } from ".."
import { deleteLecture } from "@services"
import { SectionItemContext } from "../.."
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../_shared"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { props: lectureItemProps } = useContext(LectureItemContext)!
    const { lecture } = lectureItemProps
    const { lectureId } = lecture

    const { swrs } = useContext(SectionItemContext)!
    const { lecturesSwr } = swrs
    const { mutate } = lecturesSwr

    const onDeletePress = async () => {
        await deleteLecture({
            data: {
                lectureId,
            },
        })
        await mutate()
    }

    const { className } = props

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()

    const lectureModalRef = useRef<LectureModalRefSelectors | null>(null)
    const onLectureModalOpen = () => lectureModalRef.current?.onOpen()

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
                        <MoreVertical size={20} strokeWidth={4 / 3} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<FolderIcon size={20} strokeWidth={4 / 3} />}
                        onPress={onResourcesModalOpen}
                        key="resources"
                    >
            Resources
                    </DropdownItem>
                    <DropdownItem
                        startContent={<PlaySquare size={20} strokeWidth={4 / 3} />}
                        onPress={onLectureModalOpen}
                        key="lecture"
                    >
            Lecture
                    </DropdownItem>
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={4 / 3} />}
                        onPress={onEditModalOpen}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={4 / 3} />}
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
                <LectureModalRef ref={lectureModalRef} />
                <EditModalRef ref={editModalRef} />
                <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    onDeletePress={onDeletePress}
                    title="Delete Lecture"
                    content="Are you sure you want to delete this lecture? All references will be lost, and you cannot undo this action."
                />
            </div>       
        </>
    )
}
