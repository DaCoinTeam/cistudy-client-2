import React, { createContext, useMemo } from "react"
import { LessonEntity, QuizEntity, ResourceEntity, SectionContentEntity, SectionContentType, VideoType, parseDuration } from "@common"
import { MoreButton } from "./MoreButton"
import { VideoIcon, Clock2Icon, FileQuestionIcon, PackageIcon, AirplayIcon, HelpCircleIcon, TrophyIcon, FlaskConicalIcon } from "lucide-react"
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
        { description, durationInSeconds, videoType, isTrial }: LessonEntity,
        { title, position }: SectionContentEntity
    ) => {
        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div>
                    <VideoIcon className="w-10 h-10 text-foreground-400" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <div>
                            <span className="font-semibold">{position}. Lesson: </span>
                            <span>{title}</span>
                        </div>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">{description}</div>
                    <Spacer y={1}/>
                    <div className="flex gap-2">
                        <Chip classNames={{
                            base: "gap-1 px-2",
                        }} size="sm" color="default" variant="flat" startContent={<Clock2Icon className="w-3 h-3" strokeWidth={3 / 2} />}>{parseDuration(durationInSeconds ?? 0)}</Chip>
                        {
                            (videoType === VideoType.DASH) ? <Chip variant="flat" size="sm" classNames={{
                                base: "gap-1 px-2"
                            }} startContent={<AirplayIcon className="w-3 h-3" strokeWidth={3 / 2} />}>Adaptive Bitrate Streaming</Chip> : null
                        }
                        {
                            (isTrial) ? <Chip variant="flat" size="sm" classNames={{
                                base: "gap-1 px-2"
                            }} startContent={<FlaskConicalIcon className="w-3 h-3" strokeWidth={3 / 2} />}>Trial</Chip> : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    const renderQuiz = (
        { description, passingPercent, questions }: QuizEntity,
        { title, position }: SectionContentEntity
    ) => {
        const totalPoints = questions?.reduce((acc, question) => acc + question.point, 0)

        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div className="flex gap-3 items-center">
                    <div>
                        <FileQuestionIcon className="w-10 h-10 text-foreground-400" strokeWidth={3 / 2} />
                    </div>
                    <div>
                        <div className={
                            (totalPoints !== 100 ? "text-danger" : "")
                        }>
                            <span className="font-semibold">{position}. Quiz: </span>
                            <span>{
                                totalPoints !== 100 ? `${title} (The total points for this quiz must be 100)` : title 
                            }</span>
                        </div>
                        <div className="text-xs text-foreground-400 line-clamp-1">{description}</div>
                        <Spacer y={1}/>
                        <div className="flex gap-2">
                            <Chip classNames={{
                                base: "gap-1 px-2",
                            }} size="sm" variant="flat" startContent={<TrophyIcon className="w-3 h-3" strokeWidth={3 / 2} />}>{passingPercent}% or higher</Chip>
                            <Chip classNames={{
                                base: "gap-1 px-2",
                            }} size="sm" variant="flat" startContent={<HelpCircleIcon className="w-3 h-3" strokeWidth={3 / 2} />}>{questions.length} question{questions.length > 1 ? "s" : ""}</Chip>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    const renderResource = (
        { description, attachments }: ResourceEntity,
        { title, position }: SectionContentEntity
    ) => {
        return (
            <div className="flex gap-3 items-center w-full">
                <MoreButton/>
                <div>
                    <PackageIcon className="w-10 h-10 text-foreground-400" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div>
                        <span className="font-semibold">{position}. Resource: </span>
                        <span>{title}</span>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">{description}</div>
                    <Spacer y={1}/>
                    <div className="flex gap-2">
                        <Chip classNames={{
                            base: "gap-1 px-2",
                        }} size="sm" variant="flat" startContent={<PaperClipIcon className="w-3 h-3" strokeWidth={3 / 2} />}>{attachments.length} attachments</Chip>
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
