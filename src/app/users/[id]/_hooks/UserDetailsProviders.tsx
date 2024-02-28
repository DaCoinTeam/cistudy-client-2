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
} from "./useUserDetailsReducer"
import { findOneUser } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"
import { useSelector } from "react-redux"
import { RootState } from "@redux"

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

    const profile = useSelector((state: RootState) => state.auth.profile)

    const fetchAndSetUser = useCallback(async () => {
        if (profile === null) return

        const response = await findOneUser(
            {
                userId,
                options: {
                    followerId: profile.userId
                }
            },
            {
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                coverPhotoId: true,
                followed: true,
                numberOfFollowers: true,
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
    }, [profile])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetUser()
        }
        handleEffect()
    }, [profile])

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
