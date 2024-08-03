"use client"
import { useContext } from "react"
import { PostDetailContext } from "./hooks"
import { parseTimeAgo } from "@common"
import { Card, CardHeader, Chip, CardBody, CardFooter, User } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { CheckIcon, GiftIcon } from "lucide-react"
import { TextRenderer, MediaGroup } from "../../_shared"
import { Actions, CreateCommentSection, InfiniteCommentsScroller, MoreButton } from "./components"

const Page = () => {
    const { swrs } = useContext(PostDetailContext)!
    const { postSwr } = swrs
    const { data } = postSwr
    const { title,
        html,
        postMedias,
        creator,
        createdAt,
        updatedAt,
        isRewardable,
        isCompleted, } = { ...data }
    const { avatarId, username, avatarUrl, kind } = { ...creator }

    const isEdited = updatedAt !== createdAt

    return (
        <div className="flex flex-col w-1/2 self-center gap-y-2">
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
                                            <div>{parseTimeAgo(updatedAt as Date)}</div>
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
                                    startContent={<CheckIcon size={18} className='ml-1' />}
                                    variant='flat'
                                    color='success'
                                    className='mr-2'
                                >
                                    Completed
                                </Chip>
                            )}
                            {isRewardable && (
                                <Chip
                                    startContent={<GiftIcon size={18} className='ml-1' />}
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
                <CardFooter className='pt-2 inline'>
                    <Actions />
                    <InfiniteCommentsScroller />
                    <CreateCommentSection />
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page