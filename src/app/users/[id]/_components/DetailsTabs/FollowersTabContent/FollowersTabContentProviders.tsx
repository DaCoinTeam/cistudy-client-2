"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"

import {
    FollowersTabContentAction,
    FollowersTabContentState,
    useFollowersTabContentReducer,
} from "./useFollowersTabContentReducer"
import { findManyFollowers } from "@services"
import { isErrorResponse } from "@common"
import { UserDetailsContext } from "../../../_hooks"

export interface FollowersTabContentContextValue {
  state: FollowersTabContentState;
  dispatch: React.Dispatch<FollowersTabContentAction>;
  functions: {
    fetchAndSetFollowers: () => Promise<void>;
  };
}

export const FollowersTabContentContext =
  createContext<FollowersTabContentContextValue | null>(null)

export const FollowersTabContentProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useFollowersTabContentReducer()

    const { state: userDetailsState } = useContext(UserDetailsContext)!
    const { user } = userDetailsState

    const fetchAndSetFollowers = useCallback(async () => {
        if (user === null) return
        const { userId } = user

        const response = await findManyFollowers(
            {
                userId,
            },
            {
                userId: true,
                username: true,
                avatarId: true,
                coverPhotoId: true,
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_FOLLOWERS",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [user])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetFollowers()
        }
        handleEffect()
    }, [user])

    const followersTabContentContextValue: FollowersTabContentContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetFollowers,
            },
        }),
        [state, dispatch]
    )

    return (
        <FollowersTabContentContext.Provider value={followersTabContentContextValue}>
            {children}
        </FollowersTabContentContext.Provider>
    )
}
