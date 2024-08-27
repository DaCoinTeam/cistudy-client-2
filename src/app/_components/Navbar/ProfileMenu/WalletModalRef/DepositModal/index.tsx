import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react"
import {
    DepositModalContext,
    DepositModalProvider,
} from "./DepositModalProvider"

export const WrappedDepositModal = () => {
    const { discloresures, formik } = useContext(DepositModalContext)!
    const { baseDiscloresure } = discloresures
    const { isOpen, onOpen, onOpenChange } = baseDiscloresure

    return (
        <>
            <Button  variant="flat" fullWidth onPress={onOpen}>
        Deposit
            </Button>
            <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Deposit</ModalHeader>
                    <ModalBody className="p-4">
                        <Input
                            label="Deposit Amount"
                            id="depositAmount"
                            isRequired
                            classNames={{
                                inputWrapper: "input-input-wrapper",
                            }}
                            labelPlacement="outside"
                            placeholder="Input deposit amount here"
                            value={formik.values.depositAmount.toString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.depositAmount && formik.errors.depositAmount)
                            }
                            errorMessage={
                                formik.touched.depositAmount && formik.errors.depositAmount
                            }
                            endContent={
                                <div className="text-sm text-foreground-400">STARCI</div>
                            }
                        />
                        <div className="text-sm text-warning">
                            <div>You will need to confirm the transaction in MetaMask. 
                            </div>
                            <div>Make sure to finish this step for the transaction to proceed.
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button
                            fullWidth
                            color="primary"
                            isDisabled={formik.isSubmitting}
                            isLoading={formik.isSubmitting}
                            onPress={formik.submitForm}
                        >
              Deposit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const DepositModal = () => {
    return (
        <DepositModalProvider>
            <WrappedDepositModal />
        </DepositModalProvider>
    )
}
