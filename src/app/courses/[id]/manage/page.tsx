"use client"
import React from "react"
import { Sidebar, ContentPanel } from "./_components"


const Page = () => {
    return (
        <div className="grid grid-cols-5 gap-6 px-12 my-12">
            <Sidebar className="col-span-1 max-h-screen"/>
            <ContentPanel className="col-span-4"/>
        </div>
    )
}

export default Page
