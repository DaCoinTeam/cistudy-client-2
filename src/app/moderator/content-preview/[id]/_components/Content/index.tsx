import React, { useContext } from "react"
import { SectionContentType } from "@common"
import { LessionContent } from "./LessonContent"
import { QuizContent } from "./QuizContent"
import { ResourceContent } from "./ResourceContent"
import { SectionContentPreviewContext } from "../../_hooks" 

interface ContentProps {
    className?: string
}

export const Content = ({ className }: ContentProps) => {
    const { swrs } = useContext(SectionContentPreviewContext)!
    const { sectionContentSwr } = swrs
    const { data : sectionContent } = sectionContentSwr
    const { type } = { ...sectionContent }

    const render = () => {
        if (!type) return null

        const map: Record<SectionContentType, JSX.Element> = {
            [SectionContentType.Lesson]: <LessionContent/>,
            [SectionContentType.Quiz]: <QuizContent/>,
            [SectionContentType.Resource]: <ResourceContent/>
        }

        return map[type]
    }

    return <div className={className}>{render()}</div>
}