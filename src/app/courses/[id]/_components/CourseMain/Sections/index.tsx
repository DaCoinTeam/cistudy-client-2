"use client"
import React, { useContext } from "react"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../_hooks"
import { InteractiveThumbnail } from "../../../../../_shared"
import { getAssetUrl } from "@services"

export const Sections = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }
    // const enableTempFix = false

    // const extractNumber = (title : string) => {
    //     const numberPart = title.slice(0, title.length).match(/\d+/)
    //     return numberPart ? Number(numberPart[0]) : 0
    // }

    // const sortSections = () => {
    //     sections?.sort((a, b) => {
    //         return extractNumber(a.title) - extractNumber(b.title)
    //     })
    // }

    // const sortLessons = () => {
    //     sections?.map(section => {
    //         section.lessons.sort((a, b) => {
    //             return Number(a.title.slice(7,10)) - Number(b.title.slice(7,10))    
    //         })
    //     })
    // }

    // enableTempFix? sortSections() : null
    // enableTempFix? sortLessons() : null

    return (
        <div>
            <div className="text-2xl font-bold">Sections</div>
            <Spacer y={4}/>
            <div className="border border-divider rounded-medium">
                <Accordion
                    itemClasses={{
                        heading: "!px-4 !py-0",
                        content: "flex flex-col gap-4 p-4",
                    }}
                    className="!p-0 gap-4"
                    selectionMode="multiple"
                >
                    {sections
                        ? sections.map(({ sectionId, title, lessons }) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg font-bold text-primary",
                                    subtitle: "font-semibold",
                                }}
                                aria-label="Sections"
                                subtitle={
                                    `${lessons.length} lessons`
                                }
                                title={title}
                            >
                                {lessons.map(({lessonId, title, description, thumbnailId}) => (
                                    <div key={lessonId} className="flex gap-3">
                                        <InteractiveThumbnail isPressable src={getAssetUrl(thumbnailId)} className="w-40 h-fit" />
                                        <div>
                                            <div className="font-bold text-primary">
                                                {title}
                                            </div>
                                            <div className="text-xs font-semibold text-foreground-400">
                                                15m
                                            </div>
                                            <div className="text-xs font-semibold text-foreground-400">
                                                {description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionItem>
                        ))
                        : []}
                </Accordion>
            </div>
        </div>
    )
}
