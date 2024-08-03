"use client"
import React, { createContext, useEffect, useMemo, useRef } from "react"
import {
    DashVideoPlayerState,
    DashVideoPlayerAction,
    useDashVideoPlayerReducer,
} from "./useDashVideoPlayerReducer"
import { ControlBottom } from "./ControlBottom"

interface DashVideoPlayerProps {
  className?: string;
  src: string;
  triggerOnFinish?: boolean;
  onFinish?: () => void;
  preventSeek?: boolean;
}

interface DashVideoPlayerContextValue {
  player: dashjs.MediaPlayerClass | null;
  state: DashVideoPlayerState;
  dispatch: React.Dispatch<DashVideoPlayerAction>;
  functions: {
    onPlay: () => void;
    onPause: () => void;
  };
}

export const DashVideoPlayerContext =
  createContext<DashVideoPlayerContextValue | null>(null)

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
                mediaPlayer.pause()
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
                const { time, timeToEnd } = event
                dispatch({
                    type: "SET_PLAYBACK_TIME",
                    payload: time as number,
                })

                if (timeToEnd === 0) onPause()
            })
        }
        handleEffect()
    }, [])

    const [state, dispatch] = useDashVideoPlayerReducer()
    const { autoSwitchBitrate } = state

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

    const triggerOncePerMount = useRef(false)

    const dashVideoPlayerContextValue: DashVideoPlayerContextValue = useMemo(
        () => ({
            player: mediaPlayerRef.current,
            state,
            dispatch,
            functions: {
                onPlay,
                onPause,
            },
        }),
        [mediaPlayerRef.current, state, dispatch]
    )

    useEffect(() => {
        if (
            !triggerOncePerMount.current &&
      props.triggerOnFinish &&
      props.onFinish &&
      state.playbackTime > 0 &&
      state.duration > 0
        ) {
            if (Math.abs(state.playbackTime - state.duration) <= 0.1) {
                props.onFinish()
                triggerOncePerMount.current = true
            }
        }
    }, [state.duration, state.playbackTime])

    const onMouseEnter = () =>
        dispatch({
            type: "SET_HIDE_CONTROLLER",
            payload: false,
        })

    const onMouseLeave = () =>
        dispatch({
            type: "SET_HIDE_CONTROLLER",
            payload: true,
        })

    return (
        <DashVideoPlayerContext.Provider value={dashVideoPlayerContextValue}>
            <div
                className="aspect-video relative bg-content2 rounded-large overflow-hidden"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <video
                    className="h-full m-auto object-cover"
                    ref={playerRef}
                    aria-label="playback"
                />
                <ControlBottom preventSeek={props.preventSeek}/>
            </div>
        </DashVideoPlayerContext.Provider>
    )
}
