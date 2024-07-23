import React, { useContext } from "react"
import { LessonEntity, QuizEntity, ResourceEntity, SectionContentEntity, SectionContentType, parseDuration } from "@common"
import { useRouter } from "next/navigation"
import { Clock2Icon, FileQuestionIcon, PackageIcon, VideoIcon } from "lucide-react"
import { ContentDetailsContext } from "../../../_hooks"
import { Spacer } from "@nextui-org/react"

interface SectionContentItemProps {
    sectionContent: SectionContentEntity;
}

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContent } = props
    const { sectionContentId } = sectionContent

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: currentSectionContent } = sectionContentSwr

    const differentFromThisSection = currentSectionContent?.sectionContentId !== sectionContentId

    const router = useRouter()
    const onPress = () => differentFromThisSection ? router.push(`/content/${sectionContentId}`) : undefined

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
        { }: QuizEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <FileQuestionIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
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
        <div onClick={onPress}
            className={`cursor-pointer flex gap-3 p-3 pr-4 z-10 ${!differentFromThisSection ? "bg-content2" : ""
            }`}
        >
            <div className="flex gap-3">
                {renderContent(sectionContent)}
            </div>
        </div>
    )
}
