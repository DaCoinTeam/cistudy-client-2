import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { Button, Tooltip } from "@nextui-org/react"
import { toggleLikePost } from "@services"
import { GiftIcon } from "lucide-react"
import { useContext } from "react"
import { RootContext } from "../../../../_hooks"
import { PostDetailContext } from "../../hooks"
import { ToastType } from "../../../../_components"

export const Actions = () => {
    const { notify } = useContext(RootContext)!

    const { swrs } = useContext(PostDetailContext)!
    const { postSwr } = swrs
    const { mutate, data } = postSwr

    const {
        postId,
        liked,
        numberOfLikes,
        isCompleted,
        isRewardable,
        numberOfRewardableLikesLeft,
    } = {...data}

    const onPress = async () => {
        const { others } = await toggleLikePost({
            data: {
                postId: postId?? "",
            },
        })
        if (others.earnAmount) {
      notify!({
          type: ToastType.Earn,
          data: {
              earnAmount: others.earnAmount,
          },
      })
        }

        mutate()
    }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='flex items-center gap-2'>
                    <Tooltip
                        isDisabled={liked || isCompleted || !isRewardable || numberOfRewardableLikesLeft === 0}
                        content={
                            <div className='px-1 py-2'>
                                <div className='text-small font-bold flex text-yellow-500'>
                                    <GiftIcon size={18} className='mr-1 ' />
                  Like now to claim your prize!
                                </div>
                                <div className='text-tiny'>
                                    <div>
                  This post still has {numberOfRewardableLikesLeft} likes left
                  to earn a reward.
                                    </div>                   
                                </div>
                            </div>
                        }
                    >
                        <Button
                            startContent={
                                liked ? (
                                    <SolidHeartIcon height={20} width={20} />
                                ) : (
                                    <HeartIcon height={20} width={20} />
                                )
                            }
                            className='!px-2.5 min-w-0'
                            color='primary'
                            variant='light'
                            onPress={onPress}
                            isDisabled={isCompleted || liked}
                        >
                            {numberOfLikes}
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <Button isIconOnly color='primary' variant='light' onPress={onPress}>
                <BookmarkIcon height={20} width={20} />
            </Button>
        </div>
    )
}
