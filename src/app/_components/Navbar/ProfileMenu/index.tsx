import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { AccountRole, removeTokens } from "@common"
import { RootContext } from "../../../_hooks"
import { getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"
import { WalletModalRef, WalletModalRefSelectors } from "./WalletModalRef"

interface Item {
    key: string;
    content: JSX.Element | Array<JSX.Element> | string;
    onPress?: () => void;
    color?: "danger" | undefined;
}

export const ProfileMenu = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate, data: profile } = profileSwr
    const { avatarId, username, accountId, avatarUrl, kind, roles } = {
        ...profile,
    }

    const onSignOutPress = async () => {
        await mutate(null, {
            revalidate: false,
        })
        removeTokens()
    }

    const router = useRouter()
    const onProfilePress = () => router.push(`/accounts/${accountId}`)
    const onManagementPress = () => router.push("/management")
    const onEnrolledCouresPress = () => router.push("/enrolled-courses")
    const onAdminDashboardPress = () => router.push("/admin")

    const walletModalRef = useRef<WalletModalRefSelectors | null>(null)
    const onWalletPress = () => walletModalRef.current?.onOpen()

    const items: Array<Item> =
        roles?.map(role => role.name).includes(AccountRole.Administrator) ?
            [
                {
                    key: "base",
                    content: [
                        <div key="signedInAs" className="font-semibold">
                            Signed in as
                        </div>,
                        <div key="username" className="font-semibold">
                            {username}
                        </div>,
                    ],
                },
                {
                    key: "profile",
                    onPress: onProfilePress,
                    content: "Profile",
                },
                {
                    key: "enrolledCourses",
                    onPress: onEnrolledCouresPress,
                    content: "Enrolled courses",
                },
                {
                    key: "wallet",
                    onPress: onWalletPress,
                    content: "Wallet",
                },
                {
                    key: "management",
                    onPress: onManagementPress,
                    content: "Management",
                },
                {
                    key: "help_and_feedback",
                    content: "Help & Feedback",
                },
                {
                    key: "adminDashboard",
                    onPress: onAdminDashboardPress,
                    content: "Admin dashboard"
                },
                {
                    key: "logout",
                    onPress: onSignOutPress,
                    content: "Sign Out",
                    color: "danger",
                },
            ] :
            [
                {
                    key: "base",
                    content: [
                        <div key="signedInAs" className="font-semibold">
                            Signed in as
                        </div>,
                        <div key="username" className="font-semibold">
                            {username}
                        </div>,
                    ],
                },
                {
                    key: "profile",
                    onPress: onProfilePress,
                    content: "Profile",
                },
                {
                    key: "enrolledCourses",
                    onPress: onEnrolledCouresPress,
                    content: "Enrolled courses",
                },
                {
                    key: "wallet",
                    onPress: onWalletPress,
                    content: "Wallet",
                },
                {
                    key: "management",
                    onPress: onManagementPress,
                    content: "Management",
                },
                {
                    key: "help_and_feedback",
                    content: "Help & Feedback",
                },
                {
                    key: "logout",
                    onPress: onSignOutPress,
                    content: "Sign Out",
                    color: "danger",
                },
            ]

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
                <DropdownMenu aria-label="Account Actions" variant="flat">
                    {
                        items.map(({ content, key, onPress, color }) => (
                            <DropdownItem key={key} onPress={onPress} color={color}>
                                {content}
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </Dropdown>
            <WalletModalRef ref={walletModalRef} />
        </>
    )
}
