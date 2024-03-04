import { Button, Spacer, Image } from "@nextui-org/react"
import { XIcon } from "lucide-react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"

export const ThumbnailTab = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr

    return (
        <div>
            <Image
                classNames={{
                    wrapper:
            "w-full !max-w-full aspect-video grid content-center overflow-hidden",
                }}
                alt="thumbnail"
                src={getAssetUrl(courseManagement?.thumbnailId)}
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
