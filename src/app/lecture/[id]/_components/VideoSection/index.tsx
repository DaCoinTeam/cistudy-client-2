"use client"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { LectureDetailsContext } from "../../_hooks"
import { getAssetManifestUrl } from "@services"
import { Avatar, Button, Spacer } from "@nextui-org/react"
import { UserPlus2Icon } from "lucide-react"
import { MoreButton } from "./MoreButton"

interface VideoSectionProps {
    className?: string
}

export const VideoSection = (props: VideoSectionProps) => {
    const {className} = props

    const { state } = useContext(LectureDetailsContext)!
    const { lecture } = state

    return (
        <div className={className}>
            <VideoPlayer src={getAssetManifestUrl(lecture?.lectureVideoId)} videoType={lecture?.videoType}/>
            <Spacer y={2}/>
            <div className="text-xl font-semibold">
                {lecture?.title}
            </div>
            <Spacer y={4}/>
            <div className="justify-between flex items-center">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Avatar />
                        <div>
                            <div className="font-semibold"> Rhyder </div>
                            <div className="text-sm"> 12323 </div>
                        </div>
                    </div>
                    <Button className="bg-content2" startContent={<UserPlus2Icon size={21} strokeWidth={4/3}/>}> Follow </Button>
                </div>    
                <MoreButton />
            </div> 
            <Spacer y={4}/>
            <div className="bg-content2 rounded-large p-4">
                12323
            </div>  
        </div>
    )
}