import {
    BookmarkIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { isErrorResponse } from "@common"
import { reactPost } from "@services"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { ContentUnderContext } from "../index"

export const Actions = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)

    const { state, functions } = useContext(ContentUnderContext)!
    const { reactPostPartial } = state
    const { fetchAndSetReactPostPartial } = functions

    const onPress = async () => {
        if (reactPostPartial === null) return
        const { postId } = reactPostPartial
        const response = await reactPost({
            data: {
                postId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetReactPostPartial()
        } else {
            console.log(response)
        }
    }

    const renderLikeIcon = () => {
        const found = reactPostPartial?.postReacts.find(
            (reactPostPartial) =>
                reactPostPartial.liked && reactPostPartial.userId === profile?.userId
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
                <Link onPress={onPress} as="button">
                    {renderLikeIcon()}
                </Link>
                <Link as="button">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}