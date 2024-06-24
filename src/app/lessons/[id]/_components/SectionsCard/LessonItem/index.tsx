import React, { useContext } from "react"
import { LessonEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../_shared"
import { getAssetUrl } from "../../../../../../services/server"
import { useRouter } from "next/navigation"
import { ClockIcon } from "lucide-react"
import { LessonDetailsContext } from "../../../_hooks"
import { HiPlay } from "react-icons/hi";

interface LessonItemProps {
  lesson: LessonEntity;
}

export const LessonItem = (props: LessonItemProps) => {
    const { lesson } = props
    const { lessonId, title, thumbnailId } = lesson

    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { data: currentLesson } = lessonsSwr
    
    const differentFromThisLesson = currentLesson?.lessonId !== lessonId

    const router = useRouter()
    const onPress = () => differentFromThisLesson ? router.push(`/lessons/${lessonId}`) : undefined

    return (
        <div
            className={`flex gap-3 p-3 pr-4 items-center z-10 ${
                !differentFromThisLesson ? "bg-content2" : ""
            }`}
        >
            <HiPlay height={20} width={20} className={`${!differentFromThisLesson ? "opacity-100" : "opacity-0"}`} />  
            <div className="flex gap-3">
                <InteractiveThumbnail
                    isPressable
                    src={getAssetUrl(thumbnailId)}
                    onPress={onPress}
                    className="w-28 h-fit"
                />
                <div>
                    <div className="truncate text-sm"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-400">
                        <ClockIcon strokeWidth={3 / 2} size={12} />
                        <div className="text-xs">15m</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}
