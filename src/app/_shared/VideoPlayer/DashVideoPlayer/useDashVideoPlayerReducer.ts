import { BitrateInfo } from "dashjs"
import { useReducer } from "react"

export interface DashVideoPlayerState {
  isPlay: boolean;
  volume: number;
  isMuted: boolean;
  playbackTime: number;
  duration: number;
  bitrateInfos: Array<BitrateInfo>,
  autoSwitchBitrate: boolean
  hideController: boolean
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

export interface SetBitrateInfosAction {
  type: "SET_BITRATE_INFOS",
  payload: Array<BitrateInfo>
}

export interface SetAutoSwitchBitrateAction {
  type: "SET_AUTO_SWITCH_BITRATE_ACTION";
  payload: boolean;
}

export interface SetHideController {
  type: "SET_HIDE_CONTROLLER";
  payload: boolean;
}


export type DashVideoPlayerAction =
  | SetIsPlayAction
  | SetVolumeAction
  | SetIsMutedAction
  | SetPlaybackTimeAction
  | SetDurationAction
  | SetBitrateInfosAction
  | SetAutoSwitchBitrateAction
  | SetHideController
  ;

export const state: DashVideoPlayerState = {
    isPlay: false,
    volume: 0.5,
    isMuted: false,
    playbackTime: 0,
    duration: 0,
    bitrateInfos: [],
    autoSwitchBitrate: true,
    hideController: true,
}

export const reducer = (
    state: DashVideoPlayerState,
    action: DashVideoPlayerAction
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
    case "SET_BITRATE_INFOS":
        return { ...state, bitrateInfos: action.payload }
    case "SET_AUTO_SWITCH_BITRATE_ACTION":
        return { ...state, autoSwitchBitrate: action.payload }
    case "SET_HIDE_CONTROLLER":
        return { ...state, hideController: action.payload }
    default:
        return state
    }
}

export const useDashVideoPlayerReducer = () => {
    return useReducer(reducer, state)
}
