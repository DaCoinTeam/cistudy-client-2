"use client"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { LectureDetailsContext } from "../../_hooks"
import { VideoType } from "@common"

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = (props: VideoSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr
    const { lectureVideoId, videoType } = { ...lecture }

    return (
        <div className={className}>
            <VideoPlayer
                src={
                    videoType === VideoType.DASH
                        ? getAssetManifestUrl(lectureVideoId)
                        : getAssetUrl(lectureVideoId)
                }
                videoType={videoType}
            />
        </div>
    )
}
