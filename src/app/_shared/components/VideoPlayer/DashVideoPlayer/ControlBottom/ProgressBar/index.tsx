import React, { useContext } from "react"
import { DashVideoPlayerContext } from "../.."
import { Slider } from "@nextui-org/react"

export const ProgressBar = () => {
    const { player, state, dispatch, functions } = useContext(DashVideoPlayerContext)!
    const { playbackTime, duration } = state
    const { onPlay } = functions

    const onSeek = (value: number | Array<number>) => {
        const _value = value as number
        if (player === null) return null

        if (player.isPaused()) onPlay()

        player.seek(_value)
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