import { DashVideoPlayer } from "./DashVideoPlayer"
import { Mp4VideoPlayer } from "./Mp4VideoPlayer"

interface VideoPlayerProps {
  className?: string;
  src?: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const renderPlayer = () => {
        const _src = props.src as string
        const lastCharacters = _src.substring(_src.length - 12)
        const _props = {
            className: props.className,
            src: _src,
        }
        if (lastCharacters === "manifest.mpd")
            return <DashVideoPlayer {..._props} />
        return <Mp4VideoPlayer {..._props} />
    }

    return <>{props.src ? <>{renderPlayer()}</> : <div />}</>
}
