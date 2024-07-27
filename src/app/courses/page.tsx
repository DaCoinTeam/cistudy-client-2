"use client"
import { Spacer } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { Suspense, useContext } from "react"
import { CourseFilters, InfiniteCoursesScroller } from "./_components"
import { AllCoursesContext } from "./_hooks"
import { RootContext } from "../_hooks"
import { CoursesSkeleton } from "./_components/CoursesSkeleton"

const WrappedPage = () => {
    const { swrs } = useContext(AllCoursesContext)!
    const { coursesSwr } = swrs
    const { data, isLoading } = coursesSwr
    const {reducer: rootReducer} = useContext(RootContext)!
    const [state] = rootReducer
    const {categoryFilter} = state
    const searchParams = useSearchParams()
    const searchValue = searchParams.get("searchValue")
    const getCount = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return last.metadata.count
    }

    return (
        <div >
            {isLoading ? (
                <CoursesSkeleton/>
            ) : (
                <div className="p-12 pt-6 max-w-[1920px] w-full mx-auto">
                    <div className='text-2xl flex mb-6'>
                        <div className="flex flex-col">
                            <span className="mr-2"> 
                                {getCount()} {getCount() > 1 ? "results" : "result"} {searchValue && `for "${searchValue}" `}
                                {categoryFilter.length != 0 && (
                                    <span>
                                        <span className="mr-2">of</span>
                                        {categoryFilter.map((category, index) => (
                                            <span className="font-medium" key={category.categoryId}>
                                                {category.name}
                                                {index < categoryFilter.length - 1 && ", "}
                                            </span>
                                        ))}
                                        <span className="ms-2">courses</span>
                                    </span>
                                )}
                    
                            </span>
                        </div>
               
                    </div>
                    <div className=' grid grid-row md:grid-cols-5 lg:grid-cols-4 gap-4'>
            
                        <div className="md:col-span-2 lg:col-span-1" >
                            <Spacer y={2} />
                            <CourseFilters className='col-span-1' />
                        </div>
                        <div className='col-span-3'>
                            <div className='grid grid-cols-3 gap-12'>
                                <InfiniteCoursesScroller className='col-span-3' />
                            </div>
                        </div>
                    </div>
                </div>

            )}
            {/* <Breadcrumbs>
                <BreadcrumbItem startContent={<HomeModernIcon />}>Home</BreadcrumbItem>
                <BreadcrumbItem startContent={<ListIcon />}>Course</BreadcrumbItem>
            </Breadcrumbs> */}
           
        </div>
        
    )
}

const Page = () => (
    <Suspense>
        <WrappedPage />
    </Suspense>
)
export default Page
