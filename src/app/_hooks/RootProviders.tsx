"use client"
import { ReactNode, useEffect } from "react"
import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, setUser } from "@redux"
import { generateClientId, init, isErrorResponse } from "@services"

export const RootProviders = (props: { children: ReactNode }) => {
    const dispath: AppDispatch = useDispatch()
    useEffect(() => {
        generateClientId()
        const handleEffect = async () => {
            const response = await init()
            if (!isErrorResponse(response)) {
                dispath(setUser(response))
            } else {
                console.log(response)
            }
        }
        handleEffect()
    }, [])

    return <>{props.children}</>
}
