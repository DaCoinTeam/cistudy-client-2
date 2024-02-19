"use client"
import React from "react"
import { Sidebar, ContentPanel } from "./_components"


const Page = () => {
    return (
        <div className="grid grid-cols-4 gap-6 px-12 m-auto my-12">
            <Sidebar className="col-span-1"/>
            <ContentPanel  className="col-span-3"/>
        </div>
    )
}

export default Page
