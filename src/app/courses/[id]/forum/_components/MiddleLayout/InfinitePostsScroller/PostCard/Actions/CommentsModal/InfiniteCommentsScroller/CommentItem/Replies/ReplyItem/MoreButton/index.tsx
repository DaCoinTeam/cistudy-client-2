import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, XIcon } from "lucide-react"
import { deletePostCommentReply } from "@services"
import { useContext, useRef } from "react"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../../../../../_shared"
import { ReplyItemContext } from ".."
import { RepliesContext } from "../../RepliesProviders"

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props

    const { props: replyItemProps, reducer } = useContext(ReplyItemContext)!
    const { postCommentReply } = replyItemProps
    const { postCommentReplyId } = postCommentReply
    const [, dispatch ] = reducer

    const { swrs } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { mutate } = postCommentRepliesSwr

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const onEditPress = () => {
        dispatch({
            type: "SET_IS_EDITED",
            payload: true
        })
    }

    const onDeletePress = async () => {
        await deletePostCommentReply({
            data: {
                postCommentReplyId,
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
                title="Delete Reply"
                content="Are you sure you want to delete this reply?"
                onDeletePress={onDeletePress}
            />
        </>
    )
}
