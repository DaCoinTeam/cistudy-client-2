import { Button, Tooltip } from "@nextui-org/react"
import { markPostCommentAsSolution } from "@services"
import { CheckIcon } from "lucide-react"
import { useContext, useRef } from "react"
import { ErrorResponse } from "@common"
import { RootContext } from "../../../../../../_hooks"
import { ConfirmModalRef, ConfirmModalRefSelectors } from "../../../../../../_shared"
import { ToastType } from "../../../../../../_components"
import { PostDetailContext } from "../../../../hooks"

interface RewardButtonProps {
  postCommentId: string;
}

export const MarkAsSolutionButton = ({
    postCommentId}: RewardButtonProps) => {
    const { notify } = useContext(RootContext)!

    const {swrs} = useContext(PostDetailContext)!
    const {postSwr, postCommentsSwr} = swrs
    const {mutate: postMutate} = postSwr
    const {mutate: postCommentMutate} = postCommentsSwr

    const confirmModalRef = useRef<ConfirmModalRefSelectors | null>(null)
    const onConfirmModalOpen = () => confirmModalRef.current?.onOpen()

    const onOKPress = async () => {
        try {
            await markPostCommentAsSolution({
                data: {
                    postCommentId,
                },
            })
            notify!({
                type: ToastType.Success,
                data: {
                    message: "Comment has been marked as a solution and no more comments are allowed to this post"
                },
            })
        } catch (ex) {
            const { message} = ex as ErrorResponse
            notify!({
                type: ToastType.Error,
                data: {
                    error: message as string,
                },
            })
        }
     
        await postCommentMutate()
        await postMutate()
    
            
    }
    return (
        <>
            <Tooltip content='Mark this comment as solution' className='text-xs'>
                <Button
                    isIconOnly
                    aria-label='Like'
                    variant='light'
                    color='primary'
                    className='px-2.5 min-w-0 transition-opacity opacity-0 group-hover/comment:opacity-100'
                    onPress={onConfirmModalOpen}
                >
                    <CheckIcon />
                </Button>
            </Tooltip>

            <ConfirmModalRef
                ref={confirmModalRef}
                title='Rewarding comment and mark comment is completed'
                content='Are you sure you want to award this comment and mark the end of commenting and liking on this post ? You cannot undo this action.'
                onOKPress={onOKPress}
            />
        </>
    )
}
