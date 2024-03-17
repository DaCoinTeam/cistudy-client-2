"use client"
import {
    Button,
    Divider,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    Spacer,
} from "@nextui-org/react"
import { SignInTabContext , SignInTabProviders } from "./SignInTabProviders"
import { useContext } from "react"
import { NavbarContext } from "../../NavbarProviders"
import { SignInByGoogleIcon } from "./SignInByGoogleButton"
import { SignInByFacebookIcon } from "./SignInByFacebookButton"

const WrappedSignInTab = () => {
    const { formik } = useContext(SignInTabContext)!
    const { dispatch } = useContext(NavbarContext)!

    const onPressToSignUp = () => dispatch({
        type: "SET_IS_SIGN_UP",
        payload: true
    })

    return (
        <>
            <ModalBody className="p-4">
                <div>
                    <Input
                        variant="bordered"
                        label="Email"
                        id="email"
                        isRequired
                        classNames={{
                            inputWrapper: "!border !border-divider bg-transparent shadow-none"
                        }} 
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
                    <div className="text-center">
                        <span className="text-sm">Do not have an account?</span>{" "}
                        <Link className="text-sm cursor-pointer" onPress={onPressToSignUp}>
              Sign Up
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <div className="w-full">
                    <Button
                        type="submit"
                        isDisabled={!!Object.keys(formik.errors).length}
                        className="w-full"
                        color="primary"
                    >
            Sign In
                    </Button>
                    <Spacer y={4} />
                    <div className="flex items-center gap-2">
                        <Divider className="flex-1" />
            OR
                        <Divider className="flex-1" />
                    </div>
                    <Spacer y={4} />
                    <div className="gap-4 grid grid-cols-2 w-fit m-auto">
                        <SignInByGoogleIcon />
                        <SignInByFacebookIcon />
                    </div>
                </div>
            </ModalFooter>
        </>
    )
}

export const SignInTab = () => (
    <SignInTabProviders>
        <WrappedSignInTab />
    </SignInTabProviders>
)
