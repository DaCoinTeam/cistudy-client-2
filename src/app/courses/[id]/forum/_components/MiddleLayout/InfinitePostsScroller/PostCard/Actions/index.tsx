import { Button, Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { isErrorResponse } from "@common"
import { toggleLikePost } from "@services"
import { PostCardContext } from ".."
import { MiddleLayoutContext } from "../../../MiddleLayoutProviders"
import { CommentsModal } from "./CommentsModal"
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"

export const Actions = () => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId, liked, numberOfLikes } = post

    const { swrs } = useContext(MiddleLayoutContext)!
    const { postsSwr } = swrs
    const { mutate } = postsSwr

    const onPress = async () => {
        const response = await toggleLikePost({
            data: {
                postId,
            },
        })
        if (!isErrorResponse(response)) {
            await mutate()
        } else {
            console.log(response)
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                    <Button
                        startContent={
                            liked ? (
                                <SolidHeartIcon height={20} width={20} />
                            ) : (
                                <HeartIcon height={20} width={20} />
                            )
                        }
                        className="!px-2.5 min-w-0"
                        color="primary"
                        variant="light"
                        onPress={onPress}
                    >
                        {numberOfLikes}
                    </Button>
                    <CommentsModal />
                </div>
            </div>
            <Link as="button">
                <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    onPress={onPress}
                >
                    <BookmarkIcon height={20} width={20} />
                </Button>
               
            </Link>
        </div>
    )
}
