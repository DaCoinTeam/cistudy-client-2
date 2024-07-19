import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Spacer,
    Tooltip,
    ModalFooter,
    Link,
} from "@nextui-org/react"
import { BuyOutsideModalContext, BuyOutsideModalProvider } from "./BuyOutsideModalProvider"
import numeral from "numeral"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { captureOrder, createOrder } from "@services"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../ToastRef"
import { WalletModalRefContext } from "../WalletModalRefProvider"

const WrappedBuyOutsideModal = () => {
    const { discloresures, formik } = useContext(BuyOutsideModalContext)!
    const { baseDiscloresure } = discloresures
    const { isOpen, onOpenChange, onOpen, onClose } = baseDiscloresure
    const { notify } = useContext(RootContext)!

    const price = Number.parseFloat(
        numeral(formik.values.buyAmount).format("0.00")
    )

    const { reducer } = useContext(WalletModalRefContext)!
    const [ , dispatch ] = reducer

    return (
        <>
            <Link as="button" size="sm" onPress={onOpen}> Buy </Link>
            <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Buy</ModalHeader>
                    <ModalBody className="p-4">
                        <div>
                            <Input
                                label="Buy Amount"
                                id="buyAmount"
                                isRequired
                                classNames={{
                                    inputWrapper: "input-input-wrapper",
                                }}
                                labelPlacement="outside"
                                placeholder="Input deposit amount here"
                                value={formik.values.buyAmount.toString()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!(formik.touched.buyAmount && formik.errors.buyAmount)
                                }
                                errorMessage={
                                    formik.touched.buyAmount && formik.errors.buyAmount
                                }
                                endContent={
                                    <div className="text-sm text-foreground-400">STARCI</div>
                                }
                            />
                            <Spacer y={4} />
                            <div>
                                <div className="text-primary text-lg font-semibold"></div>
                                <Spacer y={2} />
                                <div className="flex gap-1 items-center text-primary font-semibold">
                                    <div>Price: {price} USD</div>
                                    <Tooltip content="1 STARCI = 1 USD">
                                        <QuestionMarkCircleIcon className="w-4 h-4 text-primary" />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2 flex flex-col">
                        <div className="w-full h-[60px]">
                            <PayPalScriptProvider
                                options={{
                                    clientId: process.env.NEXT_PUBLIC_PAYPAL_API_KEY ?? "test",
                                    currency: "USD",
                                    intent: "capture",
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        shape: "rect",
                                        layout: "horizontal",
                                        color: "gold",
                                        label: "paypal",
                                    }}
                                    forceReRender={[formik.values.buyAmount]}
                                    createOrder={async () => {

                                        const { others } = await createOrder({
                                            data: {
                                                amount: formik.values.buyAmount,
                                                isSandbox: true,
                                            },
                                        })

                                        const { orderId } = others
                                        return orderId
                                    }}
                                    onApprove={async (data) => {
                                        const { message } = await captureOrder({
                                            data: {
                                                orderId: data.orderID,
                                                isSandbox: true,
                                            },
                                        })
                                        notify!({
                                            data: {
                                                message
                                            },
                                            type: ToastType.Success
                                        })
                                        onClose()
                                        dispatch({
                                            type: "TRIGGER_REFRESH_TRANSACTIONS_KEY"
                                        })
                                    }} 
                                />
                            </PayPalScriptProvider>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const BuyOutsideModal = () => {
    return (
        <BuyOutsideModalProvider>
            <WrappedBuyOutsideModal/>
        </BuyOutsideModalProvider>
    )
}
