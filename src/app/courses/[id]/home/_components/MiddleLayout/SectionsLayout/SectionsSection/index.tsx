"use client"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { useContext, useMemo } from "react"
import { HomeContext } from "../../../../_hooks"
import { LessonItem } from "./LessonItem"
import { sortSections } from "@common"

interface SectionsSectionProps {
  className?: string;
}

export const SectionsSection = (props: SectionsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const { sections } = { ...courseHome }

    const sortedSections = useMemo(() => sortSections(sections), [sections])

    const renderSections = () => {
        if (!sortedSections) return []
        return sortedSections.map(({ sectionId, title, lessons }) => (
            <AccordionItem
                key={sectionId}
                classNames={{
                    content: "flex flex-col gap-4 py-4",
                    title: "text-lg font-bold text-primary",
                    subtitle: "font-semibold",
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
        <div className={`${className}`}>
            <div className='border border-divider rounded-medium'>
                <Accordion
                    selectionMode='multiple'
                    variant='light'
                    className='!px-0'
                    itemClasses={{
                        base: "!shadow-none gap-4 px-4",
                    }}
                >
                    {renderSections()}
                </Accordion>
            </div>
        </div>
    )
}
