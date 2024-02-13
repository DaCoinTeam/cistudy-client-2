"use client"
import React from "react"
import { Sidebar } from "./Sidebar"
import { ContentPanel } from "./ContentPanel"


const Page = () => {
    return (
        <div className="grid grid-cols-4 gap-6">
            <Sidebar className="col-span-1"/>
            <ContentPanel  className="col-span-3"/>
        </div>
    )
}

export default Page
