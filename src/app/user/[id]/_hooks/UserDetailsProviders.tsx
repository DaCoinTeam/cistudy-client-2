"use client"
import { ReactNode, createContext, useCallback, useEffect } from "react"
import React from "react"

import {
    UserDetailsAction,
    UserDetailsState,
    useUserDetailsReducer,
} from "./useUserDetails"
import { findOneUser } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface IUserDetailsContextProps {
  state: UserDetailsState;
  dispatch: React.Dispatch<UserDetailsAction>;
  functions: {
    fetchAndSetUser: () => Promise<void>;
  };
}

export const UserDetailsContext =
  createContext<IUserDetailsContextProps | null>(null)

export const UserDetailsProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useUserDetailsReducer()

    const params = useParams()
    const userId = params.id as string

    const fetchAndSetUser = useCallback(async () => {
        const response = await findOneUser(
            {
                userId,
            },
            {
                userId: true,
                email: true,
                avatarId: true,
                coverPhotoId: true
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

    return (
        <UserDetailsContext.Provider
            value={{
                state,
                dispatch,
                functions: {
                    fetchAndSetUser,
                },
            }}
        >
            {children}
        </UserDetailsContext.Provider>
    )
}
