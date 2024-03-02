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
} from "@nextui-org/react"
interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  props: PostCardProps;
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { post } = props
    const { title } = post

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({ props }),
        [props]
    )

    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <Card>
                <CardHeader className="p-6 pb-4 font-semibold">{title}</CardHeader>
                <CardBody className="p-6">
                    <div/>
                </CardBody>
                {/* <Divider />
                <CardBody className="p-6">
                    <BodyContent />
                </CardBody>
                <Divider />
                <CardFooter className="p-6 pt-6 overflow-visible">
                    <FooterContent />
                </CardFooter> */}
            </Card>
        </PostCardContext.Provider>
    )
}
