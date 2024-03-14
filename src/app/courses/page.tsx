"use client"
import { useContext } from "react"
import { RootContext } from "../_hooks"
import { CourseFilters, InfiniteCoursesScroller } from "./_components"
import { Spacer } from "@nextui-org/react"

const Page = () => {
    const { swrs, formik } = useContext(RootContext)!
    const { coursesSwr } = swrs
    const { data } = coursesSwr
    

    const getCount = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return last.metadata.count
    }

    return (
        <div className="p-12 max-w-[100rem] mx-auto">
            <div className="text-3xl">
                {getCount()} results for {formik.values.searchValue}
            </div>    
            <Spacer y={6}/>
            <div className="grid grid-cols-4 gap-12">
                <CourseFilters className="col-span-1"/>
                <InfiniteCoursesScroller className="col-span-3" />
            </div>
        </div>
    )
}
export default Page
