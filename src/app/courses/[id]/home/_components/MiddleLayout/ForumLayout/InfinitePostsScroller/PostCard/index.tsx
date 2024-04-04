"use client"
import React, { createContext, useMemo } from "react"
import { PostEntity, parseTimeAgo } from "@common"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    User,
} from "@nextui-org/react"
import { MediaGroup, TextRenderer } from "../../../../../../../../_shared"
import { Actions } from "./Actions"
import { getAssetUrl } from "@services"
import { MoreButton } from "./MoreButton"
interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  props: PostCardProps;
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { post } = props
    const { title, html, postMedias, creator, createdAt, updatedAt } = post
    const { avatarId, username } = creator

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({ props }),
        [props]
    )

    const isEdited = updatedAt !== createdAt

    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <Card shadow="none" className="border border-divider rounded-medium">
                <CardHeader className="p-4 pb-2 inline">
                    <div className="flex items-center justify-between">
                        <User
                            classNames={{
                                name: "text-base",
                            }}
                            name={username}
                            description={
                                <div className="flex gap-2 items-center">
                                    <div>{parseTimeAgo(updatedAt)}</div>
                                    {isEdited ? <div> Edited </div> : null}
                                </div>
                            }
                            avatarProps={{ src: getAssetUrl(avatarId) }}
                        />
                        <MoreButton />
                    </div>
                </CardHeader>
                <CardBody className="p-4 gap-4">
                    <div className="text-xl font-semibold"> {title} </div>
                    <TextRenderer html={html} />
                    <MediaGroup
                        medias={postMedias?.map(({ mediaId, mediaType, postMediaId }) => ({
                            key: postMediaId,
                            mediaId,
                            mediaType,
                        }))}
                    />
                </CardBody>
                <CardFooter className="p-4 pt-2 inline">
                    <Actions />
                </CardFooter>
            </Card>
        </PostCardContext.Provider>
    )
}
