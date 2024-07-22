"use client"
import { Spacer } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { Suspense, useContext } from "react"
import { CourseFilters, InfiniteCoursesScroller } from "./_components"
import { AllCoursesContext } from "./_hooks"

const WrappedPage = () => {
    const { swrs } = useContext(AllCoursesContext)!
    const { coursesSwr } = swrs
    const { data } = coursesSwr

    const searchParams = useSearchParams()

    const getCount = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return last.metadata.count
    }

    return (
        <div>
            {/* <Breadcrumbs>
                <BreadcrumbItem startContent={<HomeModernIcon />}>Home</BreadcrumbItem>
                <BreadcrumbItem startContent={<ListIcon />}>Course</BreadcrumbItem>
            </Breadcrumbs> */}
            <div className='p-12 max-w-[1920px] w-full mx-auto grid grid-row md:grid-cols-5 lg:grid-cols-4 gap-4'>
            
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className='text-3xl '>
                        {getCount()} results for {searchParams.get("searchValue")}
                    </div>
                    <Spacer y={6} />
                    <CourseFilters className='col-span-1' />
                </div>
                <div className='col-span-3'>
                    <div className='grid grid-cols-3 gap-12'>
                        <InfiniteCoursesScroller className='col-span-3' />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

const Page = () => (
    <Suspense>
        <WrappedPage />
    </Suspense>
)
export default Page
