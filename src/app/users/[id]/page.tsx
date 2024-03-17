"use client"
import React from "react"
import { CoverPhoto, DetailsTabs, UnderAvatarSection, UserAvatar } from "./_components"
import { Spacer } from "@nextui-org/react"

const Page = () => {
    return (
        <div>
            <div className="relative h-fit pb-12">
                <CoverPhoto className="absolute w-full h-[300px]" />
                <div className="max-w-[100rem] mx-auto h-[300px] relative">
                    <UserAvatar className="z-20 absolute -bottom-12 left-6" />
                </div>
            </div>
            <Spacer y={4}/>
            <div className="max-w-[100rem] px-4 mx-auto">
                <UnderAvatarSection />
                <Spacer y={12}/>
                <DetailsTabs />
            </div>   
        </div>
    )
}

export default Page
