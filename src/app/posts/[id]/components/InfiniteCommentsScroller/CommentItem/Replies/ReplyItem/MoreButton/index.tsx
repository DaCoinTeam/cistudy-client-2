import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, XIcon } from "lucide-react"
import { deletePostCommentReply } from "@services"
import { useContext, useRef } from "react"
// import {
//     ConfirmDeleteModalRef,
//     ConfirmDeleteModalRefSelectors,
// } from "../../../../../../../../../../../../../../../_shared"
import { ReplyItemContext } from ".."
import { RepliesContext } from "../../RepliesProvider"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../../../_shared"

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props

    const { props: replyItemProps } = useContext(ReplyItemContext)!
    const { postCommentReply } = replyItemProps
    const { postCommentReplyId } = postCommentReply

    const { reducer } = useContext(RepliesContext)!
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
            type: "SET_EDITED_POST_COMMENT_REPLY_ID",
            payload: postCommentReplyId
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
                    <Button isIconOnly variant="light" className={`${className}`}>
                        <MoreVertical size={20} strokeWidth={3 / 2} />
                    </Button>
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
