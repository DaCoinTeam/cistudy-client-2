"use client"
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Divider, ScrollShadow, Selection } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { LectureDetailsContext } from "../../_hooks"
import { LectureItem } from "./LectureItem"
import { getSetValues } from "@common"

interface SectionsCardProps {
  className?: string;
}

export const SectionsCard = (props: SectionsCardProps) => {
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr

    const { section: thisSection } = { ...lecture }
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
        return sections.map(({ sectionId, title, lectures }) => (
            <AccordionItem
                key={sectionId}
                classNames={{
                    content: "flex flex-col pt-0 pb-2",
                    trigger: "!px-4"
                }}
                title={title}
                subtitle={`${lectures.length} lectures`}
            >
                {lectures.map((lecture) => (
                    <LectureItem key={lecture.lectureId} lecture={lecture} />
                ))}
            </AccordionItem>
        ))
    }

    return (
        <Card shadow="none" className={`${className} rounded-medium bg-transparent border border-divider`}>
            <CardHeader className="text-2xl p-4"> Sections </CardHeader>
            <Divider />
            <CardBody className="p-0">
                <ScrollShadow className="h-full">
                    <Accordion
                        showDivider={false}
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
