import React, { createContext } from "react"
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

export const PostCardPropsContext = createContext<PostCardProps|null>(null)

export const PostCard = (props: PostCardProps) => {
    return (
        <PostCardPropsContext.Provider value={props}>
            <Card>
                <CardHeader className="p-6 pb-4 font-semibold">
                    {props.post.title}
                </CardHeader>
                <Divider />
                <CardBody className="p-6">
                    <BodyContent/>
                </CardBody>
                <Divider/>
                <CardFooter className="p-6 pt-6 overflow-visible">
                    <FooterContent />
                </CardFooter>
            </Card>
        </PostCardPropsContext.Provider>
    )
}
