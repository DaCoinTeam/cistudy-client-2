import React from "react"
import { AppendKey, FetchedMedia } from "@common"
import { MediaItem } from "./MediaItem"

interface MediaGroupProps {
  medias?: Array<AppendKey<FetchedMedia>>;
  className?: string;
}

export const MediaGroup = (props: MediaGroupProps) => {
    const { className, medias } = props

    const renderContents = () => {
        if (!medias?.length) return null
        return (
            <div className={className}>
                <div className="gap-2 grid grid-cols-4">
                    <>
                        {medias.map((media) => (
                            <MediaItem key={media.key} media={media} />
                        ))}
                    </>
                </div>
            </div>
        )
    }

    return <> {renderContents()} </>
}
