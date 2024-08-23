import { CheckIcon } from "@heroicons/react/24/outline"
import {
    Button,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Textarea,
    useDisclosure,
} from "@nextui-org/react"
import { PenIcon, RefreshCcw } from "lucide-react"
import React, { useContext } from "react"
import { EditProfileModalContext, EditProfileModalProvider } from "./EditProfileModalProvider"
import { parseDate, getLocalTimeZone, today } from "@internationalized/date"
import { parseISODateString } from "@common"

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
                            label="Username"
                            id="username"
                            labelPlacement="outside"
                            value={formik.values.username}
                            placeholder="Input title here"
                            onChange={formik.handleChange}
                        />
                        <Spacer y={4} />
                        <DatePicker
                            // classNames={{
                            //     inputWrapper: "input-input-wrapper"
                            // }}
                            maxValue={today(getLocalTimeZone())}
                            label="Birthdate" value={parseDate(formik.values.birthdate)} className="w-full" 
                            labelPlacement="outside" onChange={(value) => {
                                formik.setFieldValue("birthdate", parseISODateString(value.toDate(getLocalTimeZone())))
                            }}
                        />
                        <Spacer y={4} />
                        <Textarea
                            label="Bio"
                            id="bio"
                            labelPlacement="outside"
                            value={formik.values.bio}
                            placeholder="Input bio here"
                            onChange={formik.handleChange}
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
                            isDisabled={formik.isSubmitting}
                            isLoading={formik.isSubmitting}
                            startContent={!formik.isSubmitting ? <CheckIcon height={20} width={20} /> : undefined}
                            color="primary"
                        >
                            {formik.isSubmitting ? "Saving" : "Save"}
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
