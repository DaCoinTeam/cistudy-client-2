"use client"
import React, { useContext } from "react"
import { getAvatarUrl } from "@services"
import { Spacer, User } from "@nextui-org/react"
import { MoreButton } from "./MoreButton"
import { formatNouns, parseDateStringFrom } from "@common"
import { ToggleFollowButton } from "./ToggleFollowButton"
import { ContentDetailsContext } from "../../../../_hooks"

interface VideoDetailsSectionProps {
  className?: string;
}

export const VideoDetailsSection = (props: VideoDetailsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContent } = sectionContentSwr
    const { title, createdAt } = { ...sectionContent }
    const { description } = { ...sectionContent?.lesson }
    const { course } = { ...sectionContent?.section }
    const { creator } = { ...course }
    const { username, avatarId, numberOfFollowers, avatarUrl, kind } = { ...creator }
    
    return (
        <div className={className}>
            <div className="text-2xl font-semibold">{title}</div>
            <Spacer y={4} />
            <div className="justify-between flex items-center">
                <div className="flex items-center gap-8">
                    <User
                        classNames={{
                            name: "text-base font-semibold",
                        }}
                        name={username}
                        description={formatNouns(numberOfFollowers, "follower")}
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId,
                                avatarUrl,
                                kind
                            }),
                        }}
                    />
                    <ToggleFollowButton />
                </div>
                <div className="gap-2 flex items-center">
                    <MoreButton />
                </div>
              
            </div>
            <Spacer y={4} />
            <div className="bg-content2 rounded-large p-4">
                <div className="font-semibold text-sm flex items-center gap-4"> 
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
