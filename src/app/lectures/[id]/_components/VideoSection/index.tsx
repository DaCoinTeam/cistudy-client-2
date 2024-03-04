"use client"
import React, { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { LectureDetailsContext } from "../../_hooks"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { Spacer, User } from "@nextui-org/react"
import { MoreButton } from "./MoreButton"
import { parseDateStringFrom } from "@common"
import { ToggleFollowButton } from "./ToggleFollowButton"

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = (props: VideoSectionProps) => {
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
            <VideoPlayer
                src={getAssetManifestUrl(lecture?.lectureVideoId)}
                videoType={lecture?.videoType}
            />
            <Spacer y={4} />
            <div className="text-xl font-bold">{title}</div>
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
                <MoreButton />
            </div>
            <Spacer y={4} />
            <div className="bg-content1 rounded-large p-4">
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
