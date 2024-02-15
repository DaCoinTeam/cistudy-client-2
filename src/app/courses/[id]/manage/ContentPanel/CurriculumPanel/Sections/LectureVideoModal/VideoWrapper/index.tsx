import { Spacer } from "@nextui-org/react"
import NextVideo from "next-video"
import React, { useContext } from "react"
import { EditVideo } from "./EditVideo"
import { EditThumbnail } from "./EditThumbnail"
import { LectureVideoModalPropsContext } from ".."
import { getAssetUrl } from "@services"
export const VideoWrapper = () => {
    const { lecture } = useContext(LectureVideoModalPropsContext)!
    const { thumbnailId, lectureVideoId } = lecture

    return (
        <div>
            <NextVideo
                className="rounded-large overflow-hidden"
                src={getAssetUrl(lectureVideoId)}
                poster={getAssetUrl(thumbnailId)}
            />
            <Spacer y={3} />
            <div className="ml-3 flex gap-4 items-center">
                <EditVideo />
                <EditThumbnail />
            </div>
        </div>
    )
}
