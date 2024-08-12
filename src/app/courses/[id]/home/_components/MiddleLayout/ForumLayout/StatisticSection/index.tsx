import { getAvatarUrl, getCourseStatistic } from "@services"
import React, { useContext } from "react"
import useSWR from "swr"
import { HomeContext } from "../../../../_hooks"
import { Card, CardBody, Chip, Spacer, Tab, Tabs, User } from "@nextui-org/react"
import { CheckIcon, GiftIcon } from "lucide-react"
import { parseTimeAgo } from "../../../../../../../../common/utils"
import { useRouter } from "next/navigation"

export const StatisticSection = () => {
    const { swrs: { courseHomeSwr: { data: course } } } = useContext(HomeContext)!
    const { courseId } = { ...course }

    const { data } = useSWR(["STATISTIC_SWR", courseId], async () => {
        if (!courseId) return
        return getCourseStatistic({
            params: {
                courseId
            }
        },
        {
            commentPosts: {
                postId: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                isRewardable: true,
                isCompleted: true,
                isInstructor: true,
                creator: {
                    accountId: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true,
                    username: true
                }
            },
            likePosts: {
                postId: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                isRewardable: true,
                isCompleted: true,
                isInstructor: true,
                creator: {
                    accountId: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true,
                    username: true
                }
            },
            markedPosts: {
                postId: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                isRewardable: true,
                isCompleted: true,
                isInstructor: true,
                creator: {
                    accountId: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true,
                    username: true
                }
            },
            createdPosts: {
                postId: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                isRewardable: true,
                isCompleted: true,
                isInstructor: true,
                creator: {
                    accountId: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true,
                    username: true
                }
            },
            totalEarning: true,
            numberOfRewardablePostsLeft: true
        })
    })

    const router = useRouter()

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>Total Earning </div>
                        <Spacer y={2} />
                        <div className="text-4xl font-semibold text-success">  {data?.totalEarning?.toFixed(2)} STARCI </div>
                    </div>
                </div>
                <Spacer y={6} />
                <Tabs variant="underlined"
                    classNames={{
                        cursor: "w-full",
                        tabList: "p-0",
                        panel: "p-0 pt-6",
                    }}
                    aria-label="Options"
                    color="primary">
                    <Tab key="created" title="Created">
                        <div className="gap-4 grid grid-cols-2">
                            {
                                data?.createdPosts?.map((post) => (
                                    <Card onPress={() => router.push(`/posts/${post.postId}`)} isPressable key={post.postId} shadow="none" className="border border-divider">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-lg">{post.title}</div>
                                                    {post.isInstructor && (
                                                        <Chip
                                                            variant='flat'
                                                            color='primary'
                                                        >
                                                            Instructor
                                                        </Chip>
                                                    )}
                                                    {post.isCompleted && (
                                                        <Chip
                                                            startContent={<CheckIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='success'
                                                        >
                                                            Completed
                                                        </Chip>
                                                    )}
                                                    {
                                                        post.isRewardable ? <Chip
                                                            startContent={<GiftIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='warning'
                                                        >
                                                            Rewardable
                                                        </Chip> : null
                                                    }
                                                </div>

                                                <Spacer y={4} />
                                                <User
                                                    classNames={{
                                                        name: "text-base",
                                                    }}
                                                    name={post.creator.username}
                                                    description={
                                                        <div className='flex gap-2 items-center'>
                                                            <div>{parseTimeAgo(post.updatedAt)}</div>
                                                            {post.updatedAt !== post.createdAt ? <div> Edited </div> : null}
                                                        </div>
                                                    }
                                                    avatarProps={{
                                                        src: getAvatarUrl({
                                                            avatarId: post.creator.avatarId,
                                                            avatarUrl: post.creator.avatarUrl,
                                                            kind: post.creator.kind,
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </div>
                        <Spacer y={4} />
                        <div className="text-sm">Number of rewardable posts left: {data?.numberOfRewardablePostsLeft}</div>
                    </Tab>
                    <Tab key="comments" title="Commented">
                        <div className="gap-4 grid grid-cols-2">
                            {
                                data?.commentPosts?.map((post) => (
                                    <Card onPress={() => router.push(`/posts/${post.postId}`)} isPressable key={post.postId} shadow="none" className="border border-divider">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-lg">{post.title}</div>
                                                    {post.isInstructor && (
                                                        <Chip
                                                            variant='flat'
                                                            color='primary'
                                                        >
                                                            Instructor
                                                        </Chip>
                                                    )}
                                                    {post.isCompleted && (
                                                        <Chip
                                                            startContent={<CheckIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='success'
                                                        >
                                                            Completed
                                                        </Chip>
                                                    )}
                                                    {
                                                        post.isRewardable ? <Chip
                                                            startContent={<GiftIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='warning'
                                                        >
                                                            Rewardable
                                                        </Chip> : null
                                                    }
                                                </div>
                                                <Spacer y={4} />
                                                <User
                                                    classNames={{
                                                        name: "text-base",
                                                    }}
                                                    name={post.creator.username}
                                                    description={
                                                        <div className='flex gap-2 items-center'>
                                                            <div>{parseTimeAgo(post.updatedAt)}</div>
                                                            {post.updatedAt !== post.createdAt ? <div> Edited </div> : null}
                                                        </div>
                                                    }
                                                    avatarProps={{
                                                        src: getAvatarUrl({
                                                            avatarId: post.creator.avatarId,
                                                            avatarUrl: post.creator.avatarUrl,
                                                            kind: post.creator.kind,
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </div>
                    </Tab>
                    <Tab key="likes" title="Liked">
                        <div className="gap-4 grid grid-cols-2">
                            {
                                data?.likePosts?.map((post) => (
                                    <Card onPress={() => router.push(`/posts/${post.postId}`)} isPressable key={post.postId} shadow="none" className="border border-divider">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-lg">{post.title}</div>
                                                    {post.isInstructor && (
                                                        <Chip
                                                            variant='flat'
                                                            color='primary'
                                                        >
                                                            Instructor
                                                        </Chip>
                                                    )}
                                                    {post.isCompleted && (
                                                        <Chip
                                                            startContent={<CheckIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='success'
                                                        >
                                                            Completed
                                                        </Chip>
                                                    )}
                                                    {
                                                        post.isRewardable ? <Chip
                                                            startContent={<GiftIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='warning'
                                                        >
                                                            Rewardable
                                                        </Chip> : null
                                                    }
                                                </div>
                                                <Spacer y={4} />
                                                <User
                                                    classNames={{
                                                        name: "text-base",
                                                    }}
                                                    name={post.creator.username}
                                                    description={
                                                        <div className='flex gap-2 items-center'>
                                                            <div>{parseTimeAgo(post.updatedAt)}</div>
                                                            {post.updatedAt !== post.createdAt ? <div> Edited </div> : null}
                                                        </div>
                                                    }
                                                    avatarProps={{
                                                        src: getAvatarUrl({
                                                            avatarId: post.creator.avatarId,
                                                            avatarUrl: post.creator.avatarUrl,
                                                            kind: post.creator.kind,
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </div>
                    </Tab>
                    <Tab key="solution" title="Gaven solution">
                        <div className="gap-4 grid grid-cols-2">
                            {
                                data?.markedPosts?.map((post) => (
                                    <Card onPress={() => router.push(`/posts/${post.postId}`)} isPressable key={post.postId} shadow="none" className="border border-divider">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-lg">{post.title}</div>
                                                    {post.isInstructor && (
                                                        <Chip
                                                            variant='flat'
                                                            color='primary'
                                                        >
                                                            Instructor
                                                        </Chip>
                                                    )}
                                                    {post.isCompleted && (
                                                        <Chip
                                                            startContent={<CheckIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='success'
                                                        >
                                                            Completed
                                                        </Chip>
                                                    )}
                                                    {
                                                        post.isRewardable ? <Chip
                                                            startContent={<GiftIcon size={18} className="ml-1" />}
                                                            variant='flat'
                                                            color='warning'
                                                        >
                                                            Rewardable
                                                        </Chip> : null
                                                    }
                                                </div>
                                                <Spacer y={4} />
                                                <User
                                                    classNames={{
                                                        name: "text-base",
                                                    }}
                                                    name={post.creator.username}
                                                    description={
                                                        <div className='flex gap-2 items-center'>
                                                            <div>{parseTimeAgo(post.updatedAt)}</div>
                                                            {post.updatedAt !== post.createdAt ? <div> Edited </div> : null}
                                                        </div>
                                                    }
                                                    avatarProps={{
                                                        src: getAvatarUrl({
                                                            avatarId: post.creator.avatarId,
                                                            avatarUrl: post.creator.avatarUrl,
                                                            kind: post.creator.kind,
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}