import { Button, Image } from "@nextui-org/react"
import React from "react"
import { PlayCircleIcon } from "@heroicons/react/24/solid"
interface InteractiveThumbnailProps {
  className?: string;
  src?: string;
  onPress?: () => void;
  size?: number;
  isPressable?: boolean
}

export const InteractiveThumbnail = (props: InteractiveThumbnailProps) => {
    const { src, className, onPress, size, isPressable } = props
    return (
        <>
            {
                isPressable ? 
                    (
                        <Button
                            onPress={onPress}
                            className={`${className ?? ""} p-0 relative aspect-video`}
                        >
                            <Image alt="thumbnail" src={src} className="w-full rounded-none" radius="md" />
                            <div className="opacity-0 hover:opacity-100 transition-opacity z-10 grid place-items-center absolute top-0 left-0 w-full h-full bg-foreground-900/60">
                                <PlayCircleIcon className="text-primary" height={size ?? 60} width={size ?? 60} />
                            </div>
                        </Button>
                    ) :
                    (
                        <div className={`${className ?? ""} p-0 relative aspect-video rounded-medium overflow-hidden`}>
                            <Image alt="thumbnail" src={src} className="w-full rounded-none" />
                            <div className="opacity-0 hover:opacity-100 transition-opacity z-10 grid place-items-center absolute top-0 left-0 w-full h-full bg-foreground-900/60">
                                <PlayCircleIcon className="text-primary" height={size ?? 60} width={size ?? 60} />
                            </div>
                        </div>   
                    )
            }
        </>
    )
}
