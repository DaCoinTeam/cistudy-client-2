import React, { useContext } from "react"
import { DashVideoPlayerContext } from "../.."
import { parseDuration } from "@common"

export const Duration = () => {
    const { state } = useContext(DashVideoPlayerContext)!
    const { playbackTime, duration } = state

    return (
        <div className="text-primary text-sm">
            {parseDuration(playbackTime)} / {parseDuration(duration)}
        </div>
    )
}
