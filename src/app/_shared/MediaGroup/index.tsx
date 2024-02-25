import React from "react"
import { AppendKey, FetchedMedia } from "@common"
import { MediaItem } from "./MediaItem"
import { MediaStack } from "./MediaStack"

interface MediaGroupProps {
  medias?: Array<AppendKey<FetchedMedia>>;
  className?: string;
}

export const MediaGroup = (props: MediaGroupProps) => {
    const { className, medias } = props

    const renderLessEqual4 = (medias: Array<AppendKey<FetchedMedia>>) => {
        return (
            <>
                {medias.map((media) => (
                    <MediaItem key={media.key} media={media} />
                ))}
            </>
        )
    }
    const renderGreater4 = (medias: Array<AppendKey<FetchedMedia>>) => {
        const items: Array<JSX.Element> = []

        const first3 = medias.filter((_, index) => index < 3)
        const exceptFirst3 = medias.filter((_, index) => index >= 3)

        items.push(
            ...first3.map((media) => <MediaItem key={media.key} media={media} />)
        )

        items.push(<MediaStack key="mediaStack" medias={exceptFirst3} />)
        return <>{items}</>
    }

    const renderContent = () => {
        if (!medias || !medias.length) return null
        return (
            <div className={className}>
                <div className="gap-3 grid grid-cols-4">
                    {medias.length <= 4
                        ? renderLessEqual4(medias)
                        : renderGreater4(medias)}
                </div>
            </div>
        )
    }

    return <> {renderContent()} </>
}
