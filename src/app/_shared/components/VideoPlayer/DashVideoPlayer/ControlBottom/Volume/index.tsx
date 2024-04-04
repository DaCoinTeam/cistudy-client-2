import React, { useContext } from "react"
import { DashVideoPlayerContext } from "../.."
import { Link, Slider } from "@nextui-org/react"
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid"

export const Volume = () => {
    const { player, state, dispatch } = useContext(DashVideoPlayerContext)!
    const { isMuted, volume } = state

    const onMute = () => {
        if (player === null) return
        player.setMute(true)
        dispatch({
            type: "SET_IS_MUTED",
            payload: true,
        })
    }

    const onUnmute = () => {
        if (player === null) return
        player.setMute(false)
        dispatch({
            type: "SET_IS_MUTED",
            payload: false,
        })
    }

    const onVolumeChange = (value: number | number[]) => {
        const _value = value as number
        if (player === null) return

        player.setVolume(_value)
        onUnmute()

        dispatch({
            type: "SET_VOLUME",
            payload: _value,
        })
    }

    return (
        <div className="items-center flex gap-2">
            {isMuted ? (
                <Link as="button" onPress={onUnmute}>
                    <SpeakerXMarkIcon className="w-6 h-6" />
                </Link>
            ) : (
                <Link as="button" onPress={onMute}>
                    <SpeakerWaveIcon className="w-6 h-6" />
                </Link>
            )}
            <Slider
                className="w-28"
                size="sm"
                minValue={0}
                maxValue={1}
                value={isMuted ? 0 : volume}
                step={0.01}
                onChange={onVolumeChange}
            />
        </div>
    )
}