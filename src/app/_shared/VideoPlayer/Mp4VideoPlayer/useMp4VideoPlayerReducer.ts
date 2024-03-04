import { useReducer } from "react"

export interface Mp4VideoPlayerState {
  isPlay: boolean;
  volume: number;
  isMuted: boolean;
  playbackTime: number;
  duration: number;
  hideController: boolean;
}

export interface SetIsPlayAction {
  type: "SET_IS_PLAY";
  payload: boolean;
}

export interface SetVolumeAction {
  type: "SET_VOLUME";
  payload: number;
}

export interface SetIsMutedAction {
  type: "SET_IS_MUTED";
  payload: boolean;
}

export interface SetPlaybackTimeAction {
  type: "SET_PLAYBACK_TIME";
  payload: number;
}

export interface SetDurationAction {
  type: "SET_DURATION";
  payload: number;
}

export interface SetHideController {
  type: "SET_HIDE_CONTROLLER";
  payload: boolean;
}

export type Mp4VideoPlayerAction =
  | SetIsPlayAction
  | SetVolumeAction
  | SetIsMutedAction
  | SetPlaybackTimeAction
  | SetDurationAction
  | SetHideController
  ;

export const state: Mp4VideoPlayerState = {
    isPlay: false,
    volume: 0.5,
    isMuted: false,
    playbackTime: 0,
    duration: 0,
    hideController: true
}

export const reducer = (
    state: Mp4VideoPlayerState,
    action: Mp4VideoPlayerAction
) => {
    switch (action.type) {
    case "SET_IS_PLAY":
        return { ...state, isPlay: action.payload }
    case "SET_VOLUME":
        return { ...state, volume: action.payload }
    case "SET_IS_MUTED":
        return { ...state, isMuted: action.payload }
    case "SET_PLAYBACK_TIME":
        return { ...state, playbackTime: action.payload }
    case "SET_DURATION":
        return { ...state, duration: action.payload }
    case "SET_HIDE_CONTROLLER":
        return { ...state, hideController: action.payload }
    default:
        return state
    }
}

export const useMp4VideoPlayerReducer = () => {
    return useReducer(reducer, state)
}
