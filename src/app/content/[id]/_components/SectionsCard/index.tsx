"use client"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Divider,
    ScrollShadow,
    Selection,
} from "@nextui-org/react"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { ContentDetailsContext } from "../../_hooks"
import { getSetValues, sortByPosition } from "@common"
import { SectionContentItem } from "./SectionContentItem"
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline"

interface SectionsCardProps {
  className?: string;
}

export const SectionsCard = (props: SectionsCardProps) => {
    const { className } = props

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContent } = sectionContentSwr

    const { section: thisSection } = { ...sectionContent }
    const { sectionId } = { ...thisSection }

    const { course } = { ...thisSection }
    const { sections } = { ...course }

    const [selectedKeys, setSelectedKeys] = useState<Selection>("all")

    const sortedSections = useMemo(
        () => sortByPosition(sections ?? []),
        [sections]
    )

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
        if (!sortedSections) return []
        return sortedSections.map((section) => (
            <AccordionItem
                key={section.sectionId}
                classNames={{
                    content: "flex flex-col pt-0 pb-2",
                    title: "font-bold text-primary",
                    subtitle: "font-semibold text-sm",
                    trigger: "!px-4",
                }}
                startContent={!section.unlocked ? <LockClosedIcon className="text-primary w-6 h-6"/> : <CheckCircleIcon className="w-6 h-6 text-primary"/>}
                title={section.title}
                subtitle={`${section.contents.length} contents`}
            >
                {section.contents.map((content) => (
                    <SectionContentItem
                        key={content.sectionContentId}
                        section={section}
                        sectionContent={content}
                    />
                ))}
            </AccordionItem>
        ))
    }

    return (
        <Card
            shadow="none"
            className={`${className} rounded-medium bg-transparent border border-divider`}
        >
            <CardHeader className="text-xl p-4 pb-4 font-bold"> Sections </CardHeader>
            <Divider />
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
