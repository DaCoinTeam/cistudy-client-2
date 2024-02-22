"use client"
import { ReactNode, createContext, useCallback, useEffect } from "react"
import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, setProfile } from "@redux"
import { generateClientId, isErrorResponse } from "@common"
import { init } from "@services"

interface RootContextValue {
    functions: {
        fetchAndSetProfile: () => Promise<void>
    }
}

export const RootContext = createContext<RootContextValue | null>(null)

export const RootProviders = (props: { children: ReactNode }) => {
    const dispath: AppDispatch = useDispatch()

    const fetchAndSetProfile = useCallback(async () => {
        const response = await init(
            {   
                userId: true,
                email: true,
                avatarId: true,
                coverPhotoId: true
            }
        )
        if (!isErrorResponse(response)) {
            dispath(setProfile(response))
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        generateClientId()
        const handleEffect = async () => {
            await fetchAndSetProfile()
        }
        handleEffect()
    }, [])

    return <RootContext.Provider value={{
        functions: {
            fetchAndSetProfile
        }
    }}>
        {props.children}
    </RootContext.Provider>
}
