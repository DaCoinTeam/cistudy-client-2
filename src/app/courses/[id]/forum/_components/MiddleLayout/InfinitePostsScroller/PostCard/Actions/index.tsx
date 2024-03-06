import { Link } from "@nextui-org/react"
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
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                    <Link onPress={onPress} as="button">
                        {
                            liked ?
                                <SolidHeartIcon height={24} width={24} strokeWidth={3/2}/>
                                : <HeartIcon height={24} width={24} />
                        } 
                    </Link>
                    <div className="text-primary"> {numberOfLikes} </div>
                </div>
                <CommentsModal />
            </div>
            <Link as="button">
                <BookmarkIcon height={24} width={24} strokeWidth={3/2} />
            </Link>
        </div>
    )
}
