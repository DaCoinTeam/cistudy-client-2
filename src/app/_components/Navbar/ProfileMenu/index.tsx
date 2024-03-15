import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { removeTokens } from "@common"
import { RootContext } from "../../../_hooks"
import { getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"
import { WalletModalRef, WalletModalRefSelectors } from "./WalletModalRef"

export const ProfileMenu = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate, data: profile } = profileSwr
    const { avatarId, username, userId, avatarUrl, kind } = { ...profile }

    const onSignOutPress = async () => {
        await mutate(null, {
            revalidate: false,
        })
        removeTokens()
    }

    const router = useRouter()
    const onProfilePress = () => router.push(`/users/${userId}`)

    const walletModalRef = useRef<WalletModalRefSelectors | null>(null)
    const onWalletPress = () => walletModalRef.current?.onOpen()

    console.log(getAvatarUrl({
        avatarId,
        avatarUrl,
        kind,
    }))
    return (
        <>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        src={getAvatarUrl({
                            avatarId,
                            avatarUrl,
                            kind,
                        })}
                        className="transition-transform"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="base" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{username}</p>
                    </DropdownItem>
                    <DropdownItem key="profile" onPress={onProfilePress}>
            Profile
                    </DropdownItem>
                    <DropdownItem key="wallet" onPress={onWalletPress}>
            Wallet
                    </DropdownItem>
                    <DropdownItem key="analytics">Analytics</DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem onPress={onSignOutPress} key="logout" color="danger">
            Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <WalletModalRef ref={walletModalRef} />
        </>
    )
}
