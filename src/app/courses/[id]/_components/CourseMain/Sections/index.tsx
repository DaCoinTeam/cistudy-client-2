"use client"
import React, { useContext, useMemo } from "react"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../_hooks"
import { InteractiveThumbnail } from "../../../../../_shared"
import { getAssetUrl } from "@services"
import { sortSections } from "@common"

export const Sections = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }

    const sortedSections = useMemo(() => sortSections(sections), [sections])

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
                    {sortedSections
                        ? sortedSections.map(({ sectionId, title, lessons }) => (
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
