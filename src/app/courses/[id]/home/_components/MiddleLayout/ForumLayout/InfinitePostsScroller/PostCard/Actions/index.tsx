import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { toggleLikePost } from "@services"
import { PostCardContext } from ".."
import { ForumLayoutContext } from "../../../ForumLayoutProvider"
import { CommentsModal } from "./CommentsModal"
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { RootContext } from "../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../_components"

export const Actions = () => {
    const { notify } = useContext(RootContext)!

    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId, liked, numberOfLikes } = post

    const { swrs } = useContext(ForumLayoutContext)!
    const { postsSwr } = swrs
    const { mutate } = postsSwr

    const onPress = async () => {

        const { earnAmount } = await toggleLikePost({
            data: {
                postId,
            },
        })
        notify!({
            type: ToastType.Earn,
            data: {
                earnAmount: earnAmount ?? 0
            }
        })
        mutate()
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
            <Button
                isIconOnly
                color="primary"
                variant="light"
                onPress={onPress}
            >
                <BookmarkIcon height={20} width={20} />
            </Button>
        </div>
    )
}
