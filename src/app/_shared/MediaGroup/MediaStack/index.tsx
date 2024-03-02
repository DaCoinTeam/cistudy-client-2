import { AppendKey, FetchedMedia } from "@common"
import { Button } from "@nextui-org/react"
import React from "react"

interface MediaStackProps {
    medias: Array<AppendKey<FetchedMedia>>
}

export const MediaStack = (props: MediaStackProps) => {
    const { medias } = props
    return (
        <Button className="h-full video-aspect rounded-large bg-content4 grid place-items-center">
            <div className="text-xl font-semibold">
                +{
                    medias.length
                }
            </div>
        </Button>
    )
}