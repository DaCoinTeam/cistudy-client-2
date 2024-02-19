import React, { createContext, useCallback, useMemo, useState } from "react";
import { PostEntity, isErrorResponse } from "@common";
import { Card, CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react";
import { CreatorAndStats } from "./CreatorAndStats";
import Actions from "./Actions";
import { findOnePost } from "@services";
import {
  PostCardState,
  SetPostsAction,
  usePostCardReducer,
} from "./usePostCardReducer";
import { ContentBody } from "./ContentBody";

interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  state: PostCardState;
  dispatch: React.Dispatch<SetPostsAction>;
  functions: {
    fetchAndSetPost: () => Promise<void>;
  };
}
export const PostCardContext = createContext<PostCardContextValue | null>(null);

export const PostCard = (props: PostCardProps) => {
  const [state, dispatch] = usePostCardReducer();

  const fetchAndSetPost = useCallback(async () => {
    const response = await findOnePost(
      {
        postId: props.post.postId,
      },
      {
        postReacts: {
          liked: true,
          userId: true,
        },
      }
    );
    if (!isErrorResponse(response)) {
      dispatch({
        type: "SET_REACT_POST_PARTIAL",
        payload: response,
      });
    } else {
      console.log(response);
    }
  }, []);

  const postCardContextValue: PostCardContextValue = useMemo(
    () => ({
      state,
      dispatch,
      functions: {
        fetchAndSetPost,
      },
    }),
    [state]
  );

  return (
    <PostCardContext.Provider value={postCardContextValue}>
      <Card>
        <CardHeader className="p-6 pb-4 font-semibold">
          {props.post.title}
        </CardHeader>
        <Divider />
        <CardBody className="p-6">
          <ContentBody post={props.post} />
          <Spacer y={6} />
          <CreatorAndStats post={props.post} />
          <Spacer y={6} />
          <Actions post={props.post} />
        </CardBody>
      </Card>
    </PostCardContext.Provider>
  );
};
