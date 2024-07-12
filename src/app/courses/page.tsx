"use client"
import { Suspense, useContext } from "react"
import { RootContext } from "../_hooks"
import { CourseFilters, InfiniteCoursesScroller } from "./_components"
import { Spacer } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"

const WrappedPage = () => {
    const { swrs } = useContext(RootContext)!
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
        <div className='p-12 max-w-[1920px] w-full mx-auto'>
            <div className='text-3xl'>
                {getCount()} results for {searchParams.get("searchValue")}
            </div>
            <Spacer y={6} />
            <div className='grid grid-cols-4 gap-12'>
                <CourseFilters className='col-span-1' />
                <InfiniteCoursesScroller className='col-span-3' />
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
