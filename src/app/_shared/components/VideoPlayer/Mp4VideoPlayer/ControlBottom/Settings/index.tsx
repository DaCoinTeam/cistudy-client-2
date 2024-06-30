import React from "react"
import { HiCog } from "react-icons/hi";
import { HiOutlineChatBubbleBottomCenterText, HiPlayCircle  } from "react-icons/hi2";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"

export const Settings = () => {
    return (
        <Dropdown placement="top-end">
            <DropdownTrigger>
                <Link as="button">
                    <HiCog className="w-6 h-6" />
                </Link>
            </DropdownTrigger>
            <DropdownMenu aria-label="Settings">
                <DropdownItem
                    startContent={<HiOutlineChatBubbleBottomCenterText className="w-6 h-6" />}
                    key="subtitle"
                >
          Subtitle
                </DropdownItem>
                <DropdownItem
                    startContent={<HiPlayCircle className="w-6 h-6" />}
                    key="playbackSpeed"
                >
          Playback speed
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
