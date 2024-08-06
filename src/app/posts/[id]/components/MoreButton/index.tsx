import { FlagIcon } from "@heroicons/react/24/outline"
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
// import { deletePost } from "@services"
import { MoreVertical, PenLineIcon,
    // XIcon 
} from "lucide-react"
import { useContext, useRef } from "react"
import {
    EditCommentModalRef,
    EditCommentModalRefSelectors,
} from "./EditPostModalRef"
import { ReportPostModalRef, ReportPostModalRefSelectors } from "./ReportPostModalRef"
// import { RootContext } from "../../../../_hooks"
import { PostDetailContext } from "../../hooks"
// import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../_shared"
// import { ToastType } from "../../../../_components"

interface MoreButtonProps {
  className?: string;
}

export const MoreButton = (props: MoreButtonProps) => {
    const { className } = props
    // const { notify } = useContext(RootContext)!

    const { swrs } = useContext(PostDetailContext)!
    const { postSwr } = swrs
    const { 
        // mutate, 
        data } = postSwr
    const {
        // postId, 
        // isRewardable, 
        isPostOwner} = {...data}

    // const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
    //     null
    // )
    const reportPostModalRef = useRef<ReportPostModalRefSelectors | null>(null)
    // const onConfirmDeleteModalOpen = () =>
    //     confirmDeleteModalRef.current?.onOpen()

    const editCommentModalRef = useRef<EditCommentModalRefSelectors | null>(null)
    const onEditCommentModalOpen = () => editCommentModalRef.current?.onOpen()

    const onReportPostModalOpen = () => reportPostModalRef.current?.onOpen()

    // const onDeletePress = async () => {
    //     await deletePost({
    //         data: {
    //             postId: postId?? "",
    //         },
    //     })
    //         .then(async () => {
    //             await mutate()
    //     notify!({
    //         type: ToastType.Success,
    //         data: {
    //             message: "Delete post successfully",
    //         },
    //     })
    //         })
    //         .catch((error) => {
    //             console.error(error.message)
    //     notify!({
    //         type: ToastType.Error,
    //         data: {
    //             error: error.message,
    //         },
    //     })
    //         })
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
                    <Button
                        as='button'
                        className={`${className}`}
                        isIconOnly
                        variant='light'
                    >
                        <MoreVertical size={20} strokeWidth={3 / 2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                    {isPostOwner ? (
                        <DropdownItem
                            startContent={<PenLineIcon size={20} strokeWidth={3 / 2} />}
                            onPress={onEditCommentModalOpen}
                            key='edit'
                        >
              Edit
                        </DropdownItem>
                    ) : (
                        <DropdownItem className='hidden'></DropdownItem>
                    )}
                    {/* {isPostOwner && !isRewardable ? (
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
                        <DropdownItem className='hidden'></DropdownItem>
                    )} */}
                    {!isPostOwner ? (
                        <DropdownItem
                            color='danger'
                            startContent={<FlagIcon className='h-5 w-5' />}
                            onPress={onReportPostModalOpen}
                            key='report'
                            className='text-danger'
                        >
              Report
                        </DropdownItem>
                    ) : (
                        <DropdownItem className='hidden'/>
                    )}
                </DropdownMenu>
            </Dropdown>
            <div className='hidden'>
                <EditCommentModalRef ref={editCommentModalRef} />
                <ReportPostModalRef ref={reportPostModalRef} />
                {/* <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    title='Delete Post'
                    content='Are you sure you want to delete this post? All references will be lost, and you cannot undo this action.'
                    onDeletePress={onDeletePress}
                /> */}
            </div>
        </>
    )
}
