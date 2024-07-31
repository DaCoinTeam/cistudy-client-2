import React, { useContext } from "react"
import { DashVideoPlayerContext } from "../.."
import { Slider } from "@nextui-org/react"

export interface ProgressBarProps {
    preventSeek?: boolean;
}

export const ProgressBar = ({preventSeek } : ProgressBarProps) => {
    const { player, state, functions } = useContext(DashVideoPlayerContext)!
    const { playbackTime, duration } = state
    const { onPlay } = functions

    const onSeek = (value: number | Array<number>) => {
        const _value = value as number
        
        if (preventSeek) {
            if (_value > playbackTime) return
        }
        
        if (player === null) return null

        if (player.isPaused()) onPlay() 
        
        player.seek(_value)
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