import React, { useContext } from "react"
import { ProgressBar } from "./ProgressBar"
import { Spacer } from "@nextui-org/react"
import { PlayAndPause } from "./PlayAndPause"
import { Volume } from "./Volume"
import { Duration } from "./Duration"
import { Settings } from "./Settings"
import { Mp4VideoPlayerContext } from ".."

export const ControlBottom = () => {
    const { state } = useContext(Mp4VideoPlayerContext)!
    const { hideController } = state
    
    return (
        <div className={`${hideController ? "hidden" : "inline-block"} p-3 z-10 absolute bottom-0 w-full`}>
            <ProgressBar/>
            <Spacer y={2} />
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <PlayAndPause/>
                    <Volume />
                    <Duration />
                </div>
                <div className="flex gap-4 items-center">
                    <Settings />
                </div>
            </div>
        </div>
    )
}