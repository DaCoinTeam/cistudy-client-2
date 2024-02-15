"use client"
import { SectionEntity } from "@common"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Image,
    Spacer,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../_hooks"
import { ClockIcon } from "@heroicons/react/24/outline"
import { ResourcesModal } from "./ResourcesModal"
import { LectureVideoModal } from "./LectureVideoModal"
import { getAssetUrl } from "@services"
import { AddSectionItem } from "./AddSectionItem"
import { AddLectureItem } from "./AddLectureItem"

export const Sections = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const renderSections = (): Array<JSX.Element> => {
        if (!course) return []
        const { sections } = course
        const _sections = sections as Array<SectionEntity>

        return _sections.map((section) => (
            <AccordionItem
                key={section.sectionId}
                title={section.title}
                subtitle={"3 lesson"}
                classNames={
                    {   
                        title: "text-base",
                        content: "flex flex-col gap-3 py-3"
                    }
                }
            >
                {section.lectures.map((lecture) => (
                    <Card shadow="none" className="bg-content1" isPressable fullWidth key={lecture.sectionId}>
                        <CardBody>
                            <div className="justify-between flex items-center w-full">
                                <div className="flex gap-4 items-center">
                                    <Image
                                        className="h-12 aspect-video"
                                        alt={lecture.lectureId}
                                        src={getAssetUrl(lecture.thumbnailId)}
                                        fallbackSrc="https://via.placeholder.com/300x200"
                                    />
                                    <div>
                                        <div className="text-sm"> {lecture.title} </div>
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-3 h-3 text-foreground-500" />
                                            <div className="text-xs text-foreground-500">15 min </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <LectureVideoModal lecture={lecture} />
                                    <ResourcesModal lecture={lecture} />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
                <AddLectureItem sectionId={section.sectionId}/>
            </AccordionItem>
        ))
    }
    console.log("called")
    return (
        <div>
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                className="!px-0 gap-4"
                itemClasses={{
                    trigger: "!py-3",
                    base: "!shadow-none !bg-content2"
                }}
            >
                {renderSections()}
            </Accordion>
            <Spacer y={4}/>
            <AddSectionItem/>
        </div>
    )
}
