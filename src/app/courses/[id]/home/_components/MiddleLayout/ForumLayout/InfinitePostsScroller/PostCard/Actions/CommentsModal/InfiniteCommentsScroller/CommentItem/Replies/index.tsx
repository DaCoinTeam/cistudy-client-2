import { PostCommentReplyEntity } from '@common';
import { Link } from '@nextui-org/react';
import { useContext } from 'react';
import { CommentItemContext } from '..';
import { PostCardContext } from '../../../../..';
import { CreateReply } from './CreateReply';
import {
    COLUMNS_PER_PAGE,
    RepliesContext,
    RepliesProvider,
} from './RepliesProvider';
import { ReplyItem } from './ReplyItem';

interface RepliesProps {
  className?: string;
}

const WrappedReplies = (props: RepliesProps) => {
  const { className } = props;
  const { props: postCardContextProps } = useContext(PostCardContext)!;
  console.log("postCardContextProps", postCardContextProps)
  const { post } = postCardContextProps;
  const { isCompleted } = post;
  console.log("create Reply comment", isCompleted)
  const { swrs } = useContext(RepliesContext)!;
  const { postCommentRepliesSwr } = swrs;
  const { data, size, setSize } = postCommentRepliesSwr;

  const getPostCommentReplies = () => {
    if (!data) return [];
    const postCommentRepliesReturn: Array<PostCommentReplyEntity> = [];
    data.forEach((element) => {
      if (!element) return;
      const { results } = element;
      postCommentRepliesReturn.push(...results);
    });
    return postCommentRepliesReturn;
  };

  const getPages = () => {
    if (!data) return 0;
    const last = data.at(-1);
    if (!last) return 0;
    return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE);
  };

  const isLoadMore = size < getPages();

  const renderLoadMoreButton = () => {
    const onPress = () => setSize(size + 1);
    return (
      <>
        {isLoadMore ? (
          <Link as='button' onPress={onPress} size='sm'>
            Load More
          </Link>
        ) : null}
      </>
    );
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      {getPostCommentReplies().map((postCommentReply) => (
        <ReplyItem
          key={postCommentReply.postCommentReplyId}
          postCommentReply={postCommentReply}
        />
      ))}
      {renderLoadMoreButton()}
      {!isCompleted && <CreateReply />}
    </div>
  );
};

export const Replies = (props: RepliesProps) => {
  const { disclosures } = useContext(CommentItemContext)!;
  const { commentDisclosure } = disclosures;
  const { isOpen } = commentDisclosure;
  return (
    <>
      {isOpen ? (
        <RepliesProvider>
          <WrappedReplies {...props} />
        </RepliesProvider>
      ) : null}
    </>
  );
};
