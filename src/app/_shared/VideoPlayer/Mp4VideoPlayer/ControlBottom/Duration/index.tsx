import React, { useContext } from "react"
import { Mp4VideoPlayerContext } from "../.."
import { parseDuration } from "@common"

export const Duration = () => {
    const { state } = useContext(Mp4VideoPlayerContext)!
    const { playbackTime, duration } = state

    return (
        <div className="text-primary text-sm">
            {parseDuration(playbackTime)} / {parseDuration(duration)}
        </div>
    )
}
