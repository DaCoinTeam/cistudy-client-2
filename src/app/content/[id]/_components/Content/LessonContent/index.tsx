import React from "react"
import { VideoSection } from "./VideoSection"
import { VideoDetailsSection } from "./VideoDetailsSection"

export const LessionContent = () => {
    return (<div className="grid gap-12">
        <VideoSection/>
        <VideoDetailsSection/>
    </div>)
}