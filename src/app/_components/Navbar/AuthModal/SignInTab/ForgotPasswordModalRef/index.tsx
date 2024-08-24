import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { ForgotPasswordModalRefContext, ForgotPasswordModalRefProvider } from "./ForgotPasswordModalRefProvider"

export interface ForgotPasswordModalRefSelectors {
    onOpen: () => void;
}

interface ForgotPasswordModalRefProps {
    
}

const WrappedForgotPasswordModalRef = forwardRef<
    ForgotPasswordModalRefSelectors,
    ForgotPasswordModalRefProps
>((_, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const {formik, swrs} = useContext(ForgotPasswordModalRefContext)!
    const {forgotPasswordSwrMutation} = swrs
    const {isMutating} = forgotPasswordSwrMutation

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    useEffect(() => {
        if (isMutating === false && formik.submitCount > 0 && !formik.errors.email) {
            onOpenChange()
            formik.resetForm()
        }
    }, [isMutating])

    return (
        <Modal
            isDismissable={false}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="sm"
        >
            <ModalContent>
                <ModalHeader>Forgot Password</ModalHeader>
                <ModalBody>
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }}
                        label="Email"
                        id="email"
                        type="email"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input email here"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isMutating} isDisabled={isMutating} color="primary" onPress={() => formik.handleSubmit()}>
                        Send
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export const ForgotPasswordModalRef = forwardRef<
    ForgotPasswordModalRefSelectors,
    ForgotPasswordModalRefProps
>((_, ref) => {
    
    return (
        <ForgotPasswordModalRefProvider>
            <WrappedForgotPasswordModalRef ref={ref} />
        </ForgotPasswordModalRefProvider>
    )
})