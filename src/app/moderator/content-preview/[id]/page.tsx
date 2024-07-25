"use client"
import React, { useContext } from "react"
import { Content, LessonSkeleton, SectionsCard } from "./_components"
import { SectionContentPreviewContext } from "./_hooks"

const Page = () => {
    const { swrs } = useContext(SectionContentPreviewContext)!
    const { sectionContentSwr } = swrs
    const { isLoading } = sectionContentSwr

    return (
        <div>
            {!sectionContentSwr.data || isLoading ? <LessonSkeleton /> : (
                <div className="grid grid-cols-7 max-w-[1920px] gap-12 p-12 mx-auto">
                    <SectionsCard className="col-span-2 h-fit" />
                    <Content className="col-span-5" />
                </div>
            )}
        </div>
    )
}

export default Page