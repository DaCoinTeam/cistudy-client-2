import React, { useContext } from "react"
import { LessonEntity, SectionContentEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../_shared"
import { getAssetUrl } from "../../../../../../services/server"
import { useRouter } from "next/navigation"
import { ClockIcon } from "lucide-react"
import { ContentDetailsContext } from "../../../_hooks"
import { HiPlay } from "react-icons/hi"

interface SectionContentItemProps {
    sectionContent: SectionContentEntity;
}

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContent } = props
    const { lesson, quiz, resource, position, sectionContentId } = sectionContent

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: currentSectionContent } = sectionContentSwr

    const differentFromThisLesson = currentSectionContent?.sectionContentId !== sectionContentId

    const router = useRouter()
    //const onPress = () => differentFromThisLesson ? router.push(`/lessons/${lessonId}`) : undefined

    return (
        <div
            className={`flex gap-3 p-3 pr-4 items-center z-10 ${!differentFromThisLesson ? "bg-content2" : ""
            }`}
        >
            <HiPlay height={20} width={20} className={`${!differentFromThisLesson ? "opacity-100" : "opacity-0"}`} />
            <div className="flex gap-3">
                {/* <InteractiveThumbnail
                    isPressable
                    src={getAssetUrl(thumbnailId)}
                    onPress={onPress}
                    className="w-28 h-fit"
                />
                <div>
                    <div className="truncate text-sm font-bold text-primary"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-400">
                        <ClockIcon strokeWidth={3 / 2} size={12} />
                        <div className="text-xs font-semibold">15m</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
