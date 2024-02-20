import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { PostEntity, isErrorResponse } from "@common"
import { findOnePost } from "@services"
import {
    FooterContentAction,
    FooterContentState,
    useFooterContentReducer,
} from "./useFooterContentReducer"

import { Spacer } from "@nextui-org/react"
import { Actions } from "./Actions"
import { CreatorAndStats } from "./CreatorAndStats"

interface FooterProps {
  post: PostEntity;
}

interface FooterContentContextValue {
  state: FooterContentState;
  dispatch: React.Dispatch<FooterContentAction>;
  functions: {
    fetchAndSetReactPostPartial: () => Promise<void>;
  };
}
export const FooterContentContext =
  createContext<FooterContentContextValue | null>(null)

export const FooterContent = (props: FooterProps) => {
    const [state, dispatch] = useFooterContentReducer()

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
                type: "SET_POST_PARTIAL",
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

    const footerContentContextValue: FooterContentContextValue = useMemo(
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
        <FooterContentContext.Provider value={footerContentContextValue}>
            <div className="w-full">
                <CreatorAndStats post={props.post} />
                <Spacer y={6} />
                <Actions />
            </div>
        </FooterContentContext.Provider>
    )
}
