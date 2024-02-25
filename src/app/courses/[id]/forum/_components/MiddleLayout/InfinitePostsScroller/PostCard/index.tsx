import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react"
import { PostEntity, isErrorResponse } from "@common"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import { BodyContent } from "./BodyContent"
import { FooterContent } from "./FooterContent"
import {
    PostCardAction,
    PostCardState,
    usePostCardReducer,
} from "./usePostCardReducer"
import { findOnePost } from "@services"

interface PostCardProps {
  post: PostEntity;
}

interface PostCardContextValue {
  state: PostCardState;
  dispatch: React.Dispatch<PostCardAction>;
  functions: {
    fetchAndSetPost: () => Promise<void>;
  };
}

export const PostCardContext = createContext<PostCardContextValue | null>(null)

export const PostCard = (props: PostCardProps) => {
    const { postId } = props.post
    const [state, dispatch] = usePostCardReducer()

    const fetchAndSetPost = useCallback(async () => {
        const response = await findOnePost(
            {
                postId,
            },
            {
                postId: true,
                title: true,
                postMedias: {
                    postMediaId: true,
                    mediaId: true,
                    mediaType: true
                },
                html: true,
                creator: {
                    avatarId: true,
                },
                postReacts: {
                    liked: true,
                    userId: true,
                },
                postComments: {
                    postCommentId: true,
                },
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_POST",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetPost()
        }
        handleEffect()
    }, [])

    const postCardContextValue: PostCardContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetPost,
            },
        }),
        [state]
    )
    return (
        <PostCardContext.Provider value={postCardContextValue}>
            <WrappedPostCard />
        </PostCardContext.Provider>
    )
}

const WrappedPostCard = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    return (
        <Card>
            <CardHeader className="p-6 pb-4 font-semibold">
                {post?.title}
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
                <BodyContent />
            </CardBody>
            <Divider />
            <CardFooter className="p-6 pt-6 overflow-visible">
                <FooterContent />
            </CardFooter>
        </Card>
    )
}
