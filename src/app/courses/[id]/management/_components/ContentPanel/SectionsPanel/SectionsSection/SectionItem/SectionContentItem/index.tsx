import React, { createContext, useMemo } from "react"
import { LessonEntity, QuizEntity, ResourceEntity, SectionContentEntity, SectionContentType, parseDuration } from "@common"
import { MoreButton } from "./MoreButton"
import { useRouter } from "next/navigation"
import { Spacer } from "@nextui-org/react"
import { VideoIcon, Clock2Icon, FileQuestionIcon, PackageIcon } from "lucide-react"

interface SectionContentItemProps {
  sectionContent: SectionContentEntity;
}

interface SectionContentItemContextValue {
  props: SectionContentItemProps;
}

export const SectionContentItemContext = createContext<SectionContentItemContextValue | null>(
    null
)

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContent } = props

    const sectionContextItemContextValue: SectionContentItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
    )

    const renderLession = (
        { description, durationInSeconds }: LessonEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <VideoIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="text-primary">
                        <span className="font-bold">Lesson: </span>
                        <span>{title}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Clock2Icon className="w-3 h-3" strokeWidth={3 / 2} />
                        <div className="text-xs">
                            {parseDuration(durationInSeconds ?? 0)}
                        </div>
                    </div>
                    <Spacer y={1} />

                    <div className="text-xs text-foreground-400">{description}</div>
                </div>
            </>
        )
    }

    const renderQuiz = (
        _: QuizEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <FileQuestionIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="text-primary">
                        <span className="font-bold">Quiz: </span>
                        <span>{title}</span>
                    </div>
                </div>
            </>
        )
    }

    const renderResource = (
        _: ResourceEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <PackageIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="text-primary">
                        <span className="font-bold">Resource: </span>
                        <span>{title}</span>
                    </div>
                </div>
            </>
        )
    }

    const renderContent = (content: SectionContentEntity) => {
        console.log(content)
        switch (content.type) {
        case SectionContentType.Lesson:
            return renderLession(content.lesson, content)
        case SectionContentType.Quiz:
            return renderQuiz(content.quiz, content)
        case SectionContentType.Resource:
            return renderResource(content.resource, content)
        }
    }
    
    return (
        <SectionContentItemContext.Provider value={sectionContextItemContextValue}>
            <div
                key={sectionContent.sectionContentId}
                className="flex gap-3"
            >
                {renderContent(sectionContent)}
            </div>
        </SectionContentItemContext.Provider>
    )
}
