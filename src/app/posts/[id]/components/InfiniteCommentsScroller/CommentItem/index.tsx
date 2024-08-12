import { PostCommentEntity, parseTimeAgo } from "@common"
import { Avatar, Chip, Spacer, useDisclosure } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { CheckIcon, 
    // GiftIcon, 
    PencilIcon } from "lucide-react"
import { createContext, useContext, useMemo } from "react"
import { Actions } from "./Actions"
import { MoreButton } from "./MoreButton"
import { Replies } from "./Replies"
import { MarkAsSolutionButton } from "./MarkSolutionButton"
import { RootContext } from "../../../../../_hooks"
import { PostDetailContext } from "../../../hooks"
import { MediaGroup, TextRenderer } from "../../../../../_shared"
interface CommentItemProps {
  postComment: PostCommentEntity;
}

interface CommentItemContextValue {
  props: CommentItemProps;
  disclosures: {
    commentDisclosure: {
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
      onOpenChange: () => void;
    };
  };
}

export const CommentItemContext = createContext<CommentItemContextValue | null>(
    null
)

export const CommentItem = (props: CommentItemProps) => {
    const { postComment } = props
    const {
        html,
        postCommentMedias,
        creator,
        createdAt,
        updatedAt,
        postCommentId,
        isSolution,
    } = postComment
    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profileData } = { ...profileSwr }
    const { accountId: profileAccountId } = { ...profileData }

    const { swrs: postDetailSwrs } = useContext(PostDetailContext)!
    const {postSwr} = postDetailSwrs
    const {data: postCommentData} = postSwr
    const { creator: postCreator } = {...postCommentData}
    const {
        avatarId,
        username,
        avatarUrl,
        kind,
        accountId: commentCreatorAccountId,
    } = creator
    const commentDisclosure = useDisclosure()
    const commentItemContextValue: CommentItemContextValue = useMemo(
        () => ({
            props,
            disclosures: {
                commentDisclosure,
            },
        }),
        [props, commentDisclosure]
    )

    const isEdited = createdAt !== updatedAt

    return (
        <CommentItemContext.Provider value={commentItemContextValue}>
            <div className={"flex group/comment rounded-xl p-2"}>
                <Avatar
                    src={getAvatarUrl({
                        avatarId,
                        avatarUrl,
                        kind,
                    })}
                />
                <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='mr-4'>
                                <div className='font-semibold px-2'>{username}</div>

                                <div className='text-xs text-foreground-400 flex gap-2 items-center px-2'>
                                    <div>{parseTimeAgo(updatedAt)}</div>
                                    {isEdited ? <div>Edited</div> : null}
                                </div>
                            </div>
                            {postCreator?.accountId === commentCreatorAccountId && (
                                <Chip
                                    startContent={<PencilIcon size={18} className='ml-1' />}
                                    variant='flat'
                                    color='primary'
                                    className='mr-2'
                                >
                  Author
                                </Chip>
                            )}
                            {/* {isRewardable && (
                                <Chip
                                    startContent={<GiftIcon size={18} className='ml-1' />}
                                    variant='flat'
                                    color='warning'
                                    className='mr-2'
                                >
                  Rewardable
                                </Chip>
                            )} */}
                            {isSolution && (
                                <Chip
                                    startContent={<CheckIcon size={18} className='ml-1' />}
                                    variant='flat'
                                    color='success'
                                    className='mr-2'
                                >
                  Solution
                                </Chip>
                            )}
                        </div>

                        <div className='items-center flex'>
                            <div className='mr-4'>
                                {!isSolution && (
                                    <>
                                        {postCreator?.accountId === profileAccountId && (
                                            <MarkAsSolutionButton postCommentId={postCommentId} />
                                        )}
                                    </>
                                )}
                            </div>
                            <MoreButton className='transition-opacity opacity-0 group-hover/comment:opacity-100' />
                            
                        </div>
                    </div>
                    <Spacer y={2} />
                    <div className='bg-content2 rounded-medium p-2.5'>
                        <TextRenderer html={html} />
                        <MediaGroup
                            className='mt-4'
                            medias={postCommentMedias?.map(
                                ({ postCommentMediaId, mediaId, mediaType }) => ({
                                    key: postCommentMediaId,
                                    mediaId,
                                    mediaType,
                                })
                            )}
                        />
                    </div>
                    <Spacer y={1} />
                    <Actions />
                    <Replies className='mt-3' />
                </div>
            </div>
        </CommentItemContext.Provider>
    )
}
