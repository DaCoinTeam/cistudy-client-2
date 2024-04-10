"use client"
import React, { useContext } from "react"
import { RootContext } from "../../../_hooks"
import { CourseEntity } from "@common"
import { COLUMNS_PER_PAGE } from "../../../_hooks"
import InfiniteScroll from "react-infinite-scroller"
import { CircularProgress, Divider, Spacer, User } from "@nextui-org/react"
import { InteractiveThumbnail, Stars } from "../../../_shared"
import { getAssetUrl, getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"

interface InfiniteCoursesScrollerProps {
    className?: string
}

export const InfiniteCoursesScroller = (props: InfiniteCoursesScrollerProps) => {
    const { className } = props
    const { swrs } = useContext(RootContext)!
    const { coursesSwr } = swrs
    const { data, size, setSize, isValidating } = coursesSwr
    
    const router = useRouter()

    const onLoadMore = () => {
        setSize(size + 1)
    }

    // play anim
    if (!data) return null

    const getCourses = () => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            coursesReturn.push(...results)
        })
        return coursesReturn
    }

    const getPages = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    }

    return (
        <InfiniteScroll
            className={`${className} flex flex-col gap-6`}
            pageStart={0}
            initialLoad={false}
            loadMore={onLoadMore}
            hasMore={size < getPages() && !isValidating}
            loader={<CircularProgress key={0} aria-label="Loading..." />}
        >
            {getCourses().map(({courseId, title, thumbnailId, description, creator }) => (
                <div className="flex gap-4" key={courseId}>
                    <InteractiveThumbnail isPressable className="min-w-60 w-60 h-fit" src={getAssetUrl(thumbnailId)} onPress={() => router.push(`/courses/${courseId}`)}/>
                    <div className="flex-1">
                        <div className="text-lg"> {title} </div>
                        <div className="text-sm text-foreground-400 line-clamp-2"> {description} </div>
                        <Spacer y={4}/>
                        <div className="flex gap-4 h-10 items-center">
                            <User classNames={{
                                name: "text-base"
                            }} avatarProps={{
                                src: getAvatarUrl({
                                    avatarUrl: creator.avatarUrl,
                                    avatarId: creator.avatarId,
                                    kind: creator.kind
                                })
                            }} name={creator.username} description={"2 followers"}/>
                            <Divider orientation="vertical"/>
                            <Stars />
                        </div>
                       
                    </div>           
                </div>
            ))}
        </InfiniteScroll>
    )
}