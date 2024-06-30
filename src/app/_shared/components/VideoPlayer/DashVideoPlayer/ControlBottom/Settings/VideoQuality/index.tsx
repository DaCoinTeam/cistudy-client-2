import { Listbox, ListboxItem, Tooltip } from "@nextui-org/react"
import React, { useContext } from "react"
import { DashVideoPlayerContext } from "../../.."
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

export const VideoQuality = () => {
    const { state, dispatch, player } = useContext(DashVideoPlayerContext)!
    const {  bitrateInfos } = state

    const renderQualityTooltip = () => {
        const items: JSX.Element[] = []
        items.push(
            <ListboxItem
                key="auto"
                className="text-center"
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
        bitrateInfos.forEach((bitrateInfo) =>
            items.push(
                <ListboxItem
                    className="text-center"
                    key={bitrateInfo.height}
                    onPress={() => {
                        if (player === null) return
                        dispatch({
                            type: "SET_AUTO_SWITCH_BITRATE_ACTION",
                            payload: false,
                        })
                        player.setQualityFor(
                            "video",
                            bitrateInfo.qualityIndex,
                            true
                        )
                        // console.log(bitrateInfo.qualityIndex)
                    }}
                >
                    {bitrateInfo.height}p
                </ListboxItem>
            )
        )
        
        return <Listbox>{items}</Listbox>
    }
    
    return ( 
        <Tooltip placement="left-end" content={renderQualityTooltip()}>
            <div className="flex gap-2 items-center">
                <AdjustmentsHorizontalIcon className="w-6 h-6" />
                <div className="text-sm"> Quality</div>
            </div>
          
        </Tooltip>   
    )
}