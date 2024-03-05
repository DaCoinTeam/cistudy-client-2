"use client"
import React, { useContext } from "react"
import { LectureDetailsContext } from "../../_hooks"
import { getAssetUrl } from "@services"
import { Spacer, User } from "@nextui-org/react"
import { MoreButton } from "./MoreButton"
import { parseDateStringFrom } from "@common"
import { ToggleFollowButton } from "./ToggleFollowButton"
import { ResourcesModal } from "./ResourcesModal"

interface VideoDetailsSectionProps {
  className?: string;
}

export const VideoDetailsSection = (props: VideoDetailsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr

    const { section, title, numberOfViews, description, createdAt } = { ...lecture }
    const { course } = { ...section }
    const { creator } = { ...course }
    const { username, avatarId, numberOfFollowers } = { ...creator }

    return (
        <div className={className}>
            <div className="text-xl font-bold leading-none">{title}</div>
            <Spacer y={4} />
            <div className="justify-between flex items-center">
                <div className="flex items-center gap-8">
                    <User
                        classNames={{
                            name: "font-semibold text-base",
                        }}
                        name={username}
                        description={`${numberOfFollowers} followers`}
                        avatarProps={{
                            src: getAssetUrl(avatarId),
                        }}
                    />
                    <ToggleFollowButton />
                </div>
                <div className="gap-4 flex items-center">
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
                    {description} 13 32 132 13 123 1222222222222222222222222222233333333333333333333333333333333 1222222222222222222222222222233333333333333333333333333333333 1222222222222222222222222222233333333333333333333333333333333
                </div>
            </div>
        </div>
    )
}
