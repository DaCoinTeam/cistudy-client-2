"use client"
import React from "react"
import { CoverPhoto, UserAvatar } from "./_components"

const Page = () => {
    return (
        <div className="relative h-fit pb-12">
            <CoverPhoto className="absolute w-full h-[300px]" />
            <div className="max-w-[1280px] m-auto h-[300px] relative">
                <UserAvatar className="z-20 absolute -bottom-12 left-6" />
            </div>
        </div>
    )
}

export default Page
