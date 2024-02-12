"use client"
import React, { useContext } from "react"
import { UserDetailsContext } from "./_hooks"

const Page = () => {
    const {state} = useContext(UserDetailsContext)!
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export default Page