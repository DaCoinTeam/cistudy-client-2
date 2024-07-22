"use client"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { Spacer, User } from "@nextui-org/react"
import { MoreButton } from "./MoreButton"
import { parseDateStringFrom } from "@common"
import { ToggleFollowButton } from "./ToggleFollowButton"
import { ResourcesModal } from "./ResourcesModal"
import { LessonDetailsContext } from "../../_hooks"

interface VideoDetailsSectionProps {
  className?: string;
}

export const VideoDetailsSection = (props: VideoDetailsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { data: lesson } = lessonsSwr

    const { section, title, numberOfViews, description, createdAt } = { ...lesson }
    const { course } = { ...section }
    const { creator } = { ...course }
    const { username, avatarId, numberOfFollowers } = { ...creator }

    return (
        <div className={className}>
            <div className="text-3xl font-bold text-primary">{title}</div>
            <Spacer y={4} />
            <div className="justify-between flex items-center">
                <div className="flex items-center gap-8">
                    <User
                        classNames={{
                            name: "text-base font-semibold",
                            description: "font-semibold",
                        }}
                        name={username}
                        description={`${numberOfFollowers} followers`}
                        avatarProps={{
                            src: getAssetUrl(avatarId),
                        }}
                    />
                    <ToggleFollowButton />
                </div>
                <div className="gap-2 flex items-center">
                    <ResourcesModal />
                    <MoreButton />
                </div>
              
            </div>
            <Spacer y={4} />
            <div className="bg-content2 rounded-large p-4">
                <div className="font-semibold text-sm flex items-center gap-4"> 
                    <div>
                        {numberOfViews} views 
                    </div>
                    <div>
                Premiered on {parseDateStringFrom(createdAt)}
                    </div>
                </div>
                <Spacer y={2}/>
                <div className="text-sm">
                    {description? description : "No description available"}
                </div>
            </div>
        </div>
    )
}
