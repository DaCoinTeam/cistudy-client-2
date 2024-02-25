import React, { useContext } from "react"
import { Mp4VideoPlayerContext } from "../.."
import { Slider } from "@nextui-org/react"

export const ProgressBar = () => {
    const { player, state, dispatch, functions } = useContext(Mp4VideoPlayerContext)!
    const { playbackTime, duration } = state
    const { onPlay } = functions

    const onSeek = (value: number | Array<number>) => {
        const _value = value as number
        if (player === null) return null

        if (player.paused) onPlay()

        player.currentTime = _value
        dispatch({
            type: "SET_PLAYBACK_TIME",
            payload: playbackTime,
        })
    }

    return (
        <Slider
            hideThumb
            minValue={0}
            step={0.01}
            onChange={onSeek}
            maxValue={duration}
            value={playbackTime}
        />
    )
}