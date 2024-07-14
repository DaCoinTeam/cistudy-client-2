"use client"
import React, { useContext } from "react"
import { RootContext } from "../../../_hooks"
import { CourseEntity } from "@common"
import { COLUMNS_PER_PAGE } from "../../../_hooks"
import InfiniteScroll from "react-infinite-scroller"
import { Card, CardBody, CardFooter, CardHeader, CircularProgress, Divider, Spacer, User } from "@nextui-org/react"
import { InteractiveThumbnail, Stars } from "../../../_shared"
import { getAssetUrl, getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Grid3X3Icon, List } from "lucide-react"

interface InfiniteCoursesScrollerProps {
    className?: string
}

export const InfiniteCoursesScroller = (props: InfiniteCoursesScrollerProps) => {
    const [viewType, setViewType] = React.useState<"grid" | "list">("list")
    const { className } = props
    const { swrs } = useContext(RootContext)!
    const { coursesSwr } = swrs
    const { data, size, setSize, isValidating } = coursesSwr
    console.log("data", data)
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
        <div className={`${className}`}>
            <div className="flex flex-row justify-between">
                <div>
                    
                </div>
                <div className="flex flex-row gap-2 mb-4">
                    <List size={30} className="cursor-pointer text-primary" onClick={() => setViewType("list")} />
                    <Grid3X3Icon size={30} className="cursor-pointer text-primary" onClick={() => setViewType("grid") } />
                </div>
            </div>
            <div>
                {
                    viewType === "grid" ? (
                        <div className="grid grid-cols-3 gap-6">
                            {getCourses().map(({ courseId, title, thumbnailId, description, creator }) => (
                                <Card key={courseId} className="w-full">
                                    <InteractiveThumbnail isPressable className="h-60" src={getAssetUrl(thumbnailId)} onPress={() => router.push(`/courses/${courseId}`)}/>
                                    <CardHeader>
                                        <div className="text-lg"> {title} </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="text-sm text-foreground-400 line-clamp-2"> {description} </div>
                                    </CardBody>
                                    <CardFooter>
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
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <InfiniteScroll
                            className="flex flex-col gap-6"
                            pageStart={0}
                            initialLoad={false}
                            loadMore={onLoadMore}
                            hasMore={size < getPages() && !isValidating}
                            loader={<CircularProgress key={0} aria-label="Loading..." />}
                        >
                            {getCourses().map(({ courseId, title, thumbnailId, description, creator }) => (
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
            </div>
        </div>
    )
}