"use client"
import { ReactNode, createContext, useCallback, useEffect } from "react"
import React from "react"
import { ErrorResponse, UserEntity, generateClientId } from "@common"
import { init } from "@services"
import useSWR, { SWRResponse } from "swr"

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<UserEntity | null, ErrorResponse>;
  };
}

export const RootContext = createContext<RootContextValue | null>(null)

export const RootProviders = (props: { children: ReactNode }) => {
    const fetchProfile = useCallback(async () => {
        try {
            return await init({
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                coverPhotoId: true,
            })
        } catch (ex) {
            console.log(ex)
            return null
        }
    }, [])

    const profileSwr = useSWR(["FETCH_PROFILE"], fetchProfile)

    useEffect(() => {
        generateClientId()
    }, [])

    return (
        <RootContext.Provider
            value={{
                swrs: {
                    profileSwr,
                },
            }}
        >
            {props.children}
        </RootContext.Provider>
    )
}
