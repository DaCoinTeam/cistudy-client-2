import React, { useContext } from "react"
import {
    CompleteState,
    LessonEntity,
    LockState,
    QuizEntity,
    ResourceEntity,
    SectionContentEntity,
    SectionContentType,
    SectionEntity,
    parseDuration,
} from "@common"
import { useRouter } from "next/navigation"
import {
    Clock2Icon,
    FileQuestionIcon,
    PackageIcon,
    VideoIcon,
} from "lucide-react"
import { SectionContentPreviewContext } from "../../../_hooks" 
import { Spacer } from "@nextui-org/react"
import {
    CheckCircleIcon as SolidCheckCircleIcon,
    XCircleIcon as SolidXCircleIcon,
} from "@heroicons/react/24/solid"
import { LockClosedIcon } from "@heroicons/react/24/outline"

interface SectionContentItemProps {
  sectionContent: SectionContentEntity;
  section: SectionEntity;
}

const renderComplete = (lockState: LockState, completeState: CompleteState, base: JSX.Element) => {
    if (lockState === LockState.Locked) {
        return <LockClosedIcon className="w-6 h-6 text-primary"/>
    }

    const map: Record<CompleteState, JSX.Element> = {
        [CompleteState.Completed]: (
            <SolidCheckCircleIcon className="w-6 h-6 text-primary" />
        ),
        [CompleteState.Failed]: (
            <SolidXCircleIcon className="w-6 h-6 text-primary" />
        ),
        [CompleteState.Undone]: base,
    }
    return map[completeState]
}

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContent, section } = props
    const { sectionContentId } = sectionContent

    const { swrs } = useContext(SectionContentPreviewContext)!
    const { sectionContentSwr } = swrs
    const { data: currentSectionContent } = sectionContentSwr

    const differentFromThisSection =
    currentSectionContent?.sectionContentId !== sectionContentId

    const router = useRouter()
    const onPress = () =>
        section.lockState !== LockState.Locked && differentFromThisSection
            ? router.push(`/content/${sectionContentId}`)
            : undefined

    const renderLession = (
        { description, durationInSeconds }: LessonEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <VideoIcon className="w-6 h-6 text-primary" strokeWidth={3 / 2} />
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
                    <FileQuestionIcon
                        className="w-6 h-6 text-primary"
                        strokeWidth={3 / 2}
                    />
                </div>
                <div>
                    <div className="text-primary">
                        <span className="font-bold">Quiz:</span>
                        <span>{title}</span>
                    </div>
                </div>
            </>
        )
    }

    const renderResource = (
        resource: ResourceEntity,
        { title, completeState }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        section.lockState ?? LockState.InProgress,
                        completeState,
                        <PackageIcon
                            className="w-6 h-6 text-primary"
                            strokeWidth={3 / 2}
                        />
                    )}
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
        <div
            onClick={onPress}
            className={`cursor-pointer flex gap-3 p-3 px-4 z-10 ${
                !differentFromThisSection ? "bg-content3" : ""
            }`}
        >
            <div className="flex gap-3">{renderContent(sectionContent)}</div>
        </div>
    )
}
