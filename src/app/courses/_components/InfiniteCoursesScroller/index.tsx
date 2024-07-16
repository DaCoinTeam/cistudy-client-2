"use client"
import { CourseEntity } from "@common"
import { CircularProgress, Divider, Pagination, Spacer, Tab, Tabs, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { Grid3X3Icon, List } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"
import InfiniteScroll from "react-infinite-scroller"
import { CourseCard } from "../../../_components/Courses/CourseCard"
import { InteractiveThumbnail, Stars } from "../../../_shared"
import { AllCoursesContext, COLUMNS_PER_PAGE } from "../../_hooks"

interface InfiniteCoursesScrollerProps {
    className?: string
}

export const InfiniteCoursesScroller = (props: InfiniteCoursesScrollerProps) => {
    const [viewType, setViewType] = React.useState<React.Key>("grid")
    
    const { className } = props
    const { swrs } = useContext(AllCoursesContext)!
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
                {/* <div className="flex flex-row gap-2 mb-4">
                    <Grid3X3Icon size={30} className="cursor-pointer text-primary" onClick={() => setViewType("grid") } />
                    <List size={30} className="cursor-pointer text-primary" onClick={() => setViewType("list")} />
                </div> */}
            </div>
            <div>
                <Tabs
                    size="md"
                    aria-label="Tabs"
                    selectedKey={viewType.toString()}
                    onSelectionChange={setViewType}
                >
                    <Tab key="grid"  
                        title={
                            <div className="flex items-center space-x-2">
                                <Grid3X3Icon size={20} className="cursor-pointer text-primary" onClick={() => setViewType("grid") } />
                                <span>Grid</span>
                            </div>
                        }>
                        <div>
                            <div className="grid grid-cols-3 gap-6">
                                {getCourses().map((course)  => (
                                    <div key={course.courseId} onClick={() => router.push(`/courses/${course.courseId}`)}>
                                        <CourseCard {...course}/>

                                    </div>
                                ))}


                            </div>
                            <div className="mt-12">
                                <Pagination total={10} initialPage={size} color="secondary" />
                            </div>

                        </div>
                    </Tab>
                    <Tab key="list" title={
                        <div className="flex items-center space-x-2">
                            <List size={20} className="cursor-pointer text-primary" onClick={() => setViewType("list")} />
                            <span>List</span>
                        </div>
                    }>
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
                    </Tab>

                </Tabs>
                
                {/* {
                    viewType === "grid" ? (
                        <div>
                            <div className="grid grid-cols-3 gap-6">
                                {getCourses().map((course)  => (
                                    <div key={course.courseId}>
                                        <CourseCard {...course}/>

                                    </div>
                                ))}


                            </div>
                            <div className="mt-12">
                                <Pagination total={10} initialPage={size} color="secondary" />
                            </div>

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
                } */}
            </div>
        </div>
    )
}