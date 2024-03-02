"use client"
import React, {
    createContext,
    useMemo,
} from "react"
import { PostEntity } from "@common"
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import { MediaGroup, TextRenderer } from "../../../../../../../_shared"
import { CreatorAndStats } from "./CreatorAndStats"
interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  props: PostCardProps;
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { post } = props
    const { title, html, postMedias } = post

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({ props }),
        [props]
    )

    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <Card shadow="none">
                <CardHeader className="p-4 pb-2 font-semibold text-lg">{title}</CardHeader>
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
                <CardBody className="p-4 pt-0 gap-4">
                    <Divider/>
                    <CreatorAndStats className="w-full"/>
                </CardBody>
            </Card>
        </PostCardContext.Provider>
    )
}
