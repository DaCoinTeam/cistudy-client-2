"use client"
import { getAssetManifestUrl } from "@services"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { LectureDetailsContext } from "../../_hooks"

interface VideoSectionProps {
    className?: string;
  }
  
export const VideoSection = (props: VideoSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr

    return (
        <div className={className}>
            <VideoPlayer
                src={getAssetManifestUrl(lecture?.lectureVideoId)}
                videoType={lecture?.videoType}
            />
        </div>
    )
}
