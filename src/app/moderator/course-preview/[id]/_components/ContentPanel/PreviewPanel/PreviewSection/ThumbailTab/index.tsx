import { Spacer, Image } from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { getAssetUrl } from "@services"
import { PhotoIcon } from "@heroicons/react/24/outline"

export const ThumbnailTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr

    return (
        <div>
            {
                courseManagement?.thumbnailId ? <Image
                    classNames={{
                        wrapper:
            "w-full !max-w-full aspect-video grid content-center overflow-hidden",
                    }}
                    alt="thumbnail"
                    src={getAssetUrl(courseManagement?.thumbnailId)}
                    className="w-full"
                /> : 
                    <div>
                        <PhotoIcon width={300} height={300} className="text-primary/20"/>
                        <Spacer y={4} />
                        <div className="text-sm text-foreground-400">No thumbnail.</div>
                    </div>
               
            }
            <Spacer y={6} />
        </div>
    )
}
