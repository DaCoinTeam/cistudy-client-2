"use client"
import { ReactNode, useEffect } from "react"
import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, setUser } from "@redux"
import { generateClientId, isErrorResponse } from "@common"

export const RootProviders = (props: { children: ReactNode }) => {
    const dispath: AppDispatch = useDispatch()
    
    useEffect(() => {
        generateClientId()
        const handleEffect = async () => {
            const response = await findPr()
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
