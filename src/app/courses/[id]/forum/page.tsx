"use client"
import { useContext } from "react"
import { ForumContext } from "./_hooks"

const Page = () => {
    const { state } = useContext(ForumContext)!
    return (<div> {JSON.stringify(state)} </div>)
}

export default Page