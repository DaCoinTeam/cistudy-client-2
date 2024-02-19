import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { PostEntity, isErrorResponse } from "@common"
import { findOnePost } from "@services"
import {
    ContentUnderAction,
    ContentUnderState,
    useContentUnderReducer,
} from "./useContentUnderReducer"

import { Spacer } from "@nextui-org/react"
import { Actions } from "./Actions"
import { CreatorAndStats } from "./CreatorAndStats"

interface ContentUnderProps {
  post: PostEntity;
}

interface ContentUnderContextValue {
  state: ContentUnderState;
  dispatch: React.Dispatch<ContentUnderAction>;
  functions: {
    fetchAndSetReactPostPartial: () => Promise<void>;
  };
}
export const ContentUnderContext = createContext<ContentUnderContextValue | null>(null)

export const ContentUnder = (props: ContentUnderProps) => {
    const [state, dispatch] = useContentUnderReducer()

    const fetchAndSetReactPostPartial = useCallback(async () => {
        const response = await findOnePost(
            {
                postId: props.post.postId,
            },
            {
                postId: true,
                postReacts: {
                    liked: true,
                    userId: true,
                },
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_REACT_POST_PARTIAL",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetReactPostPartial()
        }
        handleEffect()
    }, [])

    const postCardContextValue: ContentUnderContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetReactPostPartial,
            },
        }),
        [state]
    )

    return (
        <ContentUnderContext.Provider value={postCardContextValue}>
            <CreatorAndStats post={props.post} />
            <Spacer y={4}/>
            <Actions />
        </ContentUnderContext.Provider>
    )
}
