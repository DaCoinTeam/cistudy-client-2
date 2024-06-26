import React, { useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreHorizontal } from "lucide-react"
import {
    ReceivedWalletDropdownRef,
    ReceivedWalletDropdownRefSelectors,
} from "./ReceivedWalletModalRef"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { className } = props

    const receivedWalletDropdownRef =
    useRef<ReceivedWalletDropdownRefSelectors | null>(null)

    const onPress = () => receivedWalletDropdownRef.current?.onOpen()

    return (
        <>
            <Dropdown
                placement="left-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}

            >
                <DropdownTrigger>
                    <Button className={`${className} bg-content2`} isIconOnly>
                        <MoreHorizontal size={20} strokeWidth={3 / 2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem  key="receivedWallet" onPress={onPress}> Received Wallet </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ReceivedWalletDropdownRef ref={receivedWalletDropdownRef} />
        </>
    )
}
