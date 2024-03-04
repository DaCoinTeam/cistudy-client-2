import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { isErrorResponse } from "@common"
import { toggleLikePost } from "@services"
import { PostCardContext } from ".."
import { InfinitePostsScrollerContext } from "../../InfinitePostsScrollerProviders"
import { CommentsModal } from "./CommentsModal"
import { BookmarkIcon, HeartIcon } from "lucide-react"

export const Actions = () => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId, liked } = post

    const { swrs } = useContext(InfinitePostsScrollerContext)!
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

    const renderLikeButton = () => {
        return (
            <Link onPress={onPress} as="button">
                <HeartIcon size={24} strokeWidth={4/3} fill={liked ? "currentColor" : "none"}/>
            </Link>
        )
    }

    return (
        <div className="flex items-center justify-between">
            <Link as="button">
                <BookmarkIcon size={24} strokeWidth={4/3} />
            </Link>
            <div className="flex gap-4 items-center">
                {renderLikeButton()}
                <CommentsModal />
            </div>
        </div>
    )
}
