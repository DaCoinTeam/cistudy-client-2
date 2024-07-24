import { Button, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { LessonItemContext } from "../../.."
import { VideoPlayer } from "../../../../../../../../../../../../_shared"
import { VideoType } from "@common"
import { TrashIcon } from "@heroicons/react/24/outline"

export const VideoTab = () => {
    const { props } = useContext(LessonItemContext)!
    const { lesson } = props
    const { videoType, lessonVideoId } = lesson

    return (
        <div>
            <VideoPlayer
                src={
                    videoType === VideoType.DASH
                        ? getAssetManifestUrl(lessonVideoId)
                        : getAssetUrl(lessonVideoId)
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
