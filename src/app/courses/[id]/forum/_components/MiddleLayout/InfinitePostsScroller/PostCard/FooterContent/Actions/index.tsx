import {
    BookmarkIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import {
    HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { isErrorResponse } from "@common"
import { reactPost } from "@services"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { CommentsModal } from "./CommentsModal"
import { PostCardContext } from "../../index"
import { ForumContext } from "../../../../../../_hooks"

export const Actions = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)

    const { props } = useContext(PostCardContext)!
    const { post } = props

    const { functions } = useContext(ForumContext)!
    const { fetchAndSetPosts } = functions

    const onLikePress = async () => {
        if (post === null) return
        const { postId } = post
        const response = await reactPost({
            data: {
                postId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetPosts()
        } else {
            console.log(response)
        }
    }

    const renderLikeIcon = () => {
        const found = post?.postReacts.find(
            (post) =>
                post.liked && post.userId === profile?.userId
        )
        return found ? (
            <SolidHeartIcon className="w-6 h-6" />
        ) : (
            <HeartIcon className="w-6 h-6" />
        )
    }

    return (
        <div className="flex items-center justify-between">
            <Link as="button">
                <BookmarkIcon className="w-6 h-6 " />
            </Link>
            <div className="flex gap-6">
                <Link onPress={onLikePress} as="button">
                    {renderLikeIcon()}
                </Link>
                <CommentsModal />
            </div>
        </div>
    )
}
