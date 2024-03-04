import React from "react"
import { VideoSection } from "./_components/VideoSection"

const Page = () => {
    return (
        <div className="grid grid-cols-5 m-6 max-w-[1280px] p-6 mx-auto">
            <VideoSection className="col-span-4"/>
        </div>
    )
}

export default Page