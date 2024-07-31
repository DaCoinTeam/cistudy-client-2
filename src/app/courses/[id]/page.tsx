"use client"
import React, { useContext } from "react"
import { Spacer } from "@nextui-org/react"
import { CourseBanner, CourseMain, CourseFloat, CourseSkeleton, ReplaceCourseFloat } from "./_components"
import { CourseDetailsContext } from "./_hooks"

const Page = () => {
    const {swrs} = useContext(CourseDetailsContext)!
    const {courseSwr} = swrs
    const { isLoading} = courseSwr
    return (
        <div className="h-fit w-full pb-12 max-w-[1920px]">
            {!courseSwr.data || isLoading  ? <CourseSkeleton /> : 
                <div className="relative w-full">
                    <div className="fixed h-[100%] w-1/4 top-[7rem] right-12 z-30 hidden lg:block">
                        <CourseFloat/>
                    </div> 
                    <CourseBanner/>
                    <div className="lg:hidden">
                        <Spacer y={12}/>
                        <ReplaceCourseFloat/>
                    </div>
                    <Spacer y={12}/>
                    <CourseMain/>   
                </div>
            }

                      
        </div>
    )
}
export default Page


