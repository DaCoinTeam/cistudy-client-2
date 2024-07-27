import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { VideoPlayer } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { VideoCameraIcon } from "@heroicons/react/24/outline"

export const VideoTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr

    return (
        <div>
            {
                courseManagement?.previewVideoId ? <VideoPlayer
                    src={getAssetUrl(courseManagement?.previewVideoId)}
                    className="w-full"
                /> : 
                    <div>
                        <VideoCameraIcon width={300} height={300} className="text-primary/20"/>
                        <Spacer y={4} />
                        <div className="text-sm text-foreground-400">No video.</div>
                    </div>
            }
            <Spacer y={6} />
        </div>
    )
}
