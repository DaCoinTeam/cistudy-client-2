"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"

import {
    UserDetailsAction,
    UserDetailsState,
    useUserDetailsReducer,
} from "./useUserDetails"
import { findOneUser } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface UserDetailsContextValue {
  state: UserDetailsState;
  dispatch: React.Dispatch<UserDetailsAction>;
  functions: {
    fetchAndSetUser: () => Promise<void>;
  };
}

export const UserDetailsContext =
  createContext<UserDetailsContextValue | null>(null)

export const UserDetailsProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useUserDetailsReducer()

    const params = useParams()
    const userId = params.id as string

    const fetchAndSetUser = useCallback(async () => {
        const response = await findOneUser(
            {
                userId,
                options: {
                    followerId: "8563a37f-17dc-4576-a0b8-a91bf3743e79"
                }
            },
            {
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                coverPhotoId: true,
                followed: true,
                numberOfFollowers: true
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_USER",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetUser()
        }
        handleEffect()
    }, [])

    const userDetailsContextValue: UserDetailsContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetUser,
            },
        }),
        [state, dispatch]
    )

    return (
        <UserDetailsContext.Provider value={userDetailsContextValue}>
            {children}
        </UserDetailsContext.Provider>
    )
}
