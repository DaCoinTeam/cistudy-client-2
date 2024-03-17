"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Button,
    ModalFooter,
    Textarea,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import {
    EditModalRefContext,
    EditModalRefProviders,
} from "./EditModalRefProviders"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

export interface EditModalRefSelectors {
  onOpen: () => void;
}

const WrappedEditModalRef = forwardRef<EditModalRefSelectors | null>(
    (_, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        const { formik, functions } = useContext(EditModalRefContext)!
        const { discardChanges, hasChanged } = functions
        const onCancelPress = () => discardChanges()
        const onSubmit = () => formik.handleSubmit()

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Edit</ModalHeader>
                    <ModalBody className="p-4">
                        <Input
                            id="title"
                            variant="bordered"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            isInvalid={!!(formik.touched.title && formik.errors.title)}
                            errorMessage={formik.touched.title && formik.errors.title}
                            classNames={{
                                inputWrapper: "shadow-none !border !border-divider",
                            }}
                            labelPlacement="outside"
                            label="Title"
                            placeholder="Input title here"
                        />
                        <Textarea
                            id="description"
                            variant="bordered"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            isInvalid={!!(formik.touched.description && formik.errors.description)}
                            errorMessage={formik.touched.description && formik.errors.description}
                            classNames={{
                                inputWrapper: "shadow-none !border !border-divider",
                            }}
                            labelPlacement="outside"
                            label="Description"
                            placeholder="Input description here"
                        />
                    </ModalBody>
                    <ModalFooter className="gap-2">
                        <Button
                            onPress={onCancelPress}
                            variant="light"
                            isDisabled={!hasChanged()}
                            startContent={<XMarkIcon width={20} height={20}/>}
                        >
                Cancel
                        </Button>
                        <Button
                            onPress={onSubmit}
                            color="primary"
                            isDisabled={!hasChanged()}
                            startContent={<CheckIcon width={20} height={20}/>}
                        >
                Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
)

export const EditModalRef = forwardRef<EditModalRefSelectors | null>(
    (_, ref) => (
        <EditModalRefProviders>
            <WrappedEditModalRef ref={ref} />
        </EditModalRefProviders>
    )
)
