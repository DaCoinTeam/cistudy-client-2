import React from "react"
import { SectionsCard, VideoSection } from "./_components"

const Page = () => {
    return (
        <div className="grid grid-cols-7 m-6 max-w-[1280px] gap-6 p-6 mx-auto">
            <VideoSection className="col-span-5"/>
            <SectionsCard className="col-span-2 h-fit"/>
        </div>
    )
}

export default Page