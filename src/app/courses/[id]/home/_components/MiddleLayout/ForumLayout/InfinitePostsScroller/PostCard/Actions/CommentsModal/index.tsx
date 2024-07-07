import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import React, { useContext } from 'react';
import { InfiniteCommentsScroller } from './InfiniteCommentsScroller';
import { CreateCommentSection } from './CreateCommentSection';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { CommentsModalProvider } from './CommentsModalProvider';
import { PostCardContext } from '../..';

export const CommentsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { props } = useContext(PostCardContext)!;
  const { post } = props;
  const { numberOfComments, isCompleted } = post;

  return (
    <>
      <Button
        color='primary'
        variant='light'
        className='min-w-0 px-2.5'
        startContent={<ChatBubbleOvalLeftEllipsisIcon height={20} width={20} />}
        onPress={onOpen}  
      >
        <div className='text-sm'> {numberOfComments}</div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <CommentsModalProvider>
          <ModalContent>
            <ModalHeader className='p-4 pb-2 text-xl'>Comments</ModalHeader>
            <ModalBody className='p-4 overflow-auto'>
              <InfiniteCommentsScroller />
            </ModalBody>
            {!isCompleted && (
              <ModalFooter className='p-4 pt-2'>
                <CreateCommentSection />
              </ModalFooter>
            )}
          </ModalContent>
        </CommentsModalProvider>
      </Modal>
    </>
  );
};
