import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import { MoreVerticalIcon, PenLineIcon, XIcon } from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"
import { SectionEntity } from "@common"
import { deleteSection } from "@services"
import { ManagementContext } from "../../../../../_hooks"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../_shared"
import { createContext, useContext, useMemo, useRef } from "react"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"

interface MoreButtonProps {
  className?: string;
  section: SectionEntity;
}

interface MoreButtonContextValue {
    props: MoreButtonProps
}

export const MoreButtonContext = createContext<MoreButtonContextValue | null>(null)

export const MoreButton = (props: MoreButtonProps) => {
    const {notify} = useContext(RootContext)!
    const { className, section } = props
    const { sectionId } = section

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()


    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const onDeletePress = async () => {
        const {message} = await deleteSection({
            data: {
                sectionId,
            },
        })
        await mutate()
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        })
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
                    <Link
                        color="foreground"
                        className={`${className}`}
                    >
                        <MoreVerticalIcon size={20} strokeWidth={3/2} />
                    </Link>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
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
