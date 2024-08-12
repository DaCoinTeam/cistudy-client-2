"use client"
import { useContext } from "react"
import { PostDetailContext } from "./hooks"
import { parseTimeAgo } from "@common"
import { Card, CardHeader, Chip, CardBody, CardFooter, User, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { CheckIcon, GiftIcon } from "lucide-react"
import { TextRenderer, MediaGroup } from "../../_shared"
import { Actions, CreateCommentSection, InfiniteCommentsScroller, MoreButton } from "./components"
import { useRouter } from "next/navigation"

const Page = () => {
    const { swrs } = useContext(PostDetailContext)!
    const router = useRouter()
    const { postSwr } = swrs
    const { data } = postSwr
    const { title,
        html,
        postMedias,
        creator,
        createdAt,
        course,
        updatedAt,
        isRewardable,
        isCompleted, isInstructor} = { ...data }
    const { avatarId, username, avatarUrl, kind } = { ...creator }

    const isEdited = updatedAt !== createdAt

    const navigateToForum = () => {
        router.push(`/courses/${course?.courseId}/home`)
    }

    const navigateToCourseDetail = () => {
        router.push(`/courses/${course?.courseId}`)
    }

    const navigateToCourseList = () => {
        router.push("/courses")
    }

    return (
        <div className="flex flex-col gap-12 p-12">
            <Breadcrumbs>
                <BreadcrumbItem onPress={navigateToCourseList}>Courses</BreadcrumbItem>
                <BreadcrumbItem onPress={navigateToCourseDetail}>{course?.title}</BreadcrumbItem>
                <BreadcrumbItem onPress={navigateToForum} >Home</BreadcrumbItem>
                <BreadcrumbItem onPress={navigateToForum} >Forum</BreadcrumbItem>
                <BreadcrumbItem>{title}</BreadcrumbItem>
            </Breadcrumbs>
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

                                <div className="flex flex-row gap-2">
                                    {isInstructor && (
                                        <Chip
                                            variant='flat'
                                            color='primary'
                                        >
                                        Instructor
                                        </Chip>
                                    )}
                                    {isCompleted && (
                                        <Chip
                                            startContent={<CheckIcon size={18} className="ml-1" />}
                                            variant='flat'
                                            color='success'
                                        >
                                            Completed
                                        </Chip>
                                    )}
                                    {isRewardable && (
                                        <Chip
                                            startContent={<GiftIcon size={18} className="ml-1" />}
                                            variant='flat'
                                            color='warning'
                                        >
                                            Rewardable
                                        </Chip>
                                    )}
                                </div>
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
                        {!isCompleted && (
                            <CreateCommentSection />
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Page