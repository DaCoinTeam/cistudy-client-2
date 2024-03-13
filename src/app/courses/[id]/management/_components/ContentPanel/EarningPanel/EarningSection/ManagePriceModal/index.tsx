import {
    CheckIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import {
    useDisclosure,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Switch,
    Spacer,
} from "@nextui-org/react"
import React, { useContext } from "react"
import {
    ManagePriceModalContext,
    ManagePriceModalProviders,
} from "./ManagePriceModalProviders"
import { sanitizeNumericInput } from "@common"

const WrappedManagePriceModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { formik, functions } = useContext(ManagePriceModalContext)!

    const { hasChanged, discardChanges } = functions

    const onDiscardChangesPress = () => discardChanges()

    const onEnableDiscountChange = (value: boolean) =>
        formik.setFieldValue("enableDiscount", value)

    const onPriceChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) formik.setFieldValue("price", sanitizeInput)
    }

    console.log(formik.values)
    
    const onDiscountChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        console.log(sanitizeInput)
        if (sanitizeInput != null) {
            if (
                sanitizeInput &&
        (Number.parseFloat(sanitizeInput) < 0 ||
          Number.parseFloat(sanitizeInput) > 100)
            )
                return
            formik.setFieldValue("discount", sanitizeInput)
        }
    }
    const onSubmit = () => formik.submitForm()

    return (
        <>
            <Button
                startContent={<Cog6ToothIcon height={20} width={20} />}
                onPress={onOpen}
            >
        Manage Price
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Manage Price</ModalHeader>
                    <ModalBody className="p-4 gap-0">
                        <Input
                            id="price"
                            value={formik.values.price}
                            onValueChange={onPriceChange}
                            onBlur={formik.handleBlur}
                            variant="bordered"
                            isInvalid={!!(formik.touched.price && formik.errors.price)}
                            errorMessage={formik.touched.price && formik.errors.price}
                            classNames={{
                                inputWrapper: "!border !border-divider shadow-none",
                            }}
                            placeholder="Input price here"
                            labelPlacement="outside"
                            label="Price"
                            endContent={
                                <div className="text-foreground-500 text-sm">STARCI</div>
                            }
                        />
                        <Spacer y={4} />
                        <Input
                            id="discount"
                            value={formik.values.discount}
                            onValueChange={onDiscountChange}
                            onBlur={formik.handleBlur}
                            variant="bordered"
                            isInvalid={!!(formik.touched.discount && formik.errors.discount)}
                            errorMessage={formik.touched.discount && formik.errors.discount}
                            classNames={{
                                inputWrapper: "!border !border-divider shadow-none",
                            }}
                            placeholder="Input price here"
                            labelPlacement="outside"
                            label="Discount"
                            endContent={<div className="text-foreground-500 text-sm">%</div>}
                        />
                        <Spacer y={4} />
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Enable discount</div>
                            <Switch
                                isSelected={formik.values.enableDiscount}
                                onValueChange={onEnableDiscountChange}
                                classNames={{
                                    wrapper: "mr-0",
                                }}
                                color="primary"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button
                            isDisabled={!hasChanged()}
                            onPress={onDiscardChangesPress}
                            startContent={<XMarkIcon height={20} width={20} />}
                        >
              Cancel
                        </Button>
                        <Button
                            isDisabled={!hasChanged()}
                            onPress={onSubmit}
                            color="primary"
                            className="text-secondary-foreground"
                            startContent={<CheckIcon height={20} width={20} />}
                        >
              Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const ManagePriceModal = () => (
    <ManagePriceModalProviders>
        <WrappedManagePriceModal />
    </ManagePriceModalProviders>
)
