"use client"
import React, { useContext } from "react"
import { CourseDetailsContext } from "./_hooks"
import {CourseBanner, CourseMain, CourseSideBar} from "./_components"
import { Image } from "@nextui-org/react"
import { getAssetUrl } from "@services"

const Page = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    return (
        <div className="relative h-fit pb-12">
            <Image alt="preivewVideo" src={getAssetUrl(course?.previewVideoId)} />
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
