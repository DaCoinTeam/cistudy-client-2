import React, { useContext, useRef } from "react"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import { MoreVerticalIcon, PenLineIcon, XIcon } from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"

import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../_shared"
import { ManagementContext } from "../../../../../../../_hooks"
import { DeleteSectionContentInput, deleteSectionContent } from "@services"
import { SectionContentItemContext } from ".."
import useSWRMutation from "swr/mutation"

export const MoreButton = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { props } = useContext(SectionContentItemContext)!

    const { trigger, isMutating } = useSWRMutation(
        "DELETE_SECTION_CONTENT",
        async (_, { arg }: { arg: DeleteSectionContentInput }) => {
            await deleteSectionContent(arg)
            await mutate()
        }
    )

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
                    <Link color="foreground">
                        <MoreVerticalIcon className="w-5 h-5" strokeWidth={3 / 2} />
                    </Link>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3 / 2} />}
                        onPress={onEditModalOpen}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={3 / 2} />}
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
                    onDeletePress={async () =>
                        await trigger({
                            data: {
                                sectionContentId: props.sectionContent.sectionContentId,
                            },
                        })
                    }
                    isLoading={isMutating}
                    title="Delete Content"
                    content="Are you sure you want to delete this content? All references will be lost, and you cannot undo this action."
                />
            </div>
        </>
    )
}
