import { Button, Spacer, Image } from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../../_hooks"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { TrashIcon } from "@heroicons/react/24/outline"

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
            <Spacer y={4} />
            <div className="gap-2 flex items-center">
                <Button
                    variant="light"
                    startContent={<TrashIcon height={20} width={20} />}
                >
          Delete
                </Button>
                <UploadButton />
            </div>
        </div>
    )
}
