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
            className={`grid gap-2 grid-cols-12 gap-2 p-2 pr-4 items-center z-10 ${
                !differentFromThisLecture ? "bg-content3" : ""
            }`}
        >
            <div className="col-span-1">
                {
                    !differentFromThisLecture ? <PlayIcon height={20} width={20} /> : null
                }
            </div>
            
            <InteractiveThumbnail
                size={40}
                src={getAssetUrl(thumbnailId)}
                onPress={onPress}
                className="col-span-4"
            />
            <div className="col-span-7">
                <div>
                    <div className="truncate text-sm"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-500">
                        <ClockIcon strokeWidth={3 / 2} size={12} />
                        <div className="text-xs">15m</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
