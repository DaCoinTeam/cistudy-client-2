import React from "react"
import { ResourcesCard, SectionsCard, VideoSection } from "./_components"
import { Spacer } from "@nextui-org/react"
import { VideoDetailsSection } from "./_components/VideoDetailsSection"

const Page = () => {
    return (
        <div className="grid grid-cols-7 max-w-[1280px] gap-6 p-6 mx-auto">
            <div className="col-span-5">
                <VideoSection />
                <Spacer y={6}/>
                <VideoDetailsSection />
            </div>
            <div className="col-span-2">
                <SectionsCard/>
                <Spacer y={6}/>
                <ResourcesCard/>
            </div>              
        </div>
    )
}

export default Page