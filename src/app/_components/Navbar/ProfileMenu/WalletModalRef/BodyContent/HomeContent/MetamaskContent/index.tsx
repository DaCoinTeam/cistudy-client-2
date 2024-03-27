"use client"
import React, { useContext } from "react"
import { RootContext } from "../../../../../../../_hooks"
import { Button, Divider, Link, ModalBody, Spacer, User } from "@nextui-org/react"
import { computeDenomination, truncateAddress } from "@common"

export const MetamaskContent = () => {
    const { swrs, reducer } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const { balance } = { ...profile }

    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address, starciBalance, starci2Balance } = metamask

    return (
        <ModalBody className="p-4">
            <div className="grid place-items-center">
                <Link color="foreground" as="button" showAnchorIcon> {truncateAddress(address)} </Link>
                <Spacer y={4}/>
                <div className="flex gap-4 items-center w-full">
                    <Button className="flex-1">
                        Receive
                    </Button>
                    <Button className="flex-1">
                        Buy
                    </Button>
                    <Button className="flex-1">
                        Send
                    </Button>
                </div>
                <Spacer y={6}/>
                <div className="border border-divider rounded-medium w-full p-4">
                    <User avatarProps={{
                        src: "/starci-logo.svg"
                    }} name="STARCI Token" description={`${computeDenomination(starciBalance)} STARCI`} />
                </div>
                <Spacer y={4}/>
                <div className="border border-divider rounded-medium w-full">
                    <User className="flex justify-start p-4" avatarProps={{
                        src: "/starci-logo.svg"
                    }} name="STARCI2 Token" description={`${computeDenomination(starci2Balance)} STARCI2`} />
                    <Divider />
                    <div className="flex gap-3 p-4 items-center">
                        <Button color="primary"> Withdraw </Button>
                        <div className="text-sm text-foreground-400">{balance} STARCI2</div>
                    </div>
                </div>
            </div> 
        </ModalBody>
    )
}
