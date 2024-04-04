import { Image } from "@nextui-org/react"
import React from "react"
import { AppendKey, FetchedMedia, MediaType } from "@common"
import { getAssetUrl } from "@services"

interface MediaItemProps {
    media: AppendKey<FetchedMedia>
}

export const MediaItem = (props: MediaItemProps) => {
    const { media } = props
    const { mediaType, mediaId } = media
    return (
        <>
            {
                mediaType == MediaType.Image ? 
                    (
                        <Image
                            classNames={{
                                wrapper:
        "w-full !max-w-full aspect-video grid content-center overflow-hidden",
                            }}
                            alt="preview"
                            src={getAssetUrl(mediaId)}
                            className="w-full rounded-medium"
                        />
                    )
                    : <div/>
            }
        </>
    )
}