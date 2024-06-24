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

    return (
        <div>
            <div className="text-2xl">Sections</div>
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
                                            <div>
                                                {title}
                                            </div>
                                            <div className="text-xs text-foreground-400">
                                                15m
                                            </div>
                                            <div className="text-xs text-foreground-400">
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
