import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVertical, PenLineIcon, 
    // XIcon 
} from "lucide-react"
// import { deletePostComment } from "@services"
import { useContext, useRef } from "react"
import { CommentItemContext } from ".."
import {
    EditCommentModalRef,
    EditCommentModalRefSelectors,
} from "./EditCommentModalRef"
import { FlagIcon } from "@heroicons/react/24/outline"
import { ReportPostCommentModalRef, ReportPostCommentModalRefSelectors } from "./ReportCommentModalRef"
// import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../_shared"
// import { PostDetailContext } from "../../../../hooks"

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props

    const { props: commentItemProps } = useContext(CommentItemContext)!
    const { postComment } = commentItemProps
    const { 
        // postCommentId, 
        // isRewardable, 
        isCommentOwner } = postComment

    // const { swrs } = useContext(PostDetailContext)!
    // const { postCommentsSwr } = swrs
    // const { mutate } = postCommentsSwr

    // const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
    //     null
    // )
    const reportPostCommentModalRef = useRef<ReportPostCommentModalRefSelectors | null>(null)

    // const onConfirmDeleteModalOpen = () =>
    //     confirmDeleteModalRef.current?.onOpen()

    const editCommentModalRef = useRef<EditCommentModalRefSelectors | null>(null)
    const onEditCommentModalOpen = () => editCommentModalRef.current?.onOpen()
    const onReportPostCommentModalOpen = () => reportPostCommentModalRef.current?.onOpen()
    // const onDeletePress = async () => {
    //     await deletePostComment({
    //         data: {
    //             postCommentId,
    //         },
    //     })
    //     await mutate()
    // }

    return (
        <>
            <Dropdown
                placement='top-start'
                backdrop='blur'
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button isIconOnly variant='light' className={`${className}`}>
                        <MoreVertical size={20} strokeWidth={3 / 2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                    {isCommentOwner ? (
                        <DropdownItem
                            startContent={<PenLineIcon size={20} strokeWidth={3 / 2} />}
                            onPress={onEditCommentModalOpen}
                            key='edit'
                        >
            Edit
                        </DropdownItem>
                    ): <DropdownItem className="hidden"/>}
                    
                    {/* {isCommentOwner && !isRewardable ? (
                        <DropdownItem
                            color='danger'
                            startContent={<XIcon size={20} strokeWidth={3 / 2} />}
                            onPress={onConfirmDeleteModalOpen}
                            key='delete'
                            className='text-danger'
                        >
                Delete
                        </DropdownItem>
                    ) : (
                        <DropdownItem  className='hidden'/>
                    )} */}
                    {!isCommentOwner ? (
                        <DropdownItem
                            color='danger'
                            startContent={<FlagIcon className='h-5 w-5' />}
                            onPress={onReportPostCommentModalOpen}
                            key='report'
                            className='text-danger'
                        >
           Report
                        </DropdownItem>
                    ): <DropdownItem className="hidden"/>}
                </DropdownMenu>
            </Dropdown>
            <div className='hidden'>
                <EditCommentModalRef ref={editCommentModalRef} />
                <ReportPostCommentModalRef ref={reportPostCommentModalRef}/>
                {/* <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    title='Delete Comment'
                    content='Are you sure you want to delete this comment? All references will be lost, and you cannot undo this action.'
                    onDeletePress={onDeletePress}
                /> */}
            </div>
        </>
    )
}
