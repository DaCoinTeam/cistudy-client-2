import { Button, Spacer } from "@nextui-org/react"
import { XIcon } from "lucide-react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { VideoPlayer } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"

export const VideoTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr

    return (
        <div>
            <VideoPlayer
                src={getAssetUrl(courseManagement?.previewVideoId)}
                className="w-full"
            />
            <Spacer y={6} />
            <div className="gap-2 flex items-center flex-row-reverse">
                <UploadButton />
                <Button
                    variant="light"
                    startContent={<XIcon size={20} strokeWidth={3/2} />}
                >
          Delete
                </Button>
            </div>
        </div>
    )
}
