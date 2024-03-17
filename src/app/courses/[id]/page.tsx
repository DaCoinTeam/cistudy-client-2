"use client"
import { CourseBanner, CourseMain, CourseSideBar } from "./_components"

const Page = () => {
    return (
        <div className="h-fit pb-12 flex justify-center ">
            <div className="max-w-[1920px] relative ">
    
                <div className="mb-5">
                    <CourseBanner/>
                </div>
                  
                <div className=" px-[5em] mb-5 justify-self-center flex ">   
                    <div className="w-2/3">
                        <CourseMain/>
                    </div>      
                </div>
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
