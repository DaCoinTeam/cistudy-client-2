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
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import {
    EditModalRefContext,
    EditModalRefProviders,
} from "./EditModalRefProviders"
import { ClipboardXIcon, SaveIcon } from "lucide-react"

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
        const onDiscardChangesPress = () => discardChanges()
        const onSubmit = () => formik.handleSubmit()

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Edit</ModalHeader>
                    <ModalBody className="p-4">
                        <Input
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            isInvalid={!!(formik.touched.title && formik.errors.title)}
                            errorMessage={formik.touched.title && formik.errors.title}
                            classNames={{
                                inputWrapper: "bg-content2",
                            }}
                            labelPlacement="outside"
                            label="Title"
                            placeholder="Input title here"
                        />
                    </ModalBody>
                    {hasChanged() ? (
                        <ModalFooter className="gap-2">
                            <Button
                                onPress={onDiscardChangesPress}
                                variant="light"
                                startContent={<ClipboardXIcon size={20} strokeWidth={3/2} />}
                            >
                Discard Changes
                            </Button>
                            <Button
                                onPress={onSubmit}
                                className="bg-content2"
                                startContent={<SaveIcon size={20} strokeWidth={3/2} />}
                            >
                Save
                            </Button>
                        </ModalFooter>
                    ) : null}
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
