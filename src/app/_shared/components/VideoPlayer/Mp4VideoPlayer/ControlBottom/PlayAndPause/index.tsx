import React, { useContext } from "react"
import { Mp4VideoPlayerContext } from "../.."
import { Link } from "@nextui-org/react"
import { HiPlay, HiPause } from "react-icons/hi2";

export const PlayAndPause = () => {
    const { state, functions } = useContext(Mp4VideoPlayerContext)!
    const { isPlay } = state
    const { onPlay, onPause } = functions

    return (
        <>
            {isPlay ? (
                <Link as="button" onPress={onPause}>
                    <HiPause className="w-6 h-6" />
                </Link>
            ) : (
                <Link as="button" onPress={onPlay}>
                    <HiPlay className="w-6 h-6" />
                </Link>
            )}
        </>
    )
}