import {
    BookmarkIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { PostEntity, isErrorResponse } from "@common"
import { reactPost } from "@services"
import { ForumContext } from "../../../../../_hooks"
import { useSelector } from "react-redux"
import { RootState } from "@redux"

interface ActionProps {
  post: PostEntity;
}

const Actions = (props: ActionProps) => {
    const profile = useSelector((state: RootState) => state.auth.profile)

    const { functions } = useContext(ForumContext)!
    const { fetchAndSetPosts } = functions

    const onPress = async () => {
        const { post } = props
        const { postId } = post
        const response = await reactPost({
            data: {
                postId,
            },
        })
        if (!isErrorResponse(response)) {
            fetchAndSetPosts()
        } else {
            console.log(response)
        }
    }

    return (
        <div className="flex items-center justify-between">
            <Link as="button">
                <BookmarkIcon className="w-6 h-6 " />
            </Link>
            <div className="flex gap-6">
                <Link onPress={onPress} as="button">
                    {props.post.postReacts.find(
                        (postReact) =>
                            postReact.liked && (postReact.userId === profile?.userId)
                    ) ? (
                            <SolidHeartIcon className="w-6 h-6" />
                        ) : (
                            <HeartIcon className="w-6 h-6" />
                        )}
                </Link>
                <Link as="button">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}

export default Actions
