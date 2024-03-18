import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, XIcon } from "lucide-react"
import { deletePost } from "@services"
import { useContext, useRef } from "react"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../_shared"
import {
    EditCommentModalRef,
    EditCommentModalRefSelectors,
} from "./EditPostModalRef"
import { ForumLayoutContext } from "../../../ForumLayoutProvider"
import { PostCardContext } from ".."

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props

    const { props: postCardProps } = useContext(PostCardContext)!
    const { post } = postCardProps
    const { postId } = post

    const { swrs } = useContext(ForumLayoutContext)!
    const { postsSwr } = swrs
    const { mutate } = postsSwr

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const editCommentModalRef = useRef<EditCommentModalRefSelectors | null>(null)
    const onEditCommentModalOpen = () => editCommentModalRef.current?.onOpen()

    const onDeletePress = async () => {
        await deletePost({
            data: {
                postId,
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
                    <Button
                        as="button"
                        className={`${className}`}
                        isIconOnly
                        variant="light"
                    >
                        <MoreVertical size={20} strokeWidth={3 / 2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3 / 2} />}
                        onPress={onEditCommentModalOpen}
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
            <div className="hidden">
                <EditCommentModalRef ref={editCommentModalRef} />
                <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    title="Delete Post"
                    content="Are you sure you want to delete this post? All references will be lost, and you cannot undo this action."
                    onDeletePress={onDeletePress}
                />
            </div>
        </>
    )
}
