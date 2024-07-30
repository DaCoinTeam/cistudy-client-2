import { VideoType } from "@common"
import { DashVideoPlayer } from "./DashVideoPlayer"
import { Mp4VideoPlayer } from "./Mp4VideoPlayer"

interface VideoPlayerProps {
  className?: string;
  src?: string;
  videoType?: VideoType;
  triggerOnFinish?: boolean;
  onFinish?: () => void;
  preventSeek?: boolean;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const {
        src,
        className,
        videoType: videoTypeProps,
        triggerOnFinish,
        onFinish,
        preventSeek,
    } = props
    const videoType = videoTypeProps ?? VideoType.MP4

    if (!src) return null

    const renderPlayer = () => {
        const videoTypeToPlayer: Record<VideoType, JSX.Element> = {
            mp4: (
                <Mp4VideoPlayer
                    src={src}
                    className={className}
                    triggerOnFinish={triggerOnFinish}
                    onFinish={onFinish}
                    preventSeek={preventSeek}
                />
            ),
            dash: (
                <DashVideoPlayer
                    src={src}
                    className={className}
                    triggerOnFinish={triggerOnFinish}
                    onFinish={onFinish}
                    preventSeek={preventSeek}
                />
            ),
        }
        return videoTypeToPlayer[videoType]
    }

    return <>{renderPlayer()}</>
}
