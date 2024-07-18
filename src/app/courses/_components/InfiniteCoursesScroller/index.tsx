"use client"
import { CourseEntity } from "@common"
import { CircularProgress, Divider, Pagination, Spacer, Tab, Tabs, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { Grid3X3Icon, List } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroller"
import { CourseCard } from "../../../_components/Courses/CourseCard"
import { CardListHorizontalSkeleton, CardListSkeleton, InteractiveThumbnail, Stars } from "../../../_shared"
import { AllCoursesContext, COLUMNS_PER_PAGE, useAllCoursesReducer } from "../../_hooks"

interface InfiniteCoursesScrollerProps {
    className?: string
}

export const InfiniteCoursesScroller = (props: InfiniteCoursesScrollerProps) => {
    const reducer = useAllCoursesReducer()

    const [state, dispatch] = reducer
    const { viewType } = state

    const { className } = props
    const { swrs } = useContext(AllCoursesContext)!
    const { coursesSwr } = swrs
    const { data, size, setSize, isValidating, isLoading } = coursesSwr
    const router = useRouter()
    const onLoadMore = () => {
        setSize(size + 1)
    }
    const onLoadPage = (page: number) => {
        setSize(page)
    }

    const getCourses = useMemo(() => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            coursesReturn.push(...results)
        })
        return coursesReturn
        
    }, [data])
    
    const getCoursesPage = useMemo(() => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        const results = data[size - 1]?.results
        if(results) coursesReturn.push(...results)
        return coursesReturn
    }, [data])

    const getPages = useMemo(() => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    }, [data]) 

    return (
        <div className={`${className}`}>

            <div>
                <Tabs
                    size="md"
                    aria-label="Tabs"
                    selectedKey={viewType.toString()}
                    onSelectionChange={() => {
                        dispatch({
                            type: "SET_VIEW_TYPE",
                            payload: viewType === "grid" ? "list" : "grid"
                        })
                    }}
                    className="mb-2"
                    variant="underlined"
                >
                    <Tab key="grid"  
                        title={
                            <div className="flex items-center space-x-2">
                                <Grid3X3Icon size={20} className="cursor-pointer text-primary" onClick={() => {
                                    dispatch({
                                        type: "SET_VIEW_TYPE",
                                        payload: "grid" 
                                    })
                                }} />
                                <span>Grid</span>
                            </div>
                        }>
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6">
                                {isLoading ? <CardListSkeleton/> : (
                                    getCoursesPage.map((course)  => (
                                        <div key={course.courseId}  >
                                            <CourseCard {...course}/>
                                        </div>
                                    ))
                                )}

                            </div>
                            <div className="mt-16">
                                {getPages ? <Pagination initialPage={1} total={getPages}  onChange={onLoadPage} color="secondary" /> : null
                                }
                            </div>

                        </div>
                    </Tab>
                    <Tab key="list" title={
                        <div className="flex items-center space-x-2">
                            <List size={20} className="cursor-pointer text-primary" onClick={() => {
                                dispatch({
                                    type: "SET_VIEW_TYPE",
                                    payload: "list" 
                                })
                            }} />
                            <span>List</span>
                        </div>
                    }>
                        <InfiniteScroll
                            className="flex flex-col gap-6"
                            pageStart={0}
                            initialLoad={false}
                            loadMore={onLoadMore}
                            hasMore={size < getPages && !isValidating}
                            loader={<CircularProgress key={0} aria-label="Loading..." />}
                        >
                            {isLoading ? <CardListHorizontalSkeleton/> : (
                                getCourses.map(({ courseId, title, thumbnailId, description, creator }) => (
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
                                )))}
                        </InfiniteScroll>
                    </Tab>

                </Tabs>
                {/* <div>
                    <Button className={`${className} bg-content2`} isIconOnly>
                        <MoreHorizontal size={20} strokeWidth={3/2} />
                    </Button>
                    <Button className={`${className} bg-content2`} isIconOnly>
                        <Filter size={20} strokeWidth={3/2} />
                    </Button>
                </div> */}
                
            
            </div>
        </div>
    )
}