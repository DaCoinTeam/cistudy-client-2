import React, { useContext } from "react"
import { SystemRoles, getSetValues, parseISODateString } from "@common"
import {
    CreateAccountModalContext,
    CreateAccountModalProvider,
} from "./CreateAccountModalProvider"
import {
    useDisclosure,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
    Select,
    SelectItem,
    DatePicker,
} from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { getLocalTimeZone, parseDate } from "@internationalized/date"

export const WrappedCreateAccountModal = () => {
    const { formik } = useContext(CreateAccountModalContext)!

    const rolesMap = [
        {
            key: SystemRoles.Administrator,
            name: "Administrator"
        },
        {
            key: SystemRoles.Instructor,
            name: "Instructor"
        },
        {
            key: SystemRoles.Moderator,
            name: "Moderator"
        },
        {
            key: SystemRoles.User,
            name: "User"
        }
    ]
    return (
        <>
            <ModalHeader className="p-4 pb-2">Account Details</ModalHeader>
            <ModalBody className="p-4">
                <div className="grid gap-4">
                    <Input
                        label="Email"
                        id="email"
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        labelPlacement="outside"
                        placeholder="Input email here"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Input
                        label="Username"
                        id="username"
                        isRequired
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        labelPlacement="outside"
                        placeholder="Input username here"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.username && formik.errors.username)}
                        errorMessage={formik.touched.username && formik.errors.username}
                    />
                    <div className="flex gap-4">
                        <Input
                            label="First Name"
                            id="firstName"
                            isRequired
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }} 
                            labelPlacement="outside"
                            placeholder="Input first name here"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.firstName && formik.errors.firstName)}
                            errorMessage={formik.touched.firstName && formik.errors.firstName}
                        />
                        <Input
                            label="Last Name"
                            id="lastName"
                            isRequired
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }} 
                            labelPlacement="outside"
                            placeholder="Input last name here"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <DatePicker
                        label="Birthdate" value={parseDate(formik.values.birthdate)} className="w-full" 
                        labelPlacement="outside" onChange={(value) => {
                            formik.setFieldValue("birthdate", parseISODateString(value.toDate(getLocalTimeZone())))
                        }}
                    />
                    <Select
                        selectionMode="multiple"
                        label="Roles"
                        selectedKeys={formik.values.roles as Array<string>}
                        onSelectionChange={(selection) => {
                            if (selection === "all") return
                            const values = getSetValues(selection)
                            if (!values) return
                            formik.setFieldValue("roles", values)
                        }}
                        labelPlacement="outside"
                        placeholder="Roles"
                        className="w-full"
                        classNames={{
                            trigger: "input-input-wrapper"
                        }}
                    >
                        {rolesMap.map(({ name, key }) => (
                            <SelectItem key={key}>
                                {name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </ModalBody>
            <ModalFooter className="p-4">
                <Button color="primary" variant="bordered">
          Close
                </Button>
                <Button
                    color="primary"
                    isLoading={formik.isSubmitting}
                    onPress={() => formik.submitForm()}
                >
          Create
                </Button>
            </ModalFooter>
        </>
    )
}

export const CreateAccountModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Button startContent={<PlusIcon className="w-5 h-5"/>} onPress={onOpen} color="default" variant="flat">Create</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <CreateAccountModalProvider>
                        <WrappedCreateAccountModal />
                    </CreateAccountModalProvider>
                </ModalContent>
            </Modal>
        </>
    )
}
