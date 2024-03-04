"use client"
import React, { useContext } from "react"
import { CourseDetailsContext } from "./_hooks"
// import { getAssetUrl } from "@services"
import {CourseBanner, CourseMain, CourseSideBar} from "./_components"
// const CourseData = {

// }

const Page = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state
    return (
        <div className="relative h-fit pb-12">
            {/* {JSON.stringify(course)}
            <img src={getAssetUrl(course?.previewVideoId)} /> */}
            <div >
                <div className="mb-5">
                    <CourseBanner/>
              
                </div>
       
                <div className="grid grid-cols-3 gap-4 px-[5em] mb-5">      
                    <div className="col-span-2">
                        <CourseMain/>
                    </div>      
                    <div className="px-5">
                    </div>
                </div>
                <div className="fixed top-28 right-14 ">
                    <CourseSideBar/>
                </div>
            </div>
        </div>
    )
}

export default Page
