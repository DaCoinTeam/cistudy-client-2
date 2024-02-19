import React from "react"
import { PostEntity } from "@common"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import { BodyContent } from "./BodyContent"
import { FooterContent } from "./FooterContent"

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
                <BodyContent post={props.post} />
            </CardBody>
            <CardFooter className="p-6 pt-0 overflow-visible">
                <FooterContent post={props.post} />
            </CardFooter>
        </Card>
    )
}
