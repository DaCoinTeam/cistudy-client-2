"use client"
import React from "react"
import {CourseBanner, CourseMain, CourseSideBar} from "./_components"
const Page = () => {
    return (
        <div className="relative h-fit pb-12">
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
