import { Button, Tooltip } from '@nextui-org/react';
import { CheckIcon } from 'lucide-react';
import React, { useContext, useRef } from 'react';
import {
  ConfirmModalRef,
  ConfirmModalRefSelectors,
} from '../../../../../../../../../../../../../_shared';
import { markPostCommentAsSolution } from '@services';
import { RootContext } from '../../../../../../../../../../../../../_hooks';
import { CommentsModalContext } from '../../../CommentsModalProvider';
import { ToastType } from '../../../../../../../../../../../../../_components';

interface RewardButtonProps {
  postCommentId: string;
}

export const MarkAsSolutionButton = ({
  postCommentId}: RewardButtonProps) => {
  const { notify } = useContext(RootContext)!;
  const { swrs } = useContext(CommentsModalContext)!;
  const { postCommentsSwr } = swrs;
  const { mutate } = postCommentsSwr;
  const confirmModalRef = useRef<ConfirmModalRefSelectors | null>(null);
  const onConfirmModalOpen = () => confirmModalRef.current?.onOpen();

  const onOKPress = async () => {

    await markPostCommentAsSolution({
      data: {
        postCommentId,
      },
    })
      .then(async (res) => {
        notify!({
          type: ToastType.Success,
          data: {
            error: res.message,
          },
        });
        await mutate();
      })
      .catch((ex) => {
        notify!({
          type: ToastType.Error,
          data: {
            error: ex.message,
          },
        });
      });
  };
  return (
    <>
        <Tooltip content='Reward comment'>
          <Button
            isIconOnly
            aria-label='Like'
            variant='light'
            color='primary'
            className='px-2.5 min-w-0 transition-opacity opacity-0 group-hover/comment:opacity-100'
            onPress={onConfirmModalOpen}
          >
            <CheckIcon />
          </Button>
        </Tooltip>

      <ConfirmModalRef
        ref={confirmModalRef}
        title='Rewarding comment and mark comment is completed'
        content='Are you sure you want to award this comment and mark the end of commenting and liking on this post ? You cannot undo this action.'
        onOKPress={onOKPress}
      />
    </>
  );
};
