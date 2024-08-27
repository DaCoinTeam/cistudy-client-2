"use client"
import React, { forwardRef, useContext, useImperativeHandle } from "react"
import {
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import { WalletModalRefContext, WalletModalRefProvider } from "./WalletModalRefProvider"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import {
    truncate,
    computeDenomination,
    computeRaw,
    formatNumber,
} from "../../../../../common/utils"
import { DepositModal } from "./DepositModal"
import { RootContext } from "../../../../_hooks"
import { MetamaskButton } from "./MetamaskButton"
import { DisconnectWalletButton } from "./DisconnectWalletButton"
import { RefreshCcw } from "lucide-react"
import { WithdrawModal } from "./WithdrawModal"
import { BuyModal } from "./BuyModal"
import { TransactionsModal } from "./TransactionsModal"
import { BuyOutsideModal } from "./BuyOutsideModal"

export const WrappedWalletModalRef = () => {
    const { reducer, swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data } = profileSwr
    const { balance } = { ...data }

    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { starciBalance, address } = metamask

    const { reducer: walletModalRefReducer } = useContext(WalletModalRefContext)!
    const [, walletModalRefDispatch ] = walletModalRefReducer
    return (
        <>
            <ModalHeader className="p-4 font-semibold pb-2">Wallet</ModalHeader>
            <ModalBody className="p-4">
                <div>
                    <div className="grid place-items-center">
                        {address ? (
                            <>
                                <Link color="foreground" as="button" showAnchorIcon>
                                    {truncate(address)}
                                </Link>
                                <Spacer y={4} />
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    <BuyModal/>
                                    <DepositModal />
                                    <WithdrawModal />
                                </div>
                                <Spacer y={6} />
                            </>
                        ) : null}

                        <div className="border border-divider rounded-medium w-full p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-4xl">
                                        {computeDenomination(
                                            address
                                                ? starciBalance + computeRaw(balance ?? 0)
                                                : computeRaw(balance ?? 0)
                                        )}
                                    </span>
                                    <span className="text-sm"> STARCI </span>
                                </div>
                                <Link as="button" onPress={() => walletModalRefDispatch({
                                    type: "TRIGGER_REFRESH_BALANCE_KEY"
                                })}><RefreshCcw className="w-5 h-5"/></Link>
                            </div>
                            {address ? (
                                <>
                                    <Spacer y={2} />
                                    <div>
                                        <div className="text-xs flex gap-1">
                                            <div className="min-w-[100px] text-foreground-400 items-center flex gap-1">
                      Deposited
                                                <QuestionMarkCircleIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <div>{formatNumber(balance)} STARCI</div>
                                        </div>
                                        <div className="text-xs flex gap-1">
                                            <div className="min-w-[100px] text-foreground-400 items-center flex gap-1">
                      On-chain
                                                <QuestionMarkCircleIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <div>{computeDenomination(starciBalance)} STARCI</div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <Spacer y={4}/>
                    <div className="flex gap-6 items-center">
                        <BuyOutsideModal/>
                        <TransactionsModal/>
                    </div>
                    
                </div>
            </ModalBody>

            <ModalFooter className="p-4 pt-2">
                {!address ? <MetamaskButton /> : <DisconnectWalletButton />}
            </ModalFooter>
        </>
    )
}

export interface WalletModalRefSelectors {
  onOpen: () => void;
}

interface WalletModalRefProps {
  className?: string;
}

export const WalletModalRef = forwardRef<
  WalletModalRefSelectors,
  WalletModalRefProps
>((props, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { className } = props

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal
            isDismissable={false}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="sm"
            className={`${className}`}
        >
            <ModalContent>
                <WalletModalRefProvider>
                    <WrappedWalletModalRef />
                </WalletModalRefProvider>
            </ModalContent>
        </Modal>
    )
})
