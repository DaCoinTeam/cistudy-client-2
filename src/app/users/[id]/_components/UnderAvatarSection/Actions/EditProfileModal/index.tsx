import { CheckIcon } from "@heroicons/react/24/outline"
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import { PenIcon, RefreshCcw } from "lucide-react"
import React, { useContext } from "react"
import { EditProfileModalContext, EditProfileModalProvider } from "./EditProfileModalProvider"

export const WrappedEditProfileModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { formik } = useContext(EditProfileModalContext)!

    const onPress = () => formik.submitForm()

    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                startContent={<PenIcon size={20} strokeWidth={3 / 2} />}
            >
        Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-6 pb-0 text-2xl ">Edit</ModalHeader>
                    <ModalBody className="p-6 inline">
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }} 
                            label="Accountname"
                            id="username"
                            labelPlacement="outside"
                            value={formik.values.username}
                            placeholder="Input title here"
                            onChange={formik.handleChange}
                        />
                        <Spacer y={4}/>
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }} 
                            label="Birthdate"
                            id="birthdate"
                            labelPlacement="outside"
                            value={formik.values.birthdate}
                            placeholder="Input title here"
                            onChange={formik.handleChange}
                            type="date"
                        />
                    </ModalBody>
                    <ModalFooter className="p-6 gap-2 pt-0">
                        <Button
                            startContent={<RefreshCcw size={20} strokeWidth={3 / 2} />}
                            variant="light"
                        >
              Reset
                        </Button>
                        <Button
                            onPress={onPress}
                            startContent={<CheckIcon height={20} width={20} />}
                            color="primary"
                        >
              Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const EditProfileModal = () => (
    <EditProfileModalProvider>
        <WrappedEditProfileModal />
    </EditProfileModalProvider>
)
