"use client"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../../_shared" 
import { LessonPreviewContext } from "../../_hooks"
import { VideoType } from "@common"

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = (props: VideoSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LessonPreviewContext)!
    const { lessonsSwr } = swrs
    const { data: lesson } = lessonsSwr
    const { lessonVideoId, videoType } = { ...lesson }

    return (
        <div className={className}>
            <VideoPlayer
                src={
                    videoType === VideoType.DASH
                        ? getAssetManifestUrl(lessonVideoId)
                        : getAssetUrl(lessonVideoId)
                }
                videoType={videoType}
            />
        </div>
    )
}
