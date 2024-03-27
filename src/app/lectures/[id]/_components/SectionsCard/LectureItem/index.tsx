import React, { useContext } from "react"
import { LectureEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../_shared"
import { getAssetUrl } from "../../../../../../services/server"
import { useRouter } from "next/navigation"
import { ClockIcon } from "lucide-react"
import { PlayIcon } from "@heroicons/react/24/solid"
import { LectureDetailsContext } from "../../../_hooks"

interface LectureItemProps {
  lecture: LectureEntity;
}

export const LectureItem = (props: LectureItemProps) => {
    const { lecture } = props
    const { lectureId, title, thumbnailId } = lecture

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: currentLecture } = lecturesSwr
    
    const differentFromThisLecture = currentLecture?.lectureId !== lectureId

    const router = useRouter()
    const onPress = () => differentFromThisLecture ? router.push(`/lectures/${lectureId}`) : undefined

    return (
        <div
            className={`flex gap-3 p-3 pr-4 items-center z-10 ${
                !differentFromThisLecture ? "bg-content2" : ""
            }`}
        >
            <PlayIcon height={20} width={20} className={`${!differentFromThisLecture ? "opacity-100" : "opacity-0"}`} />  
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
