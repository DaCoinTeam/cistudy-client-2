import { Button, Tooltip } from '@nextui-org/react';
import React, { useContext } from 'react';
import { toggleLikePost } from '@services';
import { PostCardContext } from '..';
import { ForumLayoutContext } from '../../../ForumLayoutProvider';
import { CommentsModal } from './CommentsModal';
import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { RootContext } from '../../../../../../../../../_hooks';
import { ToastType } from '../../../../../../../../../_components';
import toast, { Toaster } from 'react-hot-toast';
import { GiftIcon } from 'lucide-react';

export const Actions = () => {
  const { notify } = useContext(RootContext)!;

  const { props } = useContext(PostCardContext)!;
  const { post } = props;
  const {
    postId,
    liked,
    numberOfLikes,
    isCompleted,
    numberOfRewardableCommentsLeft,
    numberOfRewardableLikesLeft,
  } = post;

  const { swrs } = useContext(ForumLayoutContext)!;
  const { postsSwr } = swrs;
  const { mutate } = postsSwr;

  const onPress = async () => {
    const { others } = await toggleLikePost({
      data: {
        postId,
      },
    });
    if (others.earnAmount) {
      notify!({
        type: ToastType.Earn,
        data: {
          earnAmount: others.earnAmount,
        },
      });
    }

    mutate();
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <div className='flex items-center gap-2'>
          <Tooltip
          isDisabled={liked || isCompleted || numberOfRewardableLikesLeft === 0}
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
              isDisabled={isCompleted}
            >
              {numberOfLikes}
            </Button>
          </Tooltip>

          <CommentsModal />
        </div>
      </div>
      <Button isIconOnly color='primary' variant='light' onPress={onPress}>
        <BookmarkIcon height={20} width={20} />
      </Button>
    </div>
  );
};
