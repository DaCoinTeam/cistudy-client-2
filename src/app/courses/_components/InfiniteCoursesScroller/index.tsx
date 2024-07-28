"use client"
import { CourseEntity } from "@common"
import {
    CircularProgress,
    Pagination,
    Spacer,
    Tab,
    Tabs
} from "@nextui-org/react"
import { Grid3X3Icon, List } from "lucide-react"
import { useContext, useMemo, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import {
    CardListHorizontalSkeleton,
    CourseCardHorizontal
} from "../../../_shared"
import { CourseCard } from "../../../_shared/components/CourseCard"
import {
    AllCoursesContext,
    COLUMNS_PER_PAGE
} from "../../_hooks"

interface InfiniteCoursesScrollerProps {
  className?: string;
}

export const InfiniteCoursesScroller = (
    props: InfiniteCoursesScrollerProps
) => {
    const [viewType, setViewType] = useState<"grid" | "list">("grid")
    const { className } = props
    const { swrs } = useContext(AllCoursesContext)!
    const { coursesSwr } = swrs
    const { data, size, setSize, isValidating, isLoading } = coursesSwr

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

    const getCoursesByPage = useMemo(() => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        const results = data[size - 1]?.results
        if (results) coursesReturn.push(...results)
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
                    size='md'
                    aria-label='Tabs'
                    selectedKey={viewType.toString()}
                    onSelectionChange={() => {
                        setViewType(viewType === "grid" ? "list" : "grid")
                    }}
                    className='mb-2'
                    variant='underlined'
                >
                    <Tab
                        key='grid'
                        title={
                            <div className='flex items-center space-x-2'>
                                <Grid3X3Icon
                                    size={20}
                                    className='cursor-pointer text-primary'
                                    onClick={() => {
                                        setViewType("grid")
                                    }}
                                />
                                <span>Grid</span>
                            </div>
                        }
                    >
                        <div>
                            {/* {isLoading ? (
                                <CardListSkeleton />
                            ) : ( */}
                            <div className='grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6'>
                                {getCoursesByPage.map((course) => (
                                    <div key={course.courseId}>
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                            </div>
                            {/* )} */}
                            {getCoursesByPage.length == 0 && !isLoading ? (
                                <div>
                                    <div className='text-2xl text-primary font-semibold mb-4'>
                                        Sorry we could not find any courses
                                    </div>
                                    <div className='text-lg font-medium'>
                    Try adjusting your search. Here are some ideas:
                                    </div>
                                    <Spacer y={2}/>

                                    <div className='flex flex-col'>
                                        <div> &#x2022; Make sure all words are spelled correctly</div>
                                        <Spacer y={2}/>

                                        <div>&#x2022; Try different search terms</div>
                                        <Spacer y={2}/>

                                        <div> &#x2022; Try more general search terms</div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className='mt-16'>
                                {getPages ? (
                                    <Pagination
                                        initialPage={1}
                                        total={getPages}
                                        onChange={onLoadPage}
                                        color='primary'
                                    />
                                ) : null}
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key='list'
                        title={
                            <div className='flex items-center space-x-2'>
                                <List
                                    size={20}
                                    className='cursor-pointer text-primary'
                                    onClick={() => {
                                        setViewType("list")
                                    }}
                                />
                                <span>List</span>
                            </div>
                        }
                    >
                        <InfiniteScroll
                            className='flex flex-col gap-6'
                            pageStart={0}
                            initialLoad={false}
                            loadMore={onLoadMore}
                            hasMore={size < getPages && !isValidating}
                            loader={<CircularProgress key={0} aria-label='Loading...' />}
                        >
                            {isLoading ? (
                                <CardListHorizontalSkeleton />
                            ) : (
                                getCourses.map((course) => (
                                    <CourseCardHorizontal key={course.courseId} {...course} />
                                ))
                            )}
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
