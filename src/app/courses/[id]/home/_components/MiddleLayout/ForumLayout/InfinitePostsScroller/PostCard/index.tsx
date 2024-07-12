"use client"
import { PostEntity, parseTimeAgo } from "@common"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    User,
} from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { CheckIcon, GiftIcon } from "lucide-react"
import { createContext, useMemo } from "react"
import { MediaGroup, TextRenderer } from "../../../../../../../../_shared"
import { Actions } from "./Actions"
import { MoreButton } from "./MoreButton"
interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  props: PostCardProps;
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { post } = props
    const {
        title,
        html,
        postMedias,
        creator,
        createdAt,
        updatedAt,
        isRewardable,
        isCompleted,
    } = post
    const { avatarId, username, avatarUrl, kind } = creator

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({ props }),
        [props]
    )

    const isEdited = updatedAt !== createdAt

    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <Card shadow='none' className='border border-divider rounded-medium'>
                <CardHeader className='p-4 pb-2 inline'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='mr-4'>
                                <User
                                    classNames={{
                                        name: "text-base",
                                    }}
                                    name={username}
                                    description={
                                        <div className='flex gap-2 items-center'>
                                            <div>{parseTimeAgo(updatedAt)}</div>
                                            {isEdited ? <div> Edited </div> : null}
                                        </div>
                                    }
                                    avatarProps={{
                                        src: getAvatarUrl({
                                            avatarId,
                                            avatarUrl,
                                            kind,
                                        }),
                                    }}
                                />
                            </div>

                            {isCompleted && (
                                <Chip
                                    startContent={<CheckIcon size={18} className='ml-1'/>}
                                    variant='flat'
                                    color='success'
                                    className='mr-2'
                                >
                  Completed
                                </Chip>
                            )}
                            {isRewardable && (
                                <Chip
                                    startContent={<GiftIcon size={18} className='ml-1'/>}
                                    variant='flat'
                                    color='warning'
                                    className='mr-2'
                                >
                  Rewardable
                                </Chip>
                            )}
                        </div>
                        <MoreButton />
                    </div>
                </CardHeader>
                <CardBody className='p-4 gap-4'>
                    <div className='text-xl font-semibold'> {title} </div>
                    <TextRenderer html={html} />
                    <MediaGroup
                        medias={postMedias?.map(({ mediaId, mediaType, postMediaId }) => ({
                            key: postMediaId,
                            mediaId,
                            mediaType,
                        }))}
                    />
                </CardBody>
                <CardFooter className='p-4 pt-2 inline'>
                    <Actions />
                </CardFooter>
            </Card>
        </PostCardContext.Provider>
    )
}
