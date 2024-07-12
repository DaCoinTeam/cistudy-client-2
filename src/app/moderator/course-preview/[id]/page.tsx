"use client"
import { Spacer } from "@nextui-org/react"
import { CourseBanner, CourseMain, CourseFloat, CourseApprove } from "./_components"

const Page = () => {
    return (
        <div className="h-fit w-full pb-12 max-w-[1920px]">
            <div className="relative w-full">
                <div className="absolute h-[100%] w-1/4 top-[7rem] right-12">
                    <CourseFloat/>
                </div>   
                <CourseBanner/>
                <Spacer y={12}/>
                <CourseMain/>
                <CourseApprove />   
            </div>          
        </div>
    )
}

export default Page