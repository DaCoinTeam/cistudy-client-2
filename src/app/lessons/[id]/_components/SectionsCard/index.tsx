"use client"
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Divider, ScrollShadow, Selection } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { LessonDetailsContext } from "../../_hooks"
import { getSetValues } from "@common"
import { LessonItem } from "./LessonItem"

interface SectionsCardProps {
  className?: string;
}

export const SectionsCard = (props: SectionsCardProps) => {
    const { className } = props

    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { data: lesson } = lessonsSwr

    const { section: thisSection } = { ...lesson }
    const { sectionId } = { ...thisSection }

    const { course } = { ...thisSection }
    const { sections } = { ...course }

    const [selectedKeys, setSelectedKeys] = useState<Selection>("all")

    useEffect(() => {
        if (!sectionId) return
        setSelectedKeys(new Set([sectionId]))
    }, [sectionId])

    const onSelectionChange = (selection: Selection) => {
        if (!sectionId) return
        if (selection === "all") {
            setSelectedKeys("all")
            return
        }

        const values = getSetValues(selection)
        const hasValue = values.includes(sectionId)
        if (!hasValue) values.push(sectionId)

        setSelectedKeys(new Set(values))
    }

    const renderSections = () => {
        if (!sections) return []
        return sections.map(({ sectionId, title, lessons }) => (
            <AccordionItem
                key={sectionId}
                classNames={{
                    content: "flex flex-col pt-0 pb-2",
                    title: "font-bold text-primary",
                    subtitle: "font-semibold text-sm",
                    trigger: "!px-4"
                }}
                title={title}
                subtitle={`${lessons.length} lessons`}
            >
                {lessons.map((lesson) => (
                    <LessonItem key={lesson.lessonId} lesson={lesson} />
                ))}
            </AccordionItem>
        ))
    }

    return (
        <Card shadow="none" className={`${className} rounded-medium bg-transparent border border-divider`}>
            <CardHeader className="text-xl p-4 pb-4 font-bold"> Sections </CardHeader>
            <Divider/>
            <CardBody className="p-0">
                <ScrollShadow className="h-full">
                    <Accordion
                        selectedKeys={selectedKeys}
                        onSelectionChange={onSelectionChange}
                        selectionMode="multiple"
                        className="!p-0"
                        itemClasses={{
                            base: "!p-0",
                        }}
                    >
                        {renderSections()}
                    </Accordion>
                </ScrollShadow>   
            </CardBody>
        </Card>
    )
}
