import {
    ChatBubbleBottomCenterTextIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import React from "react"
import { VideoQuality } from "./VideoQuality"

export const Settings = () => {
    return (
        <Dropdown placement="top-end">
            <DropdownTrigger>
                <Link as="button">
                    <Cog6ToothIcon className="w-6 h-6" />
                </Link>
            </DropdownTrigger>
            <DropdownMenu aria-label="Settings">
                <DropdownItem
                    startContent={<ChatBubbleBottomCenterTextIcon className="w-6 h-6" />}
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
                    <VideoQuality />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
