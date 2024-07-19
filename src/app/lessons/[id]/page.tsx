"use client"
import React, { useContext } from "react"
import { LessonSkeleton, QuizSection, SectionsCard, VideoSection } from "./_components"
import { Spacer } from "@nextui-org/react"
import { VideoDetailsSection } from "./_components/VideoDetailsSection"
import { LessonDetailsContext } from "./_hooks"

const Page = () => {
    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { isLoading  } = lessonsSwr
    return (
        <div>
            {!lessonsSwr.data || isLoading ?  <LessonSkeleton/> :  (
                <div className="grid grid-cols-7 max-w-[1920px] gap-12 p-12 mx-auto">
                    <div className="col-span-5">
                        <VideoSection />
                        <Spacer y={6}/>
                        <VideoDetailsSection />
                        <Spacer y={6}/>
                        <QuizSection />
                    </div>
                    <SectionsCard className="col-span-2 h-fit"/>            
                </div>
            )
            }
        </div>

        
    )
}

export default Page