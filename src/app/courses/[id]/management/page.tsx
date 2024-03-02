"use client"
import React from "react"
import { Sidebar, ContentPanel } from "./_components"


const Page = () => {
    return (
        <div className="grid grid-cols-4 gap-6 p-6 max-w-[1280px] mx-auto flex w-full">
            <Sidebar className="col-span-1 h-fit"/>
            <ContentPanel className="col-span-3"/>
        </div>
    )
}

export default Page
