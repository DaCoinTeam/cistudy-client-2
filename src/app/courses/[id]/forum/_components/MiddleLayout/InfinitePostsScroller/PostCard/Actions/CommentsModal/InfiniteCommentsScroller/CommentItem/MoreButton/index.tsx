import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, XIcon } from "lucide-react"
import { deletePostComment } from "@services"
import { useContext, useRef } from "react"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../../../_shared"
import { CommentItemContext } from ".."
import { CommentsModalContext } from "../../../CommentsModalProviders"

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props

    const { props: commentItemProps } = useContext(CommentItemContext)!
    const { postComment } = commentItemProps
    const { postCommentId } = postComment

    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { mutate } = postCommentsSwr

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const onEditPress = () => {
    }

    const onDeletePress = async () => {
        await deletePostComment({
            data: {
                postCommentId,
            },
        })
        await mutate()
    }

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
                    <Link
                        as="button"
                        className={`${className} bg-transparent`}
                    >
                        <MoreVertical size={20} strokeWidth={3 / 2} />
                    </Link>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3 / 2} />}
                        onPress={onEditPress}
                        key="edit"
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={3 / 2} />}
                        onPress={onConfirmDeleteModalOpen}
                        key="delete"
                        className="text-danger"
                    >
            Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="Delete Comment"
                content="Are you sure you want to delete this comment? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
            />
        </>
    )
}
