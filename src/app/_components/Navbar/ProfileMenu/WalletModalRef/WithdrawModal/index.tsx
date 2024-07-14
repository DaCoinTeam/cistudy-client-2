import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Spinner,
} from "@nextui-org/react"
import {
    WithdrawModalContext,
    WithdrawModalProvider,
} from "./WithdrawModalProvider"

export const WrappedWithdrawModal = () => {
    const { discloresures, formik, swrs } = useContext(WithdrawModalContext)!
    const { baseDiscloresure } = discloresures
    const { withdrawSwrMutation } = swrs
    const { isOpen, onOpen, onOpenChange } = baseDiscloresure

    return (
        <>
            <Button className="flex-1" onPress={onOpen}>
        Withdraw
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Withdraw</ModalHeader>
                    <ModalBody className="p-4">
                        <Input
                            label="Withdraw Amount"
                            id="withdrawAmount"
                            isRequired
                            classNames={{
                                inputWrapper: "input-input-wrapper",
                            }}
                            labelPlacement="outside"
                            placeholder="Input withdraw amount here"
                            value={formik.values.withdrawAmount.toString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(
                                    formik.touched.withdrawAmount && formik.errors.withdrawAmount
                                )
                            }
                            errorMessage={
                                formik.touched.withdrawAmount && formik.errors.withdrawAmount
                            }
                            endContent={
                                <div className="text-sm text-foreground-400">STARCI</div>
                            }
                        />
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button
                            fullWidth
                            color="secondary"
                            onPress={formik.submitForm}
                            isDisabled={withdrawSwrMutation.isMutating}
                            endContent={
                                withdrawSwrMutation.isMutating ? <Spinner color="current" size="sm" /> : null
                            }
                        >
              Withdraw
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const WithdrawModal = () => {
    return (
        <WithdrawModalProvider>
            <WrappedWithdrawModal />
        </WithdrawModalProvider>
    )
}
