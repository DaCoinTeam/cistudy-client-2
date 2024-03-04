import { PlayCircleIcon } from "@heroicons/react/24/solid"
import { Button, Image } from "@nextui-org/react"
import React from "react"

interface VideoThumbnailProps {
  className?: string;
  src?: string;
  onPress?: () => void;
}

export const VideoThumbnail = (props: VideoThumbnailProps) => {
    const { src, className, onPress } = props
    return (
        <Button
            onPress={onPress}
            className={`${className ?? ""} h-fit p-0 relative aspect-video`}
        >
            <Image alt="thumbnail" src={src} className="w-full" />
            <div className="opacity-0 hover:opacity-100 transition-opacity z-10 grid place-items-center absolute top-0 left-0 w-full h-full bg-foreground-900/60">
                <PlayCircleIcon className="text-primary" height={60} width={60} />
            </div>
        </Button>
    )
}
