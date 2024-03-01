import { Button, Spacer } from "@nextui-org/react"
import { XIcon } from "lucide-react"
import React, { useContext } from "react"
import { ManageContext } from "../../../../../_hooks"
import { VideoPlayer } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"

export const VideoTab = () => {
    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    return (
        <div>
            <VideoPlayer
                src={getAssetUrl(courseManaged?.previewVideoId)}
                className="w-full"
            />
            <Spacer y={6} />
            <div className="gap-2 flex items-center flex-row-reverse">
                <UploadButton />
                <Button
                    className="bg-content2"
                    startContent={<XIcon size={20} strokeWidth={4 / 3} />}
                >
          Remove
                </Button>
            </div>
        </div>
    )
}
