"use client"
import React from "react"
import { Sidebar, ContentPanel } from "./_components"


const Page = () => {
    return (
        <div className="grid grid-cols-5 gap-6">
            <Sidebar className="col-span-1 -mt-16"/>
            <ContentPanel className="col-span-4 my-6 pr-6"/>
        </div>
    )
}

export default Page
