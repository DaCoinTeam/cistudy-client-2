import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"
import { isErrorResponse } from "@common"
import { findOnePost } from "@services"
import {
    FooterContentAction,
    FooterContentState,
    useFooterContentReducer,
} from "./useFooterContentReducer"

import { Spacer } from "@nextui-org/react"
import { Actions } from "./Actions"
import { CreatorAndStats } from "./CreatorAndStats"
import { PostCardPropsContext } from ".."

interface FooterContentContextValue {
  state: FooterContentState;
  dispatch: React.Dispatch<FooterContentAction>;
  functions: {
    fetchAndSetReactPostPartial: () => Promise<void>;
  };
}
export const FooterContentContext =
  createContext<FooterContentContextValue | null>(null)

export const FooterContent = () => {
    const [state, dispatch] = useFooterContentReducer()

    const { post } = useContext(PostCardPropsContext)!

    const fetchAndSetReactPostPartial = useCallback(async () => {
        const response = await findOnePost(
            {
                postId: post.postId,
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
                <CreatorAndStats post={post} />
                <Spacer y={6} />
                <Actions />
            </div>
        </FooterContentContext.Provider>
    )
}
