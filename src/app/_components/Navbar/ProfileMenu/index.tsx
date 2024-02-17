import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react"
import React from "react"
import { AppDispatch, setProfile } from "@redux"
import { useDispatch } from "react-redux"
import { removeTokens } from "@common"

export const ProfileMenu = () => {
    const dispatch : AppDispatch = useDispatch()
    const onSignOutPress = () => { 
        dispatch(setProfile(null))
        removeTokens()
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    className="transition-transform"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem onPress={onSignOutPress} key="logout" color="danger">
          Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
