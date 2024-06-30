"use client"
import React from "react"
import { CoverPhoto, DetailsTabs, UnderAvatarSection, AccountAvatar } from "./_components"
import { Spacer } from "@nextui-org/react"

const Page = () => {
    return (
        <div>
            <div className="relative h-fit pb-12">
                <CoverPhoto className="absolute w-full h-[300px]" />
                <div className="max-w-[1920px] mx-auto h-[300px] relative">
                    <AccountAvatar className="z-20 absolute -bottom-12 left-12" />
                </div>
            </div>
            <Spacer y={4}/>
            <div className="max-w-[1920px] px-12 mx-auto">
                <UnderAvatarSection />
                <Spacer y={12}/>
                <DetailsTabs />
            </div>   
        </div>
    )
}

export default Page
