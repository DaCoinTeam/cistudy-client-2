"use client"
import { useContext } from "react"
import { ForumContext } from "./_hooks"
import { MiddleLayout } from "./_components"

const Page = () => {
    const { state } = useContext(ForumContext)!
    return (
        <div className="my-12">
            <div className="grid grid-cols-4">
                <div />
                <MiddleLayout className="col-span-2" />
            </div>
        </div>
    )
}

export default Page
