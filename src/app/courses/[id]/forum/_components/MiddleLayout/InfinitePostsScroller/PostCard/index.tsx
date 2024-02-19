import React from "react"
import { PostEntity } from "@common"
import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react"
import { ContentBody } from "./ContentBody"
import { ContentUnder } from "./ContentUnder"

interface PostCardProps {
  post: PostEntity;
}

export const PostCard = (props: PostCardProps) => {

    return (
        <Card>
            <CardHeader className="p-6 pb-4 font-semibold">
                {props.post.title}
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
                <ContentBody post={props.post} />
                <Spacer y={6} />
                <ContentUnder post={props.post}/>
            </CardBody>
        </Card>
    )
}
