import React, { createContext, useContext } from "react"
import { AccountEntity, SystemRoles, getSetValues } from "@common"
import {
    AccountDetailsModalContext,
    AccountDetailsModalProvider,
} from "./AccountDetailsModalProvider"
import {
    useDisclosure,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
    Switch,
    Link,
    Select,
    SelectItem,
} from "@nextui-org/react"
import { PencilIcon } from "@heroicons/react/24/outline"

export const WrappedAccountDetailsModal = () => {
    const { formik, swrs } = useContext(AccountDetailsModalContext)!
    const { accountSwr } = swrs

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
                        value={accountSwr.data?.email}
                        readOnly={true}
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
                    <div className="flex justify-between items-center">
                        <div className="text-sm">Disabled</div>
                        <Switch
                            isSelected={formik.values.isDisabled}
                            onValueChange={(isSelected) => formik.setFieldValue("isDisabled", isSelected)}
                            classNames={{
                                wrapper: "mr-0",
                            }}
                            color="primary"
                        />
                    </div>
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
          Update
                </Button>
            </ModalFooter>
        </>
    )
}

interface AccountDetailsModalProps {
  account: AccountEntity;
}

interface AccountDetailsModalPropsContext {
  props: AccountDetailsModalProps;
}

export const AccountDetailsModalPropsContext =
  createContext<AccountDetailsModalPropsContext | null>(null)

export const AccountDetailsModal = (props: AccountDetailsModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Link as="button" onPress={onOpen} className="w-5 h-5">
                <PencilIcon/>
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <AccountDetailsModalPropsContext.Provider value={{ props }}>
                        <AccountDetailsModalProvider>
                            <WrappedAccountDetailsModal />
                        </AccountDetailsModalProvider>
                    </AccountDetailsModalPropsContext.Provider>
                </ModalContent>
            </Modal>
        </>
    )
}
