"use client"
import { Spacer } from "@nextui-org/react"
import { CourseBanner, CourseMain, CourseSideBar } from "./_components"

const Page = () => {
    return (
        <div className="h-fit w-full pb-12">
            <div className="relative">
                <CourseBanner/>
                <Spacer y={12}/>
                <CourseMain/>   
                <div className="absolute h-[100%] w-1/4 top-10 right-6 justify-center ">
                    <div className="fixed">
                        <CourseSideBar/>
                    </div>
                </div>     
            </div>
            
        </div>
    )
}

export default Page
