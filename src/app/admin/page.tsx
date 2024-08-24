"use client"
import React from "react"
import { ContentPanel, Sidebar } from "./_components"

const Page = () => {
    return (
        <div className="p-12 max-w-[1920px]  grid grid-cols-4 gap-12 mx-auto w-full">
            <Sidebar className="col-span-1 h-fit" />
            <ContentPanel className="col-span-3" />
            <div />
        </div>
    )
}

export default Page
