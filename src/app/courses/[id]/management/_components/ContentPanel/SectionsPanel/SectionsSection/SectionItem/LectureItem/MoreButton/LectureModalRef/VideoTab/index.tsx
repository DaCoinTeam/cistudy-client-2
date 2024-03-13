import { Button, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { LectureItemContext } from "../../.."
import { VideoPlayer } from "../../../../../../../../../../../../_shared"
import { VideoType } from "@common"
import { TrashIcon } from "@heroicons/react/24/outline"

export const VideoTab = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { videoType, lectureVideoId } = lecture

    return (
        <div>
            <VideoPlayer
                src={
                    videoType === VideoType.DASH
                        ? getAssetManifestUrl(lectureVideoId)
                        : getAssetUrl(lectureVideoId)
                }
                videoType={videoType}
                className="w-full"
            />
            <Spacer y={6} />
            <div className="gap-2 flex items-center">
                <Button
                    startContent={<TrashIcon width={20} height={20} />}
                >
          Delete
                </Button>
                <UploadButton />
            </div>
        </div>
    )
}
