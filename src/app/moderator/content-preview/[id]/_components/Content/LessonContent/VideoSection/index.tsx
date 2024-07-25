"use client"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../../../../_shared" 
import { VideoType } from "@common"
import { SectionContentPreviewContext } from "../../../../_hooks"

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = (props: VideoSectionProps) => {
    const { className } = props

    const { swrs } = useContext(SectionContentPreviewContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContent } = sectionContentSwr
    const { lessonVideoId, videoType } = { ...sectionContent?.lesson }
    
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
