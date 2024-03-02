import React, { createContext, useContext, useMemo, useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, XIcon } from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"
import { SectionEntity, isErrorResponse } from "@common"
import { deleteSection } from "@services"
import { ManageContext } from "../../../../../_hooks"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../_shared"

interface MoreButtonProps {
  className?: string;
  section: SectionEntity;
}

interface MoreButtonContextValue {
    props: MoreButtonProps
}

export const MoreButtonContext = createContext<MoreButtonContextValue | null>(null)

export const MoreButton = (props: MoreButtonProps) => {
    const { className, section } = props
    const { sectionId } = section

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const { functions } = useContext(ManageContext)!
    const { fetchAndSetCourseManaged } = functions

    const onDeletePress = async () => {
        const response = await deleteSection({
            data: {
                sectionId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourseManaged()
        } else {
            console.log(response)
        }
    }

    const moreButtonContextValue : MoreButtonContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <MoreButtonContext.Provider value={moreButtonContextValue}>
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
                        startContent={<PenLineIcon size={20} strokeWidth={4 / 3} />}
                        onPress={onEditModalOpen}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={4 / 3} />}
                        onPress={onConfirmDeleteModalOpen}
                        key="delete"
                        className="text-danger"
                    >
            Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <EditModalRef ref={editModalRef} />
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="Delete Section"
                content="Are you sure you want to delete this section? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
            />
        </MoreButtonContext.Provider>
    )
}
