"use client"
import {
    SpeakerWaveIcon,
    Cog6ToothIcon,
    PauseIcon,
    PlayIcon,
    SpeakerXMarkIcon,
} from "@heroicons/react/24/solid"
import {
    ChatBubbleBottomCenterTextIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline"
import {
    Slider,
    Link,
    Spacer,
    DropdownItem,
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import React, { useEffect, useRef } from "react"
import { useMp4VideoPlayerReducer } from "./useMp4VideoPlayerReducer"

interface Mp4VideoPlayerProps {
  className?: string;
  src: string;
}

export const Mp4VideoPlayer = (props: Mp4VideoPlayerProps) => {
    const playerRef = useRef<HTMLVideoElement | null>(null)
    
    useEffect(() => {
        const handleEffect = async () => {
            const player = playerRef.current
            if (player === null) return
            player.src = props.src

            // player.ontimeupdate = () => (event) => {
            //     dispatch({
            //         type: "SET_PLAYBACK_TIME",
            //         payload: Number(event.time),
            //     })
            //     if (event.timeToEnd === 0) onPause()
            // }
        }
        handleEffect()
    }, [])

    const [state, dispatch] = useMp4VideoPlayerReducer()
    const {
        isMuted,
        isPlay,
        volume,
        playbackTime,
        duration,
    } = state

    const onPlay = () => {
        const player = playerRef.current
        if (player === null) return
        player.play()
        dispatch({
            type: "SET_IS_PLAY",
            payload: true,
        })
    }

    const onPause = () => {
        const player = playerRef.current
        if (player === null) return
        player.pause()
        dispatch({
            type: "SET_IS_PLAY",
            payload: false,
        })
    }

    const onMute = () => {
        const player = playerRef.current
        if (player === null) return
        player.muted = true
        dispatch({
            type: "SET_IS_MUTED",
            payload: true,
        })
    }

    const onUnmute = () => {
        const player = playerRef.current
        if (player === null) return
        player.muted = false
        dispatch({
            type: "SET_IS_MUTED",
            payload: false,
        })
    }

    const onVolumeChange = (value: number | number[]) => {
        const _value = value as number
        const player = playerRef.current
        if (player === null) return

        player.volume = _value
        onUnmute()

        dispatch({
            type: "SET_VOLUME",
            payload: _value,
        })
    }

    const onSeek = (value: number | number[]) => {
        const _value = value as number
        const player = playerRef.current
        if (player === null) return

        if (player.paused) {
            onPlay()
        }

        player.currentTime = _value
        dispatch({
            type: "SET_PLAYBACK_TIME",
            payload: playbackTime,
        })
    }

    return (
        <div className="w-full aspect-video relative">
            <video className="absolute" ref={playerRef} aria-label="Playback"/>
            <div className="p-3 z-10 absolute bottom-0 w-full">
                <Slider
                    hideThumb
                    minValue={0}
                    step={0.01}
                    onChange={onSeek}
                    maxValue={duration}
                    value={playbackTime}
                />
                <Spacer y={2} />
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        {isPlay ? (
                            <Link as="button" onPress={onPause}>
                                <PauseIcon className="w-6 h-6" />
                            </Link>
                        ) : (
                            <Link as="button" onPress={onPlay}>
                                <PlayIcon className="w-6 h-6" />
                            </Link>
                        )}
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
                    </div>
                    <div className="flex gap-4 items-center">
                        <Dropdown placement="top-end">
                            <DropdownTrigger>
                                <Link as="button" onPress={onUnmute}>
                                    <Cog6ToothIcon className="w-6 h-6" />
                                </Link>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Settings">
                                <DropdownItem
                                    startContent={
                                        <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                                    }
                                    key="subtitle"
                                >
                  Subtitle
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<PlayCircleIcon className="w-6 h-6" />}
                                    key="playbackSpeed"
                                >
                  Playback speed
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
