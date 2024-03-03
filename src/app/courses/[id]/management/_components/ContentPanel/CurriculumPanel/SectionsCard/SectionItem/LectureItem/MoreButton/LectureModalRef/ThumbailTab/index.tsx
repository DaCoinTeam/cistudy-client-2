import { Button, Spacer, Image } from "@nextui-org/react"
import { XIcon } from "lucide-react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { UploadButton } from "./UploadButton"
import { LectureItemContext } from "../../.."

export const ThumbnailTab = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { thumbnailId } = lecture

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
            <div className="gap-2 flex items-center flex-row-reverse">
                <UploadButton />
                <Button
                    variant="light"
                    startContent={<XIcon size={20} strokeWidth={4 / 3} />}
                >
          Delete
                </Button>
            </div>
        </div>
    )
}
