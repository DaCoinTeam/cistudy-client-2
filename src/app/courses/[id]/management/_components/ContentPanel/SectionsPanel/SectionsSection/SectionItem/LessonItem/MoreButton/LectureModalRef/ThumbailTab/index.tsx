import { Button, Spacer, Image } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { LessonItemContext } from "../../.."
import { TrashIcon } from "@heroicons/react/24/outline"

export const ThumbnailTab = () => {
    const { props } = useContext(LessonItemContext)!
    const { lesson } = props
    const { thumbnailId } = lesson

    return (
        <div>
            <Image
                classNames={{
                    wrapper:
            "w-full !max-w-full aspect-video grid content-center overflow-hidden",
                }}
                alt="thumbnail"
                src={getAssetUrl(thumbnailId)}
                className="w-full"
            />
            <Spacer y={6} />
            <div className="gap-2 flex items-center">
                <Button
                    startContent={<TrashIcon height={20} width={20} />}
                >
          Delete
                </Button>
                <UploadButton />
            </div>
        </div>
    )
}
