import React from "react"
import { AppendKey, FetchedMedia } from "@common"
import { MediaItem } from "./MediaItem"
import { MediaStack } from "./MediaStack"
import { Skeleton } from "@nextui-org/react"

interface MediaGroupProps {
  medias?: Array<AppendKey<FetchedMedia>>;
}

export const MediaGroup = (props: MediaGroupProps) => {
    const { medias } = props

    const renderSkeleton = () => <Skeleton className="aspect-video" />

    const renderLessEqual4 = () => {
        if (!medias) return null
        return (
            <>
                {medias.map((media) => (
                    <MediaItem key={media.key} media={media} />
                ))}
            </>
        )
    }
    const renderGreater4 = () => {
        if (!medias) return null

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
        if (!medias) return null
        return medias.length <= 4 ? renderLessEqual4() : renderGreater4()
    }

    return (
        <div className="gap-4 grid grid-cols-4">
            {medias ? renderContent() : renderSkeleton()}
        </div>
    )
}
