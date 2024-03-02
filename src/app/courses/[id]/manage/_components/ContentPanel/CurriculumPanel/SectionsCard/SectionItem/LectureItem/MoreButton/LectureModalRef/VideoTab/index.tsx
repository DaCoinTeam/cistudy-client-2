import { Button, Spacer } from "@nextui-org/react"
import { XIcon } from "lucide-react"
import React, { useContext } from "react"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { LectureItemContext } from "../../.."
import { VideoPlayer } from "../../../../../../../../../../../../_shared"
import { VideoType } from "@common"

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
            <div className="gap-2 flex items-center flex-row-reverse">
                <UploadButton />
                <Button
                    variant="bordered"
                    className="border"
                    startContent={<XIcon size={20} strokeWidth={4 / 3} />}
                >
          Delete
                </Button>
            </div>
        </div>
    )
}
