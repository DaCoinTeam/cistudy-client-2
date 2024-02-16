"use client"
import {
    SpeakerWaveIcon,
    Cog6ToothIcon,
    PauseIcon,
    PlayIcon,
    SpeakerXMarkIcon,
} from "@heroicons/react/24/solid"
import {
    AdjustmentsHorizontalIcon,
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
    Tooltip,
    Listbox,
    ListboxItem,
} from "@nextui-org/react"
import React, { useEffect, useRef } from "react"
import { useDashVideoPlayerReducer } from "./useDashVideoPlayerReducer"

interface DashVideoPlayerProps {
  className?: string;
  src?: string;
}

export const DashVideoPlayer = (props: DashVideoPlayerProps) => {
    const playerRef = useRef<HTMLVideoElement | null>(null)
    const mediaPlayerRef = useRef<dashjs.MediaPlayerClass | null>(null)

    useEffect(() => {
        const handleEffect = async () => {
            const player = playerRef.current
            if (player === null) return

            const { MediaPlayer } = await import("dashjs")
            const mediaPlayer = MediaPlayer().create()
            mediaPlayerRef.current = mediaPlayer

            mediaPlayer.initialize(player, props.src, true)

            mediaPlayer.on("streamInitialized", () => {
                const bitrates = mediaPlayer.getBitrateInfoListFor("video")
                dispatch({
                    type: "SET_BITRATE_INFOS",
                    payload: bitrates,
                })

                dispatch({
                    type: "SET_DURATION",
                    payload: mediaPlayer.duration(),
                })
            })

            mediaPlayer.on("playbackTimeUpdated", (event) => {
                dispatch({
                    type: "SET_PLAYBACK_TIME",
                    payload: Number(event.time),
                })

                if (event.timeToEnd === 0) onPause()
            })
        }
        handleEffect()
    }, [])

    const [state, dispatch] = useDashVideoPlayerReducer()
    const {
        isMuted,
        isPlay,
        volume,
        playbackTime,
        duration,
        bitrateInfos,
        autoSwitchBitrate,
    } = state

    useEffect(() => {
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return
        mediaPlayer.updateSettings({
            streaming: {
                abr: {
                    autoSwitchBitrate: {
                        audio: autoSwitchBitrate,
                        video: autoSwitchBitrate,
                    },
                },
            },
        })
    }, [autoSwitchBitrate])

    const onPlay = () => {
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return
        mediaPlayer.play()
        dispatch({
            type: "SET_IS_PLAY",
            payload: true,
        })
    }

    const onPause = () => {
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return
        mediaPlayer.pause()
        dispatch({
            type: "SET_IS_PLAY",
            payload: false,
        })
    }

    const onMute = () => {
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return
        mediaPlayer.setMute(true)
        dispatch({
            type: "SET_IS_MUTED",
            payload: true,
        })
    }

    const onUnmute = () => {
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return
        mediaPlayer.setMute(false)
        dispatch({
            type: "SET_IS_MUTED",
            payload: false,
        })
    }

    const onVolumeChange = (value: number | number[]) => {
        const _value = value as number
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return

        mediaPlayer.setVolume(_value)
        onUnmute()

        dispatch({
            type: "SET_VOLUME",
            payload: _value,
        })
    }

    const onSeek = (value: number | number[]) => {
        const _value = value as number
        const mediaPlayer = mediaPlayerRef.current
        if (mediaPlayer === null) return

        if (mediaPlayer.isPaused()) {
            onPlay()
        }

        mediaPlayer.seek(_value)
        dispatch({
            type: "SET_PLAYBACK_TIME",
            payload: playbackTime,
        })
    }

    const renderQualityTooltip = () => {
        const items: JSX.Element[] = []
        items.push(
            <ListboxItem
                key="auto"
                className="text-center"
                aria-label="Bitrates"
                onPress={() =>
                    dispatch({
                        type: "SET_AUTO_SWITCH_BITRATE_ACTION",
                        payload: true,
                    })
                }
            >
        Auto
            </ListboxItem>
        )
        {
            bitrateInfos.forEach((bitrateInfo) =>
                items.push(
                    <ListboxItem
                        className="text-center"
                        key={bitrateInfo.height}
                        onPress={() => {
                            console.log("Called")
                            const mediaPlayer = mediaPlayerRef.current
                            if (mediaPlayer === null) return
                            dispatch({
                                type: "SET_AUTO_SWITCH_BITRATE_ACTION",
                                payload: false,
                            })
                            mediaPlayer.setQualityFor(
                                "video",
                                bitrateInfo.qualityIndex,
                                true
                            )
                            console.log(bitrateInfo.qualityIndex)
                        }}
                    >
                        {bitrateInfo.height}p
                    </ListboxItem>
                )
            )
        }
        return <Listbox aria-label="Actions">{items}</Listbox>
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
                                <DropdownItem key="quality">
                                    <Tooltip
                                        placement="left-end"
                                        content={renderQualityTooltip()}
                                    >
                                        <div className="flex gap-2 items-center">
                                            <AdjustmentsHorizontalIcon className="w-6 h-6" />
                                            <div>Subtitle</div>
                                        </div>
                                    </Tooltip>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
