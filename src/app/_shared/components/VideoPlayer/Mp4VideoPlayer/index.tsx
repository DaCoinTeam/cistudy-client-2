"use client"
import React, { createContext, useEffect, useMemo, useRef } from "react"
import {
    Mp4VideoPlayerAction,
    Mp4VideoPlayerState,
    useMp4VideoPlayerReducer,
} from "./useMp4VideoPlayerReducer"
import { ControlBottom } from "./ControlBottom"

interface Mp4VideoPlayerProps {
  className?: string;
  src: string;
  triggerOnFinish?: boolean;
  onFinish?: () => void;
  preventSeek?: boolean;
}

interface Mp4VideoPlayerContextValue {
  player: HTMLVideoElement | null;
  state: Mp4VideoPlayerState;
  dispatch: React.Dispatch<Mp4VideoPlayerAction>;
  functions: {
    onPlay: () => void;
    onPause: () => void;
  };
}

export const Mp4VideoPlayerContext =
  createContext<Mp4VideoPlayerContextValue | null>(null)

export const Mp4VideoPlayer = (props: Mp4VideoPlayerProps) => {
    const { src, className, onFinish, preventSeek, triggerOnFinish } = props

    const playerRef = useRef<HTMLVideoElement | null>(null)
    const [state, dispatch] = useMp4VideoPlayerReducer()

    useEffect(() => {
        const handleEffect = async () => {
            const player = playerRef.current
            if (player === null) return
            player.src = src

            player.addEventListener("loadedmetadata", () => {
                dispatch({
                    type: "SET_DURATION",
                    payload: player.duration,
                })
            })

            player.addEventListener("timeupdate", (event) => {
                const target = event.target as HTMLMediaElement
                dispatch({
                    type: "SET_PLAYBACK_TIME",
                    payload: target.currentTime,
                })
                if (target.ended) onPause()
            })
        }
        handleEffect()
    }, [])

    const triggerOncePerMount = useRef(false)

    useEffect(() => {
        if (
            !triggerOncePerMount.current &&
      triggerOnFinish &&
      onFinish &&
      state.playbackTime > 0 &&
      state.duration > 0
        ) {
            if (Math.abs(state.playbackTime - state.duration) <= 0.1) {
                onFinish()
                triggerOncePerMount.current = true
            }
        }
    }, [state.duration, state.playbackTime])

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

    const mp4VideoPlayerContextValue: Mp4VideoPlayerContextValue = useMemo(
        () => ({
            player: playerRef.current,
            state,
            dispatch,
            functions: {
                onPlay,
                onPause,
            },
        }),
        [playerRef.current, state, dispatch]
    )

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
        <Mp4VideoPlayerContext.Provider value={mp4VideoPlayerContextValue}>
            <div
                className={`aspect-video relative bg-content2 rounded-lg overflow-hidden  ${
                    className ?? ""
                }`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <video
                    className="h-full m-0 w-full object-cover"
                    ref={playerRef}
                    aria-label="Playback"
                />
                <ControlBottom preventSeek={preventSeek} />
            </div>
        </Mp4VideoPlayerContext.Provider>
    )
}
