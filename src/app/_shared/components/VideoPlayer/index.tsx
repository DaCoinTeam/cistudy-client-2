import { VideoType } from "@common"
import { DashVideoPlayer } from "./DashVideoPlayer"
import { Mp4VideoPlayer } from "./Mp4VideoPlayer"

interface VideoPlayerProps {
  className?: string;
  src?: string;
  videoType?: VideoType;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const { src, className, videoType: videoTypeProps } = props
    const videoType = videoTypeProps ?? VideoType.MP4

    if (!src) return null

    const renderPlayer = () => {
        const videoTypeToPlayer: Record<VideoType, JSX.Element> = {
            mp4: <Mp4VideoPlayer src={src} className={className} />,
            dash: <DashVideoPlayer src={src} className={className} />,
        }
        return (videoTypeToPlayer[videoType])
    }

    return <>{renderPlayer()}</>
}
