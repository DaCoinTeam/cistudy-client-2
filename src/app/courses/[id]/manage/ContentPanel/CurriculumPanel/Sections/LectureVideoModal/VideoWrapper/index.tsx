import { Spacer } from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { EditVideo } from "./EditVideo"
import { EditThumbnail } from "./EditThumbnail"
import { LectureVideoModalPropsContext } from "../index"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { DashVideoPlayer } from "../../../../../../../../_shared"

export const VideoWrapper = () => {
    const { lecture } = useContext(LectureVideoModalPropsContext)!
    const { thumbnailId, lectureVideoId } = lecture

    return (
        <div>
            <DashVideoPlayer src={getAssetManifestUrl(lectureVideoId)}/>
            <Spacer y={3} />
            <div className="ml-3 flex gap-4 items-center">
                <EditVideo />
                <EditThumbnail />
            </div>
        </div>
    )
}
