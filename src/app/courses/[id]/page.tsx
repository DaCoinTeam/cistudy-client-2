"use client"
import React, { useContext } from "react"
import { CourseDetailsContext } from "./_hooks"
import { getAssetUrl } from "@services"


const Page = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state
    return (
        <div className="relative h-fit pb-12">
            {JSON.stringify(course)}
            <img src={getAssetUrl(course?.previewVideoId)} />
        </div>
    )
}

export default Page
