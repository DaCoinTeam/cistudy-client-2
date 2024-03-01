import { Spacer } from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { VideoPlayer } from "../../../../../../../../../../../../../_shared"
import { LectureItemContext } from "../../../.."
import {
    EditThumbnailRef,
    EditThumbnailRefSelectors,
} from "./MoreButton/EditThumbnailRef"
import { VideoType } from "@common"
import { MoreButton } from "./MoreButton"
import { EditVideoButton } from "./EditVideoButton"
import { EyeIcon } from "lucide-react"

export const VideoWrapper = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureVideoId, videoType } = lecture

    const videoSource =
    videoType === VideoType.DASH
        ? getAssetManifestUrl(lectureVideoId)
        : getAssetUrl(lectureVideoId)

    const editThumbnailRef = useRef<EditThumbnailRefSelectors | null>(null)

    return (
        <>
            <div>
                <VideoPlayer src={videoSource} videoType={videoType} />
                <Spacer y={4} />
                <div className="flex justify-between gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <EyeIcon size={20} strokeWidth={4/3}/>
                        <div className="text-sm"> 123 Views</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <EditVideoButton className="w-full"/>
                        <MoreButton />
                    </div>
                </div>
            </div>
            <EditThumbnailRef ref={editThumbnailRef} />
        </>
    )
}
