"use client"
import { ReactNode, createContext, useCallback, useEffect, useMemo } from "react"
import React from "react"
import { ErrorResponse, UserEntity, generateClientId } from "@common"
import { init } from "@services"
import useSWR, { SWRResponse } from "swr"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<UserEntity | null, ErrorResponse>;
  };
  reducer: [RootState, React.Dispatch<RootAction>];
}

export const RootContext = createContext<RootContextValue | null>(null)

export const RootProviders = (props: { children: ReactNode }) => {

    const reducer = useRootReducer()

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

    const profileSwr = useSWR(["PROFILE"], fetchProfile, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    useEffect(() => {
        generateClientId()
    }, [])

    const rootContextValue: RootContextValue = useMemo(() => ({
        swrs : {
            profileSwr
        },
        reducer
    }), [profileSwr, reducer])

    return (
        <RootContext.Provider
            value={rootContextValue}
        >
            {props.children}
        </RootContext.Provider>
    )
}
