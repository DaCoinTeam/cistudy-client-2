"use client"
import { getAssetManifestUrl, getAssetUrl, updateLessonProgress } from "@services"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../../../_shared"
import { VideoType } from "@common"
import { ContentDetailsContext } from "../../../../_hooks"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = (props: VideoSectionProps) => {
    const { className } = props

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContent, mutate } = sectionContentSwr
    const { lessonVideoId, videoType, enableSeek } = { ...sectionContent?.lesson }
    const { notify } = useContext(RootContext)!

    return (
        <div className={className}>
            <VideoPlayer
                preventSeek={!enableSeek}
                triggerOnFinish={!enableSeek}
                onFinish={async () => {
                    const { message } = await updateLessonProgress({
                        data: {
                            lessonId: sectionContent?.sectionContentId ?? "",
                            completeFirstWatch: true,
                            completePercent: 100
                        }
                    })
                    await mutate()
                    notify!({
                        data: {
                            message
                        },
                        type: ToastType.Success
                    })
                }}
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
