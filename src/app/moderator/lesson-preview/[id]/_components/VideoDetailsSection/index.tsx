"use client"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { Spacer, User } from "@nextui-org/react"
import { ResourcesModal } from "./ResourcesModal"
import { LessonPreviewContext } from "../../_hooks"

interface VideoDetailsSectionProps {
  className?: string;
}

export const VideoDetailsSection = (props: VideoDetailsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LessonPreviewContext)!
    const { lessonsSwr } = swrs
    const { data: lesson } = lessonsSwr

    const { section, title } = { ...lesson }
    const { course } = { ...section }
    const { creator } = { ...course }
    const { username, avatarId } = { ...creator }

    return (
        <div className={className}>
            <div className="text-2xl">{title}</div>
            <Spacer y={4} />
            <div className="justify-between flex items-center">
                <div className="flex items-center gap-8">
                    <User
                        classNames={{
                            name: "text-base",
                        }}
                        name={username}
                        avatarProps={{
                            src: getAssetUrl(avatarId),
                        }}
                    />
                </div>
                <div className="gap-2 flex items-center">
                    <ResourcesModal />
                </div>
              
            </div>
        </div>
    )
}
