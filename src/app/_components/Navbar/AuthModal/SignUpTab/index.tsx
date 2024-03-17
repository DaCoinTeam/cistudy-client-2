"use client"
import {
    Button,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    Spacer,
} from "@nextui-org/react"
import { SignUpTabContext, SignUpTabProviders } from "./SignUpTabProviders"
import { useContext } from "react"
import { NavbarContext } from "../../NavbarProviders"

const WrappedSignUpTab = () => {
    const { formik } = useContext(SignUpTabContext)!

    const { dispatch } = useContext(NavbarContext)!

    const onPressToSignIn = () =>
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: false,
        })
    return (
        <>
            <ModalBody className="p-4">
                <div>
                    <Input
                        variant="bordered"
                        classNames={{
                            inputWrapper: "!border !border-divider bg-transparent shadow-none"
                        }} 
                        label="Email"
                        id="email"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input email here"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Spacer y={4} />
                    <Input
                        variant="bordered"
                        classNames={{
                            inputWrapper: "!border !border-divider bg-transparent shadow-none"
                        }} 
                        label="Password"
                        id="password"
                        type="password"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input password here"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={formik.touched.password && formik.errors.password}
                    />
                    <Spacer y={4} />
                    <Input
                        variant="bordered"
                        classNames={{
                            inputWrapper: "!border !border-divider bg-transparent shadow-none"
                        }} 
                        label="Confirm"
                        id="confirm"
                        type="password"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input confirm here"
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.confirm && formik.errors.confirm)}
                        errorMessage={formik.touched.confirm && formik.errors.confirm}
                    />
                    <Spacer y={4} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            classNames={{
                                inputWrapper: "!border !border-divider bg-transparent shadow-none"
                            }} 
                            label="First name"
                            id="firstName"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input first name here"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.firstName && formik.errors.firstName)
                            }
                            errorMessage={formik.touched.firstName && formik.errors.firstName}
                        />
                        <Input
                            variant="bordered"  
                            classNames={{
                                inputWrapper: "!border !border-divider bg-transparent shadow-none"
                            }} 
                            label="Last name"
                            id="lastName"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input last name here"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <Spacer y={4} />
                    <Input
                        variant="bordered"
                        classNames={{
                            inputWrapper: "!border !border-divider bg-transparent shadow-none"
                        }} 
                        label="Birthdate"
                        id="birthdate"
                        type="date"
                        disableAnimation
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input birthdate here"
                        value={formik.values.birthdate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.birthdate && formik.errors.birthdate)}
                        errorMessage={formik.touched.birthdate && formik.errors.birthdate}
                    />
                    <Spacer y={4} />
                    <div className="text-center">
                        <span className="text-sm">Already have an account?</span>{" "}
                        <Link className="text-sm cursor-pointer" onPress={onPressToSignIn}>
              Sign In
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <Button
                    isDisabled={!!Object.keys(formik.errors).length}
                    type="submit"
                    className="w-full"
                    color="primary"
                >
          Sign Up
                </Button>
            </ModalFooter>
        </>
    )
}

export const SignUpTab = () => (
    <SignUpTabProviders>
        <WrappedSignUpTab />
    </SignUpTabProviders>
)
