"use client"
import { useContext } from "react"
import { ForumContext } from "./_hooks"
import { MiddleLayout } from "./_components"

const Page = () => {
    const { state } = useContext(ForumContext)!
    return (
        <div> 
            <MiddleLayout/>
        </div>
    )
}

export default Page