"use client"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { useContext, useMemo } from "react"
import { HomeContext } from "../../../../_hooks"
import { LessonEntity, parseDuration, QuizEntity, ResourceEntity, SectionContentEntity, SectionContentType, sortByPosition } from "@common"
import { Clock2Icon, FileQuestionIcon, PackageIcon, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const SectionsSection = () => {
    const router = useRouter()
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const { sections } = { ...courseHome }

    const sortedSections = useMemo(() => sortByPosition(sections ?? []), [sections])

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
        { }: QuizEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <FileQuestionIcon className="w-6 h-6 text-primary" strokeWidth={3 / 2} />
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
        resource: ResourceEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <PackageIcon className="w-6 h-6 text-primary" strokeWidth={3 / 2} />
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
        <div>
            <Spacer y={4} />
            <div className="border border-divider rounded-medium">
                <Accordion
                    itemClasses={{
                        heading: "!px-4 !py-0",
                        content: "flex flex-col gap-4 p-4",
                    }}
                    className="!p-0 gap-4"
                    selectionMode="multiple"
                >
                    {sortedSections
                        ? sortedSections.map(({ sectionId, contents, title }, index) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg font-bold text-primary",
                                    subtitle: "font-semibold",
                                }}
                                aria-label="Sections"
                                subtitle={`${contents.length} contents`}
                                title={`Section ${index+1}: ${title}`}
                            >
                                {sortByPosition(contents).map((sectionContent: SectionContentEntity) => (
                                    <div
                                        key={sectionContent.sectionContentId}
                                        className="flex gap-3 cursor-pointer"
                                        onClick={() => {
                                            router.push(`/content/${sectionContent.sectionContentId}`)
                                        }}
                                    >
                                        {renderContent(sectionContent)}
                                    </div>
                                ))}
                            </AccordionItem>
                        ))
                        : []}
                </Accordion>
            </div>
        </div>
    )
}
