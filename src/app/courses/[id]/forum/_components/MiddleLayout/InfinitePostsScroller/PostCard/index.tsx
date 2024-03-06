"use client"
import React, { createContext, useMemo } from "react"
import { PostEntity, parseTimeAgo } from "@common"
import { Card, CardBody, CardHeader, User } from "@nextui-org/react"
import { MediaGroup, TextRenderer } from "../../../../../../../_shared"
import { Actions } from "./Actions"
import { getAssetUrl } from "../../../../../../../../services/server"
interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  props: PostCardProps;
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { post } = props
    const { title, html, postMedias, creator, createdAt } = post
    const { avatarId, username } = creator

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({ props }),
        [props]
    )

    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <Card shadow="none" className="border border-divider">
                <CardHeader className="p-4 pb-2 inline">
                    <User
                        classNames={{
                            name: "text-base font-semibold",
                        }}
                        name={username}
                        description={
                            parseTimeAgo(createdAt)
                        }
                        avatarProps={{ src: getAssetUrl(avatarId)}}
                    />
                    <div className="text-xl font-bold"> {title} </div>
                </CardHeader>
                <CardBody className="p-4 gap-4">
                    <TextRenderer html={html} />
                    <MediaGroup
                        medias={postMedias?.map(({ mediaId, mediaType, postMediaId }) => ({
                            key: postMediaId,
                            mediaId,
                            mediaType,
                        }))}
                    />
                </CardBody>
                <CardBody className="p-4">
                    <Actions />
                </CardBody>
            </Card>
        </PostCardContext.Provider>
    )
}
