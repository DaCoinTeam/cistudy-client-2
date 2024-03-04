import React, { useContext } from "react"
import { Mp4VideoPlayerContext } from "../.."
import { Link } from "@nextui-org/react"
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"

export const PlayAndPause = () => {
    const { state, functions } = useContext(Mp4VideoPlayerContext)!
    const { isPlay } = state
    const { onPlay, onPause } = functions

    return (
        <>
            {isPlay ? (
                <Link as="button" onPress={onPause}>
                    <PauseIcon className="w-6 h-6" />
                </Link>
            ) : (
                <Link as="button" onPress={onPlay}>
                    <PlayIcon className="w-6 h-6" />
                </Link>
            )}
        </>
    )
}