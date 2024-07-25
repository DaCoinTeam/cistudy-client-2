import React, { createContext, useMemo } from "react"
import { LessonEntity, QuizEntity, ResourceEntity, SectionContentEntity, SectionContentType, VideoType, parseDuration } from "@common"
import { MoreButton } from "./MoreButton"
import { VideoIcon, Clock2Icon, FileQuestionIcon, PackageIcon, AirplayIcon } from "lucide-react"
import { Chip, Spacer } from "@nextui-org/react"
import { PaperClipIcon } from "@heroicons/react/24/outline"

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
        { description, durationInSeconds, videoType }: LessonEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div>
                    <VideoIcon className="w-10 h-10 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <div className="text-primary">
                            <span className="font-semibold">Lesson: </span>
                            <span>{title}</span>
                        </div>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">{description}</div>
                    <Spacer y={1}/>
                    <div className="flex gap-2">
                        <Chip classNames={{
                            base: "gap-1 px-2",
                        }} size="sm" startContent={<Clock2Icon className="w-3 h-3" strokeWidth={3 / 2} />}>{parseDuration(durationInSeconds ?? 0)}</Chip>
                        {
                            (videoType === VideoType.DASH) ? <Chip size="sm" classNames={{
                                base: "gap-1 px-2"
                            }} startContent={<AirplayIcon className="w-3 h-3" strokeWidth={3 / 2} />}>Adaptive Bitrate Streaming</Chip> : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    const renderQuiz = (
        _: QuizEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div className="flex gap-3 items-center">
                    <div>
                        <FileQuestionIcon className="w-10 h-10 text-primary" strokeWidth={3 / 2} />
                    </div>
                    <div>
                        <div className="text-primary">
                            <span className="font-semibold">Quiz: </span>
                            <span>{title}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderResource = (
        { description, attachments }: ResourceEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div>
                    <PackageIcon className="w-10 h-10 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="text-primary">
                        <span className="font-semibold">Resource: </span>
                        <span>{title}</span>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">{description}</div>
                    <Spacer y={1}/>
                    <div className="flex gap-2">
                        <Chip classNames={{
                            base: "gap-1 px-2",
                        }} size="sm" startContent={<PaperClipIcon className="w-3 h-3" strokeWidth={3 / 2} />}>{attachments.length} attachments</Chip>
                    </div>
                </div>
            </div>
        )
    }

    const renderContent = (content: SectionContentEntity) => {
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
