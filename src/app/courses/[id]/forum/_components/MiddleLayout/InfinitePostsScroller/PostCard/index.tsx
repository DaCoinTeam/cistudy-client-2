import React from "react"
import { PostEntity } from "@common"
import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react"
import { ContentItem } from "./ContentItem"
import { CreatorAndStats } from "./CreatorAndStats"
import Actions from "./Actions"

interface PostCardProps {
    post: PostEntity
}

export const PostCard = (props: PostCardProps) => {
    const renderContents = () => (
        <div className="flex flex-col gap-4 overflow-auto">
            {props.post.postContents.map((content) => (
                <ContentItem
                    key={content.postContentId}
                    postContent={content}
                />
            ))}
        </div>
    )

    return (
        <Card>
            <CardHeader className="p-6 pb-4 font-semibold">
                {props.post.title}
            </CardHeader>
            <Divider/>
            <CardBody className="p-6">
                {renderContents()}
                <Spacer y={6}/>
                <CreatorAndStats post={props.post}/>
                <Spacer y={6}/>
                <Actions post={props.post}/>
            </CardBody>
        </Card>
    )
}