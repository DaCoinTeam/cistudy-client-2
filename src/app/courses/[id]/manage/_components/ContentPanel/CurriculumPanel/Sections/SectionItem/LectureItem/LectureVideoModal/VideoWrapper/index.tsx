import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { EditVideo } from "./EditVideo"
import { getAssetManifestUrl } from "@services"
import { VideoPlayer } from "../../../../../../../../../../../_shared"
import { LectureItemContext } from "../../index"
import { EditThumbnail } from "./EditThumbnail"

export const VideoWrapper = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props

    return (
        <div>
            <VideoPlayer src={getAssetManifestUrl(lecture.lectureVideoId)}/>
            <Spacer y={3} />
            <div className="ml-3 flex gap-4 items-center">
                <EditVideo />
                <EditThumbnail />
            </div>
        </div>
    )
}
